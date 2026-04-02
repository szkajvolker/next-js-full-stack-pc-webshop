import { getProductBySlug } from "@/lib/actions/product.actions";
import ProductDetailClient from "@/components/product/ProductDetailClient";

// Prevent static generation to avoid MongoDB connection during build
export const dynamic = "force-dynamic";

const ProductDetailPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  console.log(slug);

  let product = null;
  let error = null;

  try {
    product = await getProductBySlug(slug);
  } catch (err) {
    console.error("Error loading product:", err);
    error = err;
  }

  // Error state
  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">
            Error Loading Product
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            There was an error loading the product. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  // Not found state
  if (!product) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Product Not Found
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            The product you&apos;re looking for doesn&apos;t exist.
          </p>
        </div>
      </div>
    );
  }

  // Success state
  return <ProductDetailClient product={product} />;
};

export default ProductDetailPage;
