"use client";
import { IProduct } from "@/types/product";
import Image from "next/image";
import Link from "next/link";
import { IoCartOutline } from "react-icons/io5";
import { useState } from "react";

interface ProductCardProps {
  product: IProduct;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [quantity, setQuantity] = useState(1);

  const addToCart = (product: IProduct, quantity: number) => {
    console.log(`${product.name} added to cart ${quantity} `);
  };
  return (
    <div
      className={`flex flex-col  ${
        product.isFeatured === true ? "border-2 border-n-1 " : ""
      } p-2 bg-n-4  w-[200px] hover:-translate-y-2 hover:shadow-md hover:shadow-slate-300 transition-all duration-200`}
    >
      <Link href={`/products/${product.slug}`}>
        <div className="flex justify-end">
          <p
            className={`absolute flex text-sm text-white font-bold p-1 rounded-lg ${
              product.stock > 0 ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {product.stock > 0 ? "In Stock" : "Out of Stock"}
          </p>

          <Image
            src={product.image || "/assets/images/placeholder.png"}
            alt={product.name ? `${product.name} - Product Image` : "Product Image"}
            width={300}
            height={300}
            className="rounded-lg"
          />
        </div>
      </Link>

      <div className="p-4 text-black">
        <Link href={`/products/${product.slug}`}>
          <h3 className="line-clamp-2">{product.name}</h3>
        </Link>

        <div className="flex justify-between items-center">
          <div>
            <p className="text-lg font-bold">
              {product.price.toString()} {product.currency}
            </p>
          </div>
        </div>
        <div className="flex justify-end gap-5">
          <input
            type="text"
            value={quantity === 0 ? "" : quantity}
            onChange={(e) => {
              const value = e.target.value;
              if (value === "") {
                setQuantity(0);
              } else {
                setQuantity(parseInt(value) || 0);
              }
            }}
            onBlur={() => {
              if (quantity === 0) setQuantity(1);
            }}
            max={product.stock}
            disabled={product.stock === 0}
            className="border border-gray-400 rounded-lg w-10 h-full p-2 text-center"
          />
          <button
            disabled={product.stock === 0}
            className="bg-[#4dc034] px-5 rounded-lg cursor-pointer hover:bg-green-500"
            onClick={() => addToCart(product, quantity)}
          >
            <IoCartOutline size={20} color="white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
