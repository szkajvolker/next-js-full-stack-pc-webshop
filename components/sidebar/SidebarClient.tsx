"use client";
import React, { useState } from "react";
import Sidebar from "./Sidebar";
import ProductCard from "@/components/product/ProductCard";
import { IProduct } from "@/types/product";

interface SidebarClientProps {
  products: IProduct[];
  slug: string;
}

const SidebarClient: React.FC<SidebarClientProps> = ({ products, slug }) => {
  const [selectedManufacturers, setSelectedManufacturers] = useState<string[]>(
    [],
  );
  console.log(selectedManufacturers);

  const [price, setPrice] = useState<[number, number]>([
    Math.min(...products.map((p) => p.price)),
    Math.max(...products.map((p) => p.price)),
  ]);

  const filtered = products
    .filter((product) => product.category?.toLowerCase() === slug)
    .filter(
      (product) =>
        selectedManufacturers.length === 0 ||
        selectedManufacturers.includes(product.brand.toUpperCase()),
    )
    .filter(
      (product) => product.price >= price[0] && product.price <= price[1],
    );

  return (
    <div className="flex flex-row min-h-screen">
      <Sidebar
        selectedManufacturers={selectedManufacturers}
        setSelectedManufacturers={setSelectedManufacturers}
        price={price}
        setPrice={setPrice}
        minPrice={Math.min(...products.map((p) => p.price))}
        maxPrice={Math.max(...products.map((p) => p.price))}
      />
      <div className="flex flex-col items-center justify-center w-full">
        <h1 className="text-2xl font-bold mb-6">
          {slug.charAt(0).toUpperCase() + slug.slice(1)}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {filtered.map((product: IProduct) => (
            <ProductCard key={String(product._id)} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SidebarClient;
