"use client";
import { IProduct } from "@/types/product";
import Image from "next/image";
import placeholder from "@/components/assets/images/placeholder.png";
import motherboard1 from "@/components/assets/database/images/asus-rog-strix-b650e-e-gaming-wifi.png";
import Link from "next/link";
import { IoCartOutline } from "react-icons/io5";
import { useState } from "react";

interface ProductCardProps {
  product: IProduct;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [isFeatured, setIsFeatured] = useState(false);

  return (
    <div
      className={`flex flex-col  ${
        isFeatured === true ? "border-2 border-[#6600cc] " : ""
      } p-2 bg-white w-[300px] hover:-translate-y-2 hover:shadow-md transition-all duration-200`}
    >
      <Link href={`/products/${product.slug}`}>
        <div>
          <p
            className={`absolute flex text-sm text-white font-bold p-1 rounded-lg ${
              product.stock > 0 ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {product.stock > 0 ? "In Stock" : "Out of Stock"}
          </p>

          <Image
            src={motherboard1}
            alt={product.name}
            sizes="32"
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
              {product.price.toLocaleString()} {product.currency}
            </p>
          </div>
        </div>
        <div className="flex justify-end">
          <button
            disabled={product.stock === 0}
            className="bg-[#4dc034] px-10 rounded-lg cursor-pointer hover:bg-green-500"
          >
            <IoCartOutline size={24} color="white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
