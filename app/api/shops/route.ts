import { NextResponse } from "next/server";
import categoriedShops from "@/lib/mock/categoryData.json";

export async function GET() {
  return NextResponse.json(categoriedShops);
}
