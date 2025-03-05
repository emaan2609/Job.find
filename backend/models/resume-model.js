const mongoose = require('mongoose')

const resumeSchema = new mongoose.Schema({
    username: {type: String,trim: true,unique: true,lowercase: true,required: true,minlength: [5,'Username must be at least 5 characters long']},
    email: {type: String,trim: true,unique: true,lowercase: true,required: true,minlength: [13,'Email must be at least 13 characters long']},
    job: {type: String,trim: true,lowercase: true,required: true,minlength: [5,'Job name must be at least 5 characters long']},
    image:{
      type: String,
      default: "https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG.png",
    } 
})

const Resume = mongoose.model('resume',resumeSchema)
module.exports = Resume