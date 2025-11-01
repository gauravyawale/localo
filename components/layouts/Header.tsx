"use client";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { ThemeToggle } from "../ui/ThemeToggle";

export default function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-neutral-200 dark:border-neutral-700">
      <Link href="/" className="text-2xl font-bold text-brand">
        Localo
      </Link>
      <div className="flex items-center gap-4">
        <Link href="/cart" className="relative">
          <ShoppingCart className="w-6 h-6" />
        </Link>
        <ThemeToggle />
      </div>
    </header>
  );
}
