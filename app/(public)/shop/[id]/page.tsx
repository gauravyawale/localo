import { ProductCard } from "@/components/product/ProductCard";
import mockProducts from "@/lib/mock/product.json";

export default async function ProductList({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;

  // Filter products belonging to the current shop id
  const productsForShop = mockProducts.filter(
    (product) => product.shopId === id
  );

  if (productsForShop.length === 0) {
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
      {productsForShop.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  );
}
