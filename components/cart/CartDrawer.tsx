"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useCartStore } from "@/lib/stores/cartStore";
import { FiX, FiPlus, FiMinus, FiTrash2 } from "react-icons/fi";
import Image from "next/image";

export default function CartDrawer() {
  const drawerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const {
    items,
    isOpen,
    totalItems,
    totalPrice,
    closeCart,
    updateQuantity,
    removeItem,
    clearCart,
  } = useCartStore();

  useEffect(() => {
    if (!drawerRef.current || !overlayRef.current || !contentRef.current)
      return;

    if (isOpen) {
      // Drawer megjelenítése animációval
      gsap.set(drawerRef.current, { display: "flex" });
      gsap.set(overlayRef.current, { opacity: 0 });
      gsap.set(contentRef.current, { x: "100%" });

      const tl = gsap.timeline();

      tl.to(overlayRef.current, {
        opacity: 0.5,
        duration: 0.3,
        ease: "power2.out",
      }).to(
        contentRef.current,
        {
          x: "0%",
          duration: 0.4,
          ease: "power3.out",
        },
        "-=0.1",
      );
    } else {
      // Drawer eltüntetése animációval
      const tl = gsap.timeline({
        onComplete: () => {
          if (drawerRef.current) {
            gsap.set(drawerRef.current, { display: "none" });
          }
        },
      });

      tl.to(contentRef.current, {
        x: "100%",
        duration: 0.3,
        ease: "power2.in",
      }).to(
        overlayRef.current,
        {
          opacity: 0,
          duration: 0.2,
          ease: "power2.in",
        },
        "-=0.1",
      );
    }
  }, [isOpen]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("hu-HU", {
      style: "currency",
      currency: "HUF",
    }).format(price);
  };

  return (
    <div
      ref={drawerRef}
      className="fixed inset-0 z-50 hidden"
      style={{ display: "none" }}
    >
      {/* Overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black"
        onClick={closeCart}
      />

      {/* Cart Content */}
      <div
        ref={contentRef}
        className="absolute right-0 top-0 h-full w-full max-w-md bg-white dark:bg-gray-900 shadow-2xl flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Cart ({totalItems})
          </h1>
          <button
            onClick={closeCart}
            className="group p-2 hover:bg-gray-100 dark:hover:bg-gray-800  rounded-full transition-colors cursor-pointer"
          >
            <FiX className="w-6 h-6 text-gray-600 dark:text-gray-300 group-hover:text-red-500" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-8 h-8 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l-1 12H6L5 9z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                A kosár üres
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Adj hozzá termékeket a vásárlás elkezdéséhez.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                >
                  {/* Product Image */}
                  <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-md overflow-hidden shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                      width={200}
                      height={200}
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {item.name}
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {formatPrice(item.price)}
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center space-x-2 mt-2">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className=" group p-1 hover:bg-red-500 dark:hover:bg-red-500  rounded cursor-pointer"
                        disabled={item.quantity <= 1}
                      >
                        <FiMinus className="w-3 h-3 text-gray-600 group-hover:text-white dark:text-gray-300" />
                      </button>

                      <span className="text-sm font-medium text-gray-900 dark:text-white min-w-5 text-center">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="group p-1 hover:bg-green-500 dark:hover:bg-green-500  rounded cursor-pointer"
                      >
                        <FiPlus className="w-3 h-3 text-gray-600 group-hover:text-white dark:text-gray-300" />
                      </button>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-1 ml-2 hover:bg-red-100 dark:hover:bg-red-900/30 rounded text-red-500 cursor-pointer"
                      >
                        <FiTrash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {/* Item Total */}
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                </div>
              ))}

              {/* Clear Cart Button */}
              {items.length > 0 && (
                <button
                  onClick={clearCart}
                  className="w-full mt-4 px-4 py-2 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800 transition-colors cursor-pointer"
                >
                  Kosár ürítése
                </button>
              )}
            </div>
          )}
        </div>

        {/* Footer - Proceed to Payment */}
        {items.length > 0 && (
          <div className="border-t border-gray-200 dark:border-gray-700 p-6 space-y-4">
            {/* Total */}
            <div className="flex justify-between items-center">
              <span className="text-lg font-medium text-gray-900 dark:text-white">
                Összesen:
              </span>
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                {formatPrice(totalPrice)}
              </span>
            </div>

            {/* Proceed to Payment Button */}
            <button
              onClick={() => {
                // Itt később implementálható a fizetési folyamat
                console.log("Proceed to payment:", items);
                closeCart();
              }}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-4 px-6 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              Proceed to Payment
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
