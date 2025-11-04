import { Document } from "mongoose";

export enum Currency {
  HUF = "HUF",
  EUR = "EUR",
  USD = "USD",
  GPB = "GBP",
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
  stock: number;
  createdAt: Date;
  updatedAt: Date;
}
