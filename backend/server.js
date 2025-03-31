require('dotenv').config()
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {body,validationResult} = require('express-validator')
const connectToDB = require('./config/db')
const User = require("./models/user-model");
const Resume = require("./models/resume-model");


const app = express();

const PORT = process.env.PORT || 5000



connectToDB()
app.use(express.json()); // Middleware to parse JSON
app.use(cors())
const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  const token = authHeader.split(" ")[1]; // Extract token from "Bearer <token>"
  if (!token) {
    return res.status(401).json({ error: "Access denied. No token found." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Error found in token",error)
    return res.status(403).json({ error: "Invalid token" });
  }
};

app.get("/",(req,res)=>{
  res.json({"Connected to Backend"})
})

app.post(
  "/",
  body("email").trim().isEmail().isLength({ min: 13 }),
  body("password").trim().isLength({ min: 8 }),
  body("username").trim().isLength({ min: 5 }),
  async (req, res) => {
    try {
      console.log("Received Data:", req.body);

      const { username, email, password } = req.body;

      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log("Validation Errors:", errors.array()); // Log validation errors
        return res.status(400).json({ message: "Invalid data", errors: errors.array() });
      }

      // Check if the user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        console.log("User with this email already exists:", email);
        return res.status(400).json({ message: "Email already registered" });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);
      console.log("Hashed Password Created");

      // Save user to the database
      const newUser = new User({ username, email, password: hashedPassword });
      await newUser.save();
      console.log("User Saved Successfully:", newUser);

      res.json({ message: "User registered successfully!" });
    } catch (error) {
      console.error("Registration Error:", error); // Log full error details
      res.status(500).json({ message: "Error saving user", error: error.message });
    }
  }
);

app.post("/login",body('email').trim().isEmail().isLength({min: 13}),body('password').trim().isLength({min: 8}),async (req, res) => {
    try {
      const { email, password } = req.body;
        const foundUser = await User.findOne({email})
        if (!foundUser) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password,foundUser.password)

        if (!isMatch) return res.status(400).json({ error: "Invalid email or password" });


     
       
     
        const token = jwt.sign({id: foundUser._id},process.env.JWT_SECRET,{expiresIn: "1h"})
        res.json({ message: "Login successful!" ,token});

      
    } catch (error) {
      res.status(500).json({ error: "Something went wrong" });
    }
  });

  app.post("/upload-resume",verifyToken,body('email').trim().isEmail().isLength({min: 13}),body('job').trim().isLength({min: 5}),body('username').trim().isLength({min: 5})  ,async (req, res) => {
    try {
      const { username, email, job } = req.body;
  
      // Save user to database
      const newResume = new Resume({ username, email, job });
      await newResume.save();
  
      res.json({ message: "Profile Submitted Successfully!" });
      
    } catch (error) {
      res.status(500).json({ error: "Error Submitting Profile" });
    }
  });

  app.get("/upload-resume", async (req, res) => {
    try {
        const allResumes = await Resume.find(); // Fetch users from DB
        res.json(allResumes);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Failed to fetch users" });
    }
});

app.get('/home', verifyToken, (req, res) => {
  res.json({ message: "Welcome to home page" });
});






// Start Server
app.listen(PORT);
