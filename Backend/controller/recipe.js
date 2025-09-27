// const Recipes=require("../models/recipe")
// const multer=require('multer')

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, './public/images')
//     },
//     filename: function (req, file, cb) {
//     const ext = file.mimetype.split('/')[1];
//     const filename = Date.now() + '-' + file.fieldname + '.' + ext;
//       cb(null, filename)
//     }
//   })
  
//   const upload = multer({ storage: storage })

// const getRecipes=async(req,res)=>{
//     const recipes=await Recipes.find()
//     return res.json(recipes)
// }

// const getRecipe=async(req,res)=>{
//     const recipe=await Recipes.findById(req.params.id)
//     res.json(recipe)
// }

// const addRecipe=async(req,res)=>{
//     // console.log(req.file)
//     const {title,ingredients,instructions,time}=req.body

//     if(!title || !ingredients || !instructions)
//     {
//         res.json({message:"Required fields can't be empty"})
//     }

//     const newRecipe=await Recipes.create({
//         title,ingredients,instructions,time,
//         coverImage: req.file.filename,
        
//     })
//     return res.json(newRecipe)
// }

// const editRecipe=async(req,res)=>{
//     const {title,ingredients,instructions,time}=req.body
//     let recipe=await Recipes.findById(req.params.id)
//     try{
//         if(recipe){
//             await Recipes.findByIdAndUpdate(req.params.id,{...req.body,coverImage:req.file.filename},{new:true}) 
//             res.json({title,ingredients,instructions,time})
//         }
//     }
//     catch(err){
//         return res.status(404).json({message:"error"})
//     }
// }


// // const deleteRecipe=async(req,res)=>{
// //         try {
// //             const deletedRecipe = await Recipes.findByIdAndDelete(req.params.id);
// //             if (!deletedRecipe) {
// //                 return res.status(404).json({ message: "Recipe not found" });
// //             }
// //             return res.json({ message: "Recipe deleted successfully", deletedRecipe });
// //         } catch (err) {
// //             return res.status(400).json({ message: "Error deleting the recipe"});
// //         }
// //     }

// const deleteRecipe=async(req,res)=>{
//     try{
//         await Recipes.deleteOne({_id:req.params.id})
//         res.json({status:"ok"})
//     }catch(err){
//         return res.status(400).json({message:error})
//     }
// }

// module.exports={getRecipes,getRecipe,addRecipe,editRecipe,deleteRecipe,upload} //,


const Recipes = require("../models/recipe");
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure public/images directory exists
const imagesDir = path.join(__dirname, '../public/images');
if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, imagesDir);
    },
    filename: function (req, file, cb) {
        const ext = file.mimetype.split('/')[1];
        const filename = Date.now() + '-' + Math.round(Math.random() * 1E9) + '.' + ext;
        cb(null, filename);
    }
});

const upload = multer({ 
    storage: storage,
    fileFilter: function (req, file, cb) {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only image files are allowed!'), false);
        }
    },
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    }
});

const getRecipes = async (req, res) => {
    try {
        const recipes = await Recipes.find().sort({ createdAt: -1 });
        return res.json(recipes);
    } catch (error) {
        console.error("Error fetching recipes:", error);
        return res.status(500).json({ message: "Error fetching recipes" });
    }
};

const getRecipe = async (req, res) => {
    try {
        const recipe = await Recipes.findById(req.params.id);
        if (!recipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }
        res.json(recipe);
    } catch (error) {
        console.error("Error fetching recipe:", error);
        res.status(500).json({ message: "Error fetching recipe" });
    }
};

const addRecipe = async (req, res) => {
    try {
        const { title, ingredients, instructions, time } = req.body;

        if (!title || !ingredients || !instructions) {
            return res.status(400).json({ message: "Title, ingredients, and instructions are required" });
        }

        // Convert ingredients string to array
        const ingredientsArray = typeof ingredients === 'string' 
            ? ingredients.split(',').map(item => item.trim()).filter(item => item)
            : ingredients;

        const newRecipe = await Recipes.create({
            title,
            ingredients: ingredientsArray,
            instructions,
            time: time || "Not specified",
            coverImage: req.file ? req.file.filename : 'default-recipe.jpg'
        });

        return res.status(201).json(newRecipe);
    } catch (error) {
        console.error("Error adding recipe:", error);
        return res.status(500).json({ message: "Error adding recipe" });
    }
};

const editRecipe = async (req, res) => {
    try {
        const { title, ingredients, instructions, time } = req.body;
        const recipeId = req.params.id;

        let recipe = await Recipes.findById(recipeId);
        if (!recipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }

        // Convert ingredients string to array if it's a string
        const ingredientsArray = typeof ingredients === 'string' 
            ? ingredients.split(',').map(item => item.trim()).filter(item => item)
            : ingredients;

        const updateData = {
            title,
            ingredients: ingredientsArray,
            instructions,
            time
        };

        // Only update image if a new file was uploaded
        if (req.file) {
            updateData.coverImage = req.file.filename;
            
            // Delete old image if it exists and isn't the default
            if (recipe.coverImage && recipe.coverImage !== 'default-recipe.jpg') {
                const oldImagePath = path.join(imagesDir, recipe.coverImage);
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
            }
        }

        const updatedRecipe = await Recipes.findByIdAndUpdate(
            recipeId, 
            updateData, 
            { new: true, runValidators: true }
        );

        res.json(updatedRecipe);
    } catch (error) {
        console.error("Error updating recipe:", error);
        res.status(500).json({ message: "Error updating recipe" });
    }
};

const deleteRecipe = async (req, res) => {
    try {
        const recipe = await Recipes.findById(req.params.id);
        if (!recipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }

        // Delete associated image if it exists and isn't the default
        if (recipe.coverImage && recipe.coverImage !== 'default-recipe.jpg') {
            const imagePath = path.join(imagesDir, recipe.coverImage);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }

        await Recipes.findByIdAndDelete(req.params.id);
        res.json({ message: "Recipe deleted successfully" });
    } catch (error) {
        console.error("Error deleting recipe:", error);
        res.status(500).json({ message: "Error deleting recipe" });
    }
};

module.exports = {
    getRecipes,
    getRecipe,
    addRecipe,
    editRecipe,
    deleteRecipe,
    upload
};