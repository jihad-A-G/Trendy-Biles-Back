import mongooose from "mongoose";
import User from "../Models/UsersModel.js";

class UserController {
  static createUser = async (req, res) => {
    const { username, password, email, phoneNumber, address } = req.body;

    try {
      const User = await User.create({
        username,
        password,
        email,
        phoneNumber,
        address
      });
      res.status(200).json(User);
    } catch (error) {
      res.status(400).json({ ...error });
    }
  };

  static readUser = async (req, res) => {
    try {
      const User = await User.find();
      res.status(200).json(User);
    } catch (error) {
      res.status(400).json({ error: { ...error } });
    }
  };

  static readOneUser = async (req, res) => {
    const { id } = req.params;
    try {
      const User = await User.findById(id);
      res.status(200).json(User);
    } catch (error) {
      res.status(400).json({ error: { ...error } });
    }
  };

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

      const User = await User.findByIdAndUpdate(id, updateFields, {
        new: true,
      });

      res.status(200).json(User);
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
module.exports = UserController;
