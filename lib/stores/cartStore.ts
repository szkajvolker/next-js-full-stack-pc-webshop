/**
 * Shopping cart Zustand store
 * Manages cart state with persistence to localStorage
 * Handles adding, removing, updating items and calculating totals
 */
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartStore } from "@/types/cart";

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      totalItems: 0,
      totalPrice: 0,

      _updateTotals: () => {
        const items = get().items;
        const totalItems = items.reduce(
          (total, item) => total + item.quantity,
          0,
        );
        const totalPrice = items.reduce(
          (total, item) => total + item.price * item.quantity,
          0,
        );
        set({ totalItems, totalPrice });
      },

      addItem: (newItem, quantity = 1) => {
        const items = get().items;
        const existingItem = items.find((item) => item.id === newItem.id);

        if (existingItem) {
          set({
            items: items.map((item) =>
              item.id === newItem.id
                ? { ...item, quantity: item.quantity + quantity }
                : item,
            ),
          });
        } else {
          set({
            items: [...items, { ...newItem, quantity }],
          });
        }

        get()._updateTotals();
      },

      removeItem: (id) => {
        set({
          items: get().items.filter((item) => item.id !== id),
        });
        get()._updateTotals();
      },

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }

        set({
          items: get().items.map((item) =>
            item.id === id ? { ...item, quantity } : item,
          ),
        });
        get()._updateTotals();
      },

      clearCart: () => {
        set({ items: [], totalItems: 0, totalPrice: 0 });
      },

      toggleCart: () => {
        set({ isOpen: !get().isOpen });
      },

      openCart: () => {
        set({ isOpen: true });
      },

      closeCart: () => {
        set({ isOpen: false });
      },
    }),
    {
      name: "cart-storage",
      partialize: (state) => ({ items: state.items }),
    },
  ),
);
