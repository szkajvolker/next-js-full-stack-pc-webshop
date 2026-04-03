/**
 * Client-side sidebar with product filtering and display
 * Manages filter state and displays filtered products in a grid
 * 
 * @param products - Array of all products to filter
 * @param slug - Category slug for filtering products
 */
"use client";
import React, { useState } from "react";
import Sidebar from "./Sidebar";
import ProductCard from "@/components/product/ProductCard";
import EmptyCategory from "@/components/shared/EmptyCategory";
import { IProduct } from "@/types/product";

interface SidebarClientProps {
  products: IProduct[];
  slug: string;
}

const SidebarClient: React.FC<SidebarClientProps> = ({ products, slug }) => {
  const [selectedManufacturers, setSelectedManufacturers] = useState<string[]>(
    [],
  );

  const [price, setPrice] = useState<[number, number]>([
    Math.min(...products.map((p) => p.price)),
    Math.max(...products.map((p) => p.price)),
  ]);

  const filtered = [...products]
    .sort((a, b) => Number(b.isFeatured) - Number(a.isFeatured))
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
        <h1 className="text-2xl font-bold mb-6 text-gray-500">
          {slug.toUpperCase() + "s"}
        </h1>
        
        {filtered.length === 0 ? (
          <EmptyCategory categorySlug={slug} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-6">
            {filtered.map((product: IProduct) => (
              <ProductCard key={String(product._id)} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SidebarClient;
