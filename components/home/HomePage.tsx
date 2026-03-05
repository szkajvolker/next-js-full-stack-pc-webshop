import { getAllProducts } from "@/lib/actions/product.actions";
import ProductCard from "../product/ProductCard";
import { IProduct } from "@/types/product";
import Browse from "../browse/Browse";

const HomePage = async () => {
  const products = await getAllProducts();
  return (
    <div className="flex flex-col min-h-screen bg-n-3 dark:bg-neutral-900 w-full">
      <div className="flex flex-row">
        <Browse />
      </div>
      <div className="flex-1 px-4 py-8">
        <h1 className="text-3xl font-extrabold mb-8 text-slate-900 dark:text-white">
          Our Products
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product: IProduct) => (
            <ProductCard key={String(product._id)} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
