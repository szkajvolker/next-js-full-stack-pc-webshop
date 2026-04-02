import SidebarClient from "@/components/sidebar/SidebarClient";
import { getAllProducts } from "@/lib/actions/product.actions";
import EmptyCategory from "@/components/shared/EmptyCategory";

// Prevent static generation to avoid MongoDB connection during build
export const dynamic = "force-dynamic";

const BrowseCategoryPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  
  let products = null;
  let error = null;

  try {
    products = await getAllProducts();
  } catch (err) {
    console.error("Error loading products:", err);
    error = err;
  }

  // Error state
  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">
            Error Loading Products
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            There was an error loading the products. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  // Empty state
  if (!products || products.length === 0) {
    return <EmptyCategory categorySlug={slug} />;
  }

  // Success state
  return <SidebarClient products={products} slug={slug} />;
};

export default BrowseCategoryPage;
