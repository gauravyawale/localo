"use client";
import React from "react";
import useSWR from "swr";
import { ProductCard } from "@/components/product/ProductCard";
import { fetcher } from "@/lib/fetcher";
import { useShopProductStore } from "@/store/useShopProductStore";

const ProductList = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = React.use(params);
  const { data, isLoading } = useSWR(`/api/shop-products?id=${id}`, fetcher);
  const { setShopProducts, shopProducts } = useShopProductStore();

  if (data && shopProducts.length === 0) {
    setShopProducts(data);
  }

  if (shopProducts.length === 0) {
    return (
      <div className="p-4">
        <p className="text-center text-muted-foreground">
          No products found for this shop.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {shopProducts.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  );
};

export default ProductList;
