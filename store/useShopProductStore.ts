import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ProductCardProps } from "@/types/components/landing";

interface ShopCategoryStore {
  shopProducts: ProductCardProps[];
  setShopProducts: (products: ProductCardProps[]) => void;
}

export const useShopProductStore = create<ShopCategoryStore>()(
  persist(
    (set) => ({
      shopProducts: [],
      setShopProducts: (shopProducts: ProductCardProps[]) =>
        set(() => ({ shopProducts })),
    }),
    { name: "shop-products-store" }
  )
);
