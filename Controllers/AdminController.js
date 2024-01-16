import mongoose  from "mongoose";
import  Admin  from "../Models/AdminsModel.js";
import bcrypt from 'bcrypt';

class AdminController {
    static createAdmin = async (req, res) => {
        const { username, password, authorized ,roles} = req.body;
      
        try {
          // Check if the username already exists
          const existingAdmin = await Admin.findOne({ username });
      
          if (existingAdmin) {
            // If the username already exists, return an error response
            return res.status(400).json({ error: 'Username already exists' });
          }

          const hashedPassword = await bcrypt.hash(password,10);
      
          // If the username is unique, create the new admin
          const admin = await Admin.create({
            username,
            password:hashedPassword,
            authorized,
            roles
          });
      
          res.status(200).json(admin);
        } catch (error) {
          // Handle other errors
          res.status(500).json({ error: 'Internal Server Error', err:error.message });
        }
      };
      
    
    static readAdmin = async (req, res) => {
        try {
            const admin = await Admin.find().populate('roles');
            res.status(200).json(admin);
        } 
        catch (error) {
            res.status(400).json({ error: { ...error } });
        }
    };

    static readOneAdmin = async (req, res) => {
        const { id } = req.params;
      
        try {
          // Check if the provided id is a valid ObjectId
          if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid ObjectId format', providedId: id });
          }
      
          const admin = await Admin.findById(id).populate('roles');
      
          // Check if the admin with the given ID exists
          if (!admin) {
            return res.status(404).json({ error: 'Admin not found' });
          }
      
          res.status(200).json(admin);
        } catch (error) {
          // Handle other errors
          console.error('Error in readOneAdmin:', error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
      };
      

      static updateAdmin = async (req, res) => {
        const { id } = req.params;
        const { username, password, authorized, roles } = req.body;
    
        try {
            const updateFields = {
                username,
                authorized,
                roles
            };
    
            if (password) {
                const hashedPassword = await bcrypt.hash(password, 10);
                updateFields.password = hashedPassword;
            }
    
            const admin = await Admin.findByIdAndUpdate(
                id,
                updateFields,
                { new: true }
            );
    
            res.status(200).json(admin);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };
    

    static deleteAdmin = async (req, res) => {
        const { id } = req.params;
        try {
            await Admin.findByIdAndDelete(id);
            res.status(200).json({ message: "Admin deleted succefully" });
        } 
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    };
}
export default AdminController

