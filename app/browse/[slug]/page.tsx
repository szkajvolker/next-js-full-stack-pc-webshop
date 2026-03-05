import SidebarClient from "@/components/sidebar/SidebarClient";
import { getAllProducts } from "@/lib/actions/product.actions";

const BrowseCategoryPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const products = await getAllProducts();
  return <SidebarClient products={products} slug={slug} />;
};

export default BrowseCategoryPage;
