import { getAllProducts } from "@/lib/actions/product.actions";
import ProductCard from "../product/ProductCard";
import { IProduct } from "@/types/product";

const HomePage = async () => {
  const products = await getAllProducts();
  return (
    <div className="flex mx-auto px-4 py-8 items-center justify-center min-h-screen flex-col">
      <h1 className="text-3xl font-bold mb-8">Our Products</h1>

      <div className="grid grid-cols-1 md:grid-colds-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product: IProduct) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
