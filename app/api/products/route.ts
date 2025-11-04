import { createProduct, getAllProducts } from "@/lib/actions/product.actions";
import { NextRequest } from "next/server";

//Get /api/products - Get all products
export async function GET() {
  try {
    const products = await getAllProducts();
    return Response.json({ success: true, data: products });
  } catch (error) {
    console.error("API Error:", error);
    return Response.json(
      { success: false, error: "Failed to fetch products" },
      {
        status: 500,
      }
    );
  }
}

//POST /api/products - Create new product

export async function POST(request: NextRequest) {
  try {
    const productData = await request.json();
    const product = await createProduct(productData);
    return Response.json({ success: true, data: product }, { status: 201 });
  } catch (error) {
    console.error("API Error:", error);
    return Response.json(
      { success: false, error: "Failed to create product" },
      { status: 500 }
    );
  }
}
