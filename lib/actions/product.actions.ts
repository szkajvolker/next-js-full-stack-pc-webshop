"use server";

import { generateSlug } from "../utils/slug";

import { IProduct } from "@/types/product";
import connectToDatabase from "../database";
import Product from "@/database/models/product.model";

//Create Product
export async function createProduct(productData: Partial<IProduct>) {
  try {
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

//Get All Products
export async function getAllProducts() {
  try {
    await connectToDatabase();
    const products = await Product.find({}).sort({ createdAt: -1 });
    return JSON.parse(JSON.stringify(products));
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}

//Get Product by
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

//Update Product
export async function updateProduct(
  id: string,
  productData: Partial<IProduct>
) {
  try {
    await connectToDatabase();
    const product = await Product.findByIdAndUpdate(id, productData, {
      new: true,
    });
    return JSON.parse(JSON.stringify(product));
  } catch (error) {
    console.error("Error updating product", error);
    throw error;
  }
}

//Delete Product
export async function deleteProduct(id: string) {
  try {
    await connectToDatabase();
    await Product.findByIdAndDelete(id);
    return { success: true };
  } catch (error) {
    console.error("Error delete product", error);
    throw error;
  }
}
