import { createProduct, getAllProducts } from "@/lib/actions/product.actions";
import { NextRequest } from "next/server";

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

export async function POST(request: NextRequest) {
  try {
    const productData = await request.json();

    if (
      !productData.name ||
      !productData.description ||
      !productData.price ||
      !productData.category ||
      !productData.brand ||
      !productData.image
    ) {
      return Response.json(
        {
          success: false,
          error: "Missing required fields",
        },
        { status: 400 }
      );
    }

    if (typeof productData.price !== "number" || productData.price < 0) {
      return Response.json(
        {
          success: false,
          error: "Invalid price",
        },
        { status: 400 }
      );
    }
    if (
      productData.stock !== undefined &&
      (typeof productData.stock !== "number" || productData.stock < 0)
    ) {
      return Response.json(
        { success: false, error: "Invalid stock value" },
        { status: 400 }
      );
    }

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
