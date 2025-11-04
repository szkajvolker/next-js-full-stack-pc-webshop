import {
  deleteProduct,
  getProductBySlug,
  updateProduct,
} from "@/lib/actions/product.actions";
import { NextRequest } from "next/server";

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

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const productData = await request.json();

    if (
      productData.price !== undefined &&
      (typeof productData.price !== "number" || productData.price < 0)
    ) {
      return Response.json(
        { success: false, error: "Invalid price" },
        { status: 404 }
      );
    }
    if (
      productData.stock !== undefined &&
      (typeof productData.stock !== "number" || productData.stock < 0)
    ) {
      return Response.json(
        {
          success: false,
          error: "Invalid stock value",
        },
        { status: 400 }
      );
    }

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

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
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
