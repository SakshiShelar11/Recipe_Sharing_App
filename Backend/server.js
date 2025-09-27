// const express=require('express')
// const mongoose=require('mongoose')
// require('dotenv').config()
// const User=require('./models/User')
// const bcrypt=require('bcryptjs')

// const app=express()
// const cors = require('cors');
// app.use(cors({
//     origin: ['http://localhost:3000','http://localhost:3001','http://localhost:3002'], // Frontend URL
//     methods: ['GET', 'POST', 'PUT', 'DELETE',['OPTIONS']],
//   }));  
// const PORT=5000;
// app.use(express.json());
// app.use(express.static("public"))



// app.use("/recipe",require("./routes/recipe"))

// //Registration page api

// app.post('/register',async(req, res)=>{
//     const {username,email,password}=req.body
//     try{
//         const hashedPassword= await bcrypt.hash(password,10)
//         const user=new User({username,email,password:hashedPassword})
//         await user.save()
//         res.json({message: "User Registred.."})
//         console.log("User Registration completed...")
//     }
//     catch(err)
//     {
//         console.log(err)
//     }
// })

// //Login page api

// app.post('/login',async(req,res)=>{
//     const {email,password}=req.body
//     try{
//         const user = await User.findOne({ email });
//         if (!user || !(await bcrypt.compare(password, user.password))) 
//             {
//              return res.status(400).json({ message: "Invalid Credentials" });
//             }
//           res.json({ message: "Login Successful", username: user.username });
//     }
//     catch(err)
//     {
//         console.log(err)
//     }
// })

// mongoose.connect(process.env.MONGO_URL).then(
//     ()=>console.log("DB connected successfully..")
// ).catch(
//     (err)=>console.log(err)
// )

// app.listen(PORT,(err)=>{
//     if(err)
//     {
//         console.log(err)
//     }
//     console.log("Server is running on port :"+PORT)
// })



const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/images', express.static(path.join(__dirname, 'public/images')));

// Database connection
mongoose.connect(process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/recipe-app', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected successfully"))
.catch(err => console.log("MongoDB connection error:", err));

// Import models
const User = require('./models/User');
const Recipe = require('./models/recipe');

// Multer configuration for file uploads
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, 'public/images/'));
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    }
});

// Test route
app.get('/', (req, res) => {
    res.json({ message: 'Recipe Sharing API is running!' });
});

// Authentication Routes
app.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        
        console.log('Registration attempt:', { username, email });
        
        // Validation
        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if user exists
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12);
        
        // Create user
        const user = new User({ username, email, password: hashedPassword });
        await user.save();

        res.status(201).json({
            message: "User registered successfully",
            username: user.username,
            userId: user._id
        });
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ message: "Server error during registration" });
    }
});

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        console.log('Login attempt:', { email });
        
        // Validation
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        res.json({
            message: "Login successful",
            username: user.username,
            userId: user._id
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Server error during login" });
    }
});

// Recipe Routes

// Get all recipes
app.get('/recipe', async (req, res) => {
    try {
        const recipes = await Recipe.find().sort({ createdAt: -1 });
        console.log('Fetched recipes:', recipes.length);
        res.json(recipes);
    } catch (error) {
        console.error("Error fetching recipes:", error);
        res.status(500).json({ message: "Error fetching recipes" });
    }
});

// Get single recipe
app.get('/recipe/:id', async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);
        if (!recipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }
        res.json(recipe);
    } catch (error) {
        console.error("Error fetching recipe:", error);
        res.status(500).json({ message: "Error fetching recipe" });
    }
});

// Add new recipe
app.post('/recipe', upload.single('file'), async (req, res) => {
    try {
        const { title, ingredients, instructions, time } = req.body;
        
        console.log('Adding recipe:', { title, time });
        console.log('File:', req.file);

        if (!title || !ingredients || !instructions) {
            return res.status(400).json({ message: "Title, ingredients, and instructions are required" });
        }

        // Convert ingredients string to array
        const ingredientsArray = typeof ingredients === 'string' 
            ? ingredients.split(',').map(item => item.trim()).filter(item => item)
            : ingredients;

        const newRecipe = new Recipe({
            title,
            ingredients: ingredientsArray,
            instructions,
            time: time || "Not specified",
            coverImage: req.file ? req.file.filename : 'default-recipe.jpg'
        });

        await newRecipe.save();
        res.status(201).json(newRecipe);
    } catch (error) {
        console.error("Error adding recipe:", error);
        res.status(500).json({ message: "Error adding recipe" });
    }
});

// Update recipe
app.put('/recipe/:id', upload.single('file'), async (req, res) => {
    try {
        const { title, ingredients, instructions, time } = req.body;
        const recipeId = req.params.id;

        console.log('Updating recipe:', recipeId);

        let recipe = await Recipe.findById(recipeId);
        if (!recipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }

        // Convert ingredients string to array
        const ingredientsArray = typeof ingredients === 'string' 
            ? ingredients.split(',').map(item => item.trim()).filter(item => item)
            : ingredients;

        const updateData = {
            title: title || recipe.title,
            ingredients: ingredientsArray || recipe.ingredients,
            instructions: instructions || recipe.instructions,
            time: time || recipe.time
        };

        // Only update image if a new file was uploaded
        if (req.file) {
            updateData.coverImage = req.file.filename;
        }

        const updatedRecipe = await Recipe.findByIdAndUpdate(
            recipeId, 
            updateData, 
            { new: true }
        );

        res.json(updatedRecipe);
    } catch (error) {
        console.error("Error updating recipe:", error);
        res.status(500).json({ message: "Error updating recipe" });
    }
});

// Delete recipe
app.delete('/recipe/:id', async (req, res) => {
    try {
        const recipeId = req.params.id;
        console.log('Deleting recipe:', recipeId);

        const recipe = await Recipe.findById(recipeId);
        if (!recipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }

        await Recipe.findByIdAndDelete(recipeId);
        res.json({ message: "Recipe deleted successfully" });
    } catch (error) {
        console.error("Error deleting recipe:", error);
        res.status(500).json({ message: "Error deleting recipe" });
    }
});

// 404 handler for API routes
app.use('/api/*', (req, res) => {
    res.status(404).json({ message: `API route ${req.originalUrl} not found` });
});

// General 404 handler
app.use('*', (req, res) => {
    res.status(404).json({ message: `Route ${req.originalUrl} not found` });
});

// Error handling middleware
app.use((error, req, res, next) => {
    console.error('Server error:', error);
    res.status(500).json({ message: 'Internal server error' });
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📚 API available at http://localhost:${PORT}`);
});