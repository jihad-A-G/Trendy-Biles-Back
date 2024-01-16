import mongoose from "mongoose";
import User from "../Models/UsersModel.js";

export default class UserController {
  static createUser = async (req, res) => {
    const { username, password, email, phoneNumber, address } = req.body;
  
    try {
      // Check if the username or email already exists
      const existingUser = await User.findOne({ $or: [{ username }, { email }] });
  
      if (existingUser) {
        // If username or email already exists, return an error response
        return res.status(400).json({ error: 'Username or email already exists' });
      }
  
      // If username and email are unique, create the new user
      const user = await User.create({
        username,
        password,
        email,
        phoneNumber,
        address,
      });
  
      res.status(200).json(user);
    } catch (error) {
      // Handle other errors
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  static readUser = async (req, res) => {
    try {
      const user = await User.find();
      res.status(200).json(user);
    } catch (error) {
      res.status(400).json({ error: { ...error } });
    }
  };

  static readOneUser = async (req, res) => {
  
      const { id } = req.params;
    
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json( 
          { data: null,
            message:'not found',
            status : 404
          }
        );
      }
      const user = await User.findById(id)
      if (!user) {
        return res.status(404).json(
          { data: null,
            message:'not found',
            status : 404
          }
        );
      }
    
      res.status(200).json(
        { data: user,
          message:'succes',
          status : 200
        }
      );
    }

  static updateUser = async (req, res) => {
    const { id } = req.params;
    const {  username, password, email, phoneNumber, address  } = req.body;

    try {
      const updateFields = {
        username,
        password,
        email,
        phoneNumber,
        address
      };

      // Check if an image file is uploaded
      if (req.file) {
        updateFields.image = `${req.protocol}://${req.get("host")}/${
          req.file.path
        }`;
      }

      const user = await User.findByIdAndUpdate(id, updateFields, {
        new: true,
      });

      res.status(200).json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  static deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
      await User.findByIdAndDelete(id);
      res.status(200).json({ message: "User deleted succefully" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
}
