"use client";
import type { CategorySectionProps } from "@/types/components/landing";
import { ShopCard } from "./ShopCard";

export const CategorySection = ({ title, shops }: CategorySectionProps) => (
  <section className="mb-8">
    <h2 className="text-xl font-bold mb-3">{title}</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {shops.map((shop) => (
        <ShopCard key={shop.id} {...shop} />
      ))}
    </div>
  </section>
);
