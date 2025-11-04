import { Document } from "mongoose";

export interface IProduct extends Document {
  name: string;
  slug: string;
  description: string;
  price: number;
  category: string;
  brand: string;
  image: string;
  stock: number;
  createdAt: Date;
  updatedAt: Date;
}
