const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: {type: String,trim: true,unique: true,lowercase: true,required: true,minlength: [5,'Username must be at least 5 characters long']},
  email: {type: String,trim: true,unique: true,lowercase: true,required: true,minlength: [13,'Email must be at least 13 characters long']},
  password:{
    type : String,
    required: true,
    minlength: [8,'Password must be at least 8 characters long'],
    trim: true,
  } 
});


const User = mongoose.model("User", userSchema);
module.exports = User