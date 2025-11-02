"use client";
import { Search } from "lucide-react";

export const SearchBar = () => (
  <div className="relative w-full max-w-xl mx-auto mb-6">
    <Search className="absolute left-3 top-3 text-muted-foreground" size={18} />
    <input
      type="text"
      placeholder="Search shops or categories..."
      className="w-full pl-10 pr-4 py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
    />
  </div>
);
