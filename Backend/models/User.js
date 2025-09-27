// const mongoose=require('mongoose')

// const UserSchema=mongoose.Schema({
//     username:{type:String,require:true},
//     email:{type:String,require:true},
//     password:{type:String,require:true}
// })

// module.exports=mongoose.model('User',UserSchema)

const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    username: { 
        type: String, 
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
        maxlength: 30
    },
    email: { 
        type: String, 
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },
    password: { 
        type: String, 
        required: true,
        minlength: 6
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);