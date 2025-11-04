import {
  deleteProduct,
  getProductBySlug,
  updateProduct,
} from "@/lib/actions/product.actions";
import { NextRequest } from "next/server";

//GET /api/products/[slug] - Get product by slug
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const product = await getProductBySlug(slug);

    if (!product) {
      return Response.json(
        { success: false, error: "Product not found" },
        { status: 404 }
      );
    }

    return Response.json({ success: true, data: product });
  } catch (error) {
    console.error("API Error", error);
    return Response.json(
      { success: false, error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}

//PUT /api/products/[slug] - Update product
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const productData = await request.json();

    //First get the product to get its ID
    const { slug } = await params;
    const existingProduct = await getProductBySlug(slug);
    if (!existingProduct) {
      return Response.json(
        {
          success: false,
          error: "Product not found",
        },
        { status: 404 }
      );
    }

    const updatedProduct = await updateProduct(
      existingProduct._id,
      productData
    );
    return Response.json({ success: true, data: updatedProduct });
  } catch (error) {
    console.error("API Error:", error);
    return Response.json(
      { success: false, error: "Failed to update product" },
      { status: 500 }
    );
  }
}

//DELETE /api/products/[slug] -Delete product
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    //First get the product to get its ID
    const { slug } = await params;
    const existingProduct = await getProductBySlug(slug);
    if (!existingProduct) {
      return Response.json(
        {
          success: false,
          error: "Product not found",
        },
        { status: 404 }
      );
    }

    await deleteProduct(existingProduct._id);
    return Response.json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error("API Error:", error);
    return Response.json(
      { success: false, error: "Failed to delete product" },
      { status: 500 }
    );
  }
}
