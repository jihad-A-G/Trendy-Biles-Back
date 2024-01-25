import mongoose from "mongoose"

const aboutusSchema = new mongoose.Schema({
  content: { 
    type: String,
    required: false,
  },
  logoImage:{
    type:String,
    required:true
  },
  companyName:{
    type:String,
    required:true
  }
 
});


const AboutUs = mongoose.model("aboutUs", aboutusSchema); // the aboutUss here is the name for table at data base

export default AboutUs
