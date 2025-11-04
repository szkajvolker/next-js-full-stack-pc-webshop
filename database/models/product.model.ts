import { IProduct } from "@/types/product";
import { model, models, Schema } from "mongoose";

//TODO later add more details,validations

const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    brand: { type: String, required: true },
    image: { type: String, required: true },
    stock: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

const Product = models.Product || model<IProduct>("Product", productSchema);

export default Product;
