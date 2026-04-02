/**
 * Shopping cart button component with item counter
 * Displays cart icon with badge showing total number of items
 * Opens cart drawer when clicked
 */
"use client";

import React from "react";
import { FiShoppingCart } from "react-icons/fi";
import { useCartStore } from "@/lib/stores/cartStore";

export default function CartButton() {
  const { totalItems, openCart } = useCartStore();

  return (
    <button
      onClick={openCart}
      className="relative p-2 hover:bg-white/10 rounded-full transition-colors group cursor-pointer"
      aria-label={`Cart with ${totalItems} items`}
    >
      <FiShoppingCart className="w-8 h-8 text-white group-hover:text-gray-200 transition-colors" />

      {/* Cart Count Badge */}
      {totalItems > 0 && (
        <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
          {totalItems > 99 ? "99+" : totalItems}
        </span>
      )}
    </button>
  );
}
