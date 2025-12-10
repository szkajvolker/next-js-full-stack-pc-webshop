import { getProductBySlug } from "@/lib/actions/product.actions";
import ProductDetailClient from "@/components/product/ProductDetailClient";

const ProductDetailPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;

  console.log(slug);

  const product = await getProductBySlug(slug);
  if (!product) {
    return <div>Product not found</div>;
  }

  return <ProductDetailClient product={product}></ProductDetailClient>;
};

export default ProductDetailPage;
