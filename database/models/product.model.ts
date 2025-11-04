import { Currency, IProduct } from "@/types/product";
import { model, models, Schema } from "mongoose";

const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 200,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    description: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    currency: {
      type: String,
      enum: Object.values(Currency),
      default: Currency.EUR,
    },
    category: { type: String, required: true, trim: true },
    brand: { type: String, required: true, trim: true },
    image: { type: String, required: true },
    stock: { type: Number, default: 0, min: 0 },
  },
  {
    timestamps: true,
  }
);

const Product = models.Product || model<IProduct>("Product", productSchema);

export default Product;
