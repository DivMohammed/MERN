// CREATE SERVER
const express = require("express")
const app = express()
const _PORT = process.env.PORT;
const cors = require("cors")
// Package activation
app.use(cors())
// error stuck
app.use(express.json())

const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

// CONNECT TO DB > DATA BASE
const username = process.env.USERNAME,
      password = process.env.PASSWORD,
      database = process.env.DATABASE;

// Call the library
const mongoose = require("mongoose")
mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.fbd0ypi.mongodb.net/${database}?retryWrites=true&w=majority`);



// IMPORT USER MODEL
const UserModel = require('./models/Users')



// GET REQUEST
// The first parameter is where you want it to work in any track
// The second parameter is a  full back function of two parameters
// request : When we send a specific request
// The result : The result that returns to us from the server
// async & await : There is a delay in requesting information from the database and between showing it
app.get("/users", async (req, res)=>{
    const users = await UserModel.find();
    res.json(users)
})


// CREATE USER
// We take information from one place to createUser(root) and create a new user from it
app.post("/createUser", async (req, res)=>{
    const newUser = new UserModel(req.body)
    //Wait for the user to be created, then save it 
    await newUser.save();
    res.json(req.body)
})







// ADMIN MODEL
const AdminModel = require('./models/Admins')




app.post("/register", async (req , res)=>{
    const {username, password} = req.body

    const admin = await AdminModel.findOne({username})

    //the && mean if the condition true do and there is no else if
    admin && res.json({message: "Admin already exists!"})

    const hashedPassword = bcrypt.hashSync(password, 10)

    //The number of cycles to store
    const newAdmin = new AdminModel({username, password: hashedPassword});

    await newAdmin.save();

    return res.json({message: "Admin created successfully"})
});






app.post("/login", async (req, res)=>{
    const {username, password} = req.body


    const admin = await AdminModel.findOne({username})
    
    !admin && res.json({message: "Admin dose not exists!"})

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    !isPasswordValid && res.json({message: "Username or Password is not correct"})

        // Generates a token code specifically for the user
    const token = jwt.sign({id: admin._id}, process.env.SECRET)

    return res.json({token, adminID: admin._id})

})





// Server running
// It is not important that the port number can be any number
// The second parameter is what to do after listening
app.listen(_PORT, ()=>{
    console.log("Server Wow!!")
})