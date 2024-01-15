import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { 
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: { 
    type: String ,
    required: true
  },
  phoneNumber : {
    type : Number,
    required: true
  },
  address: {
    type: String,
    required: true,
  }
});


const User = mongoose.model("users", userSchema);

export default User;
