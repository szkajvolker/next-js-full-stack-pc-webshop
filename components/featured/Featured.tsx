"use client";

import React, { useEffect, useState } from "react";
import ProductCard from "../product/ProductCard";
import { IProduct } from "@/types/product";

const Featured = () => {
  const [featuredProducts, setFeaturedProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await fetch('/api/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const result = await response.json();
        
        if (!result.success) {
          throw new Error(result.error || 'Failed to fetch products');
        }
        
        const featured = result.data.filter((product: IProduct) => product.isFeatured === true);
        setFeaturedProducts(featured);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-64 bg-gray-200 dark:bg-gray-700 animate-pulse rounded-lg" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 dark:text-red-400">
        Error loading featured products: {error}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
      {featuredProducts.map((product: IProduct) => (
        <ProductCard key={String(product._id)} product={product} />
      ))}
    </div>
  );
};

export default Featured;
