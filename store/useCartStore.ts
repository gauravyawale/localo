import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItemProps } from "@/types/components/landing";

interface CartStore {
  items: CartItemProps[];
  addItem: (item: CartItemProps) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => {
        const existingItems = get().items.find((i) => i.id === item.id);
        if (existingItems) {
          set({
            items: get().items.map((i) =>
              i.id === item.id ? { ...i, qty: i.qty + item.qty } : i
            ),
          });
        } else {
          set({ items: [...get().items, item] });
        }
      },
      removeItem: (productId) => {
        set({ items: get().items.filter((i) => i.id !== productId) });
      },
      clearCart: () => set({ items: [] }),
      getTotalItems: () =>
        get().items.reduce((total, item) => total + item.qty, 0),
      getTotalPrice: () =>
        get().items.reduce((total, item) => total + item.price * item.qty, 0),
    }),
    { name: "cart-store" }
  )
);
