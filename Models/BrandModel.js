import mongoose from "mongoose";

const brandSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    products: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
        required: false,
    },
    ],
});

brandSchema.statics.getAllBrands = async function () {
    return this.find().populate("products");
};

brandSchema.statics.getOneBrand = async function (brandId) {
    return this.findById(brandId)?.populate("products");
};  

const Brand = mongoose.model("brands", brandSchema);

export default Brand;
