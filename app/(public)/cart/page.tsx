"use client";
import { ShoppingCart } from "lucide-react";
import CartItem from "@/components/cart/CartItem";
import { useCartStore } from "@/store/useCartStore";

const CartPage = () => {
  const { items } = useCartStore();

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-4">
      <h2 className="text-xl font-semibold mb-4">Your Cart</h2>

      {items.length === 0 ? (
        <p className="text-center text-muted-foreground">
          Your cart is empty <ShoppingCart className="w-10 h-6" />
        </p>
      ) : (
        items.map((item) => <CartItem key={item.id} {...item} />)
      )}
    </div>
  );
};

export default CartPage;
