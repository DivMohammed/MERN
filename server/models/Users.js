// The benefit of the model is to connect the data base with the server
const {Schema, model} = require("mongoose")

// Building for the database
const UserSchema = new Schema({
    name:{
        type:String,
    },
    age:{
        type:Number,
    },
    email:{
        type:String,
    },
})

// The model has two parameters,
// the first is what is the thing that you want to extract
// And the second is how you want to extract it
// In the model, the collection is stored in a variable in order to export it
const UserModel = model("users" ,UserSchema)
// I exported it to use it in any file I want
module.exports = UserModel