import { NextResponse } from "next/server";
import shopProducts from "@/lib/mock/product.json";
import type { ProductCardProps } from "@/types/components/landing";

export async function GET(request: Request) {
  // Parse URL so we can accept either a query param (?id=shop_3)
  // or a trailing path segment (/api/shop-products/shop_3)
  const url = new URL(request.url);

  // Try query param first
  const id = url.searchParams.get("id") ?? undefined;
  // If no id provided, return all products
  if (!id) {
    return NextResponse.json([]);
  }

  // Filter by shopId or product id for flexibility
  const filtered = (shopProducts as ProductCardProps[]).filter(
    (p) => p.shopId === id
  );

  if (!filtered || filtered.length === 0) {
    return NextResponse.json([]);
  }

  return NextResponse.json(filtered);
}
