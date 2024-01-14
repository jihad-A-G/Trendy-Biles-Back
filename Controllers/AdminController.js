import mongooose  from "mongoose";
import  Admin  from "../Models/AdminsModel.js";

class AdminController {
    static createAdmin = async (req, res) => {
        const { username, password , authorized } 
        = req.body;

        try {
            const Admin = await Admin.create({
                username,
                password,
                authorized

            });
            res.status(200).json(Admin);
        } 
        catch (error) {
            res.status(400).json({ ...error });
        }
    };
    
    static readAdmin = async (req, res) => {
        try {
            const Admin = await Admin.find();
            res.status(200).json(Admin);
        } 
        catch (error) {
            res.status(400).json({ error: { ...error } });
        }
    };

    static readOneAdmin = async (req, res) => {
        const { id } = req.params;
        try {
            const Admin = await Admin.findById(id)
            res.status(200).json(Admin);
        } 
        catch (error) {
            res.status(400).json({ error: { ...error } });
        }
    };

    static updateAdmin = async (req, res) => {
        const { id } = req.params;
        const {  username, password , authorized} 
        = req.body;

        try {
            const updateFields = {
                username,
                password,
                authorized
            };

            // Check if an image file is uploaded
            if (req.file) {
                updateFields.image = `${req.protocol}://${req.get("host")}/${req.file.path}`;
            };

            const Admin = await Admin.findByIdAndUpdate(
                id,
                updateFields,
                { new: true }
            );

            res.status(200).json(Admin);
        } 
        catch (error) {
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
module.exports = AdminController

