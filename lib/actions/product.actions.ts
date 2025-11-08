"use server";

import { generateSlug } from "../utils/slug";

import { IProduct } from "@/types/product";
import connectToDatabase from "../database";
import Product from "@/database/models/product.model";

export async function createProduct(productData: Partial<IProduct>) {
  try {
    if (
      !productData.name ||
      !productData.description ||
      productData.price === undefined ||
      !productData.category ||
      !productData.brand ||
      !productData.image
    ) {
      throw new Error("Missing required fields");
    }
    if (typeof productData.price !== "number" || productData.price < 0) {
      throw new Error("Price must be a non-negative number!");
    }
    if (
      productData.stock !== undefined &&
      (typeof productData.stock !== "number" || productData.stock < 0)
    ) {
      throw new Error("Stock must be a non-negative number");
    }
    await connectToDatabase();

    if (!productData.slug && productData.name) {
      productData.slug = generateSlug(productData.name);
    }

    const product = await Product.create(productData);
    return JSON.parse(JSON.stringify(product));
  } catch (error) {
    console.error("Error creating product", error);
    throw error;
  }
}

export async function getAllProducts(): Promise<IProduct[]> {
  try {
    await connectToDatabase();
    const products = await Product.find({}).sort({ createdAt: -1 });
    return JSON.parse(JSON.stringify(products));
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}

export async function getProductBySlug(slug: string) {
  try {
    await connectToDatabase();
    const product = await Product.findOne({ slug });
    return JSON.parse(JSON.stringify(product));
  } catch (error) {
    console.error("Error fetching product", error);
    throw error;
  }
}

export async function updateProduct(
  id: string,
  productData: Partial<IProduct>
) {
  try {
    if ("slug" in productData) {
      delete productData.slug;
    }

    if (
      productData.price !== undefined &&
      (typeof productData.price !== "number" || productData.price < 0)
    ) {
      throw new Error("Price must be a non-negative number!");
    }
    if (
      productData.stock !== undefined &&
      (typeof productData.stock !== "number" || productData.stock < 0)
    ) {
      throw new Error("Stock must be a non-negative number!");
    }
    await connectToDatabase();
    const product = await Product.findByIdAndUpdate(id, productData, {
      new: true,
    });
    if (!product) {
      throw new Error("Product not found");
    }
    return JSON.parse(JSON.stringify(product));
  } catch (error) {
    console.error("Error updating product", error);
    throw error;
  }
}
export async function deleteProduct(id: string) {
  try {
    await connectToDatabase();
    const result = await Product.findByIdAndDelete(id);
    if (!result) {
      throw new Error("Product not found");
    }
    return { success: true };
  } catch (error) {
    console.error("Error delete product", error);
    throw error;
  }
}
