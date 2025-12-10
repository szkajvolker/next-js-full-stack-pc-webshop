"use client";

import Image from "next/image";
import { useState } from "react";
import motherboard1 from "@/components/assets/database/images/asus-rog-strix-b650e-e-gaming-wifi.png";
import { IProduct } from "@/types/product";
import { CiStar } from "react-icons/ci";

interface ProductDetailClientProps {
  product: IProduct;
}

const ProductDetailClient = ({ product }: ProductDetailClientProps) => {
  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };
  const decreaseQuantity = () => {
    if (quantity !== 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="flex flex-col pt-5 justify-center items-center">
      <div className="flex flex-row">
        <div className="flex flex-col border-r border-[#e5e5e5] pr-5 items-center">
          <Image src={motherboard1} alt="image" width={500} />
          <p
            className={`flex ${
              product.stock === 0 ? "bg-red-500" : "bg-green-500"
            } rounded-lg w-fit text-center p-2 text-gray-200 font-bold`}
          >
            {`${product.stock === 0 ? "OUT OF STOCK" : "IN STOCK"}`}
          </p>
        </div>
        <div className="flex flex-col pl-5 justify-between">
          <div className="flex flex-col">
            <h3 className="font-bold text-2xl">{product.name}</h3>
            <div className="flex flex-row justify-between items-center">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <CiStar key={i} size={20} />
                ))}
              </div>
              <button className="bg-[#e5e5e5] p-2 rounded-full text-gray-500">
                ADD TO SAVED
              </button>
            </div>
            <p>{product.description}</p>
          </div>
          <div className="flex flex-col">
            <div className="flex justify-between pb-5">
              <p className="font-bold text-3xl">
                {product.price} {product.currency}
              </p>
              <div className="flex flex-row items-center gap-4">
                <p>Quanity</p>
                <button
                  className="bg-[#008235] h-7  px-2 rounded-lg text-white font-bold text-xl cursor-pointer hover:brightness-120"
                  onClick={() => decreaseQuantity()}
                >
                  -
                </button>
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
                  className="border border-gray-400 rounded-lg w-16 h-10 text-center"
                />
                <button
                  className="bg-[#008235]  h-7  px-2 rounded-lg text-white font-bold text-xl cursor-pointer hover:brightness-120"
                  onClick={() => increaseQuantity()}
                >
                  +
                </button>
              </div>
            </div>
            <button
              className={`border ${
                product.stock === 0 ? "bg-gray-500" : "bg-[#008235]"
              }  text-white font-bold text-lg w-full rounded-lg cursor-pointer hover:brightness-120`}
              disabled={product.stock === 0}
            >
              ADD TO CART
            </button>
          </div>
        </div>
      </div>

      <div className="flex pt-5 flex-col">
        <h2 className="flex justify-center font-bold text-2xl">
          Product Details
        </h2>
        <div className="flex justify-between flex-col gap-2">
          <div className="flex flex-row border-gray-600 bg-[#f5f5f5] justify-between rounded-lg p-2">
            <span className="font-bold">Name: </span>
            <p className="rounded-lg">{product.name}</p>
          </div>
          <div className="flex flex-row border-gray-600 bg-[#f5f5f5] justify-between rounded-lg p-2">
            <span className="font-bold">Description: </span>
            <p className="rounded-lg">{product.description}</p>
          </div>
          <div className="flex flex-row  border-gray-600 bg-[#f5f5f5] justify-between rounded-lg p-2">
            <span className="font-bold">Category: </span>
            <p className=" rounded-lg">{product.category}</p>
          </div>
          <div className="flex flex-row border-gray-600 bg-[#f5f5f5] justify-between rounded-l rounded-lg p-2">
            <span className="font-bold">Brand: </span>
            <p className="">{product.brand}</p>
          </div>
          <p></p>
        </div>
        <div className="flex flex-row">
          <Image src={motherboard1} alt="image" />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailClient;
