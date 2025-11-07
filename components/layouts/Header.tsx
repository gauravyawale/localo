"use client";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useCartStore } from "@/store/useCartStore";
import { ThemeToggle } from "../ui/ThemeToggle";

export default function Header() {
  const { getTotalItems } = useCartStore();
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-neutral-200 dark:border-neutral-700">
      <Link href="/" className="text-2xl font-bold text-brand">
        Localo
      </Link>
      <div className="flex items-center gap-4">
        <Link href="/cart" className="relative cursor-pointer">
          <ShoppingCart className="w-10 h-6" />
          <span className="absolute -top-2 -right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {getTotalItems()}
          </span>
        </Link>
        <ThemeToggle />
      </div>
    </header>
  );
}
