import { Document } from "mongoose";

export enum Currency {
  HUF = "HUF",
  EUR = "EUR",
  USD = "USD",
  GBP = "GBP",
}

export interface IProduct extends Document {
  name: string;
  slug: string;
  description: string;
  price: number;
  currency: Currency;
  category: string;
  brand: string;
  image: string;
  showcaseImages: string[];
  stock: number;
  createdAt: Date;
  updatedAt: Date;
}
