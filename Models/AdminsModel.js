import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  authorized: {
    type: Boolean,
    default: false,
    required: false,
  },
  roles: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "roles",
    required: true,
  },
});

adminSchema.pre("find", function (next) {
  this.populate("roles");
  next();
});

const Admin = mongoose.model("admins", adminSchema);

export default Admin;
