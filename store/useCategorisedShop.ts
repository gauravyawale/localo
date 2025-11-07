import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CategorySectionProps } from "@/types/components/landing";

interface ShopCategoryStore {
  categorisedShops: CategorySectionProps[];
  setCategorisedShops: (categories: CategorySectionProps[]) => void;
}

export const useCategorisedShopStore = create<ShopCategoryStore>()(
  persist(
    (set) => ({
      categorisedShops: [],
      setCategorisedShops: (categorisedShops: CategorySectionProps[]) =>
        set(() => ({ categorisedShops })),
    }),
    { name: "categorised-shops-store" }
  )
);
