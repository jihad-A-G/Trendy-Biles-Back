import mongoose from "mongoose";
import bcrypt from "bcrypt";

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
    type: String,
    required: true
  },
  phoneNumber: {
    type: Number,
    required: true
  },
  address: {
    type: String,
    required: true,
  }
});

// Static method for comparing passwords
userSchema.statics.comparePassword = async function(candidatePassword, hashedPassword) {
  try {
    return await bcrypt.compare(candidatePassword, hashedPassword);
  } catch (error) {
    throw error;
  }
};

const User = mongoose.model("users", userSchema);

export default User;
