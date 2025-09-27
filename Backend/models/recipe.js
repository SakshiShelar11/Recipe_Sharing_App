// const mongoose=require('mongoose')

// const recipeSchema=mongoose.Schema({
//     title:{
//         type:String,
//         required:true
//     },
    
//     ingredients:{
//         type:[String],
//         required:true
//     },

//     instructions:{
//         type:String,
//         required:true
//     },

//     time:{
//         type:String,
        
//     },

//     coverImage:{
//         type:String,
        
//     },

//     // createdBy:{
//     //     type:mongoose.Schema.Types.ObjectId,
//     //     ref:"User"
//     // }

// },{timestamps:true})

// module.exports=mongoose.model("Recipes",recipeSchema)

const mongoose = require('mongoose');

const recipeSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    },
    
    ingredients: {
        type: [String],
        required: true,
        validate: {
            validator: function(v) {
                return v.length > 0;
            },
            message: 'At least one ingredient is required'
        }
    },

    instructions: {
        type: String,
        required: true,
        trim: true
    },

    time: {
        type: String,
        default: "Not specified"
    },

    coverImage: {
        type: String,
        default: "default-recipe.jpg"
    }

}, { 
    timestamps: true 
});

module.exports = mongoose.model("Recipe", recipeSchema);