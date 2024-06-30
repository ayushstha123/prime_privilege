const mongoose =require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const productSchema = new mongoose.Schema(
  {
    businessId: { type: ObjectId, ref: "Business", required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    discount: {type:Number,required:true},
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

module.exports= Product;
