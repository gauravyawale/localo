"use client";
import { useCartStore } from "@/store/useCartStore";
import type { CartItemProps } from "@/types/components/landing";
import { motion } from "framer-motion";
import { X } from "lucide-react";

const CartItem = (item: CartItemProps) => {
  const { getTotalItems, getTotalPrice, removeItem, addItem } = useCartStore();
  const {
    id,
    name,
    // image,
    // details,
    price,
    qty,
  } = item;

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      className="flex items-start gap-4 bg-card rounded-2xl shadow-sm p-4 hover:shadow-md transition"
    >
      {/* <img src={image} alt={name} className="w-20 h-20 object-cover rounded-xl" /> */}

      <div className="flex-1">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-base">{name}</h3>
          <button
            type="button"
            onClick={() => removeItem(id)}
            className="text-muted-foreground hover:text-destructive transition"
          >
            <X size={18} />
          </button>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2">
          {"details"}
        </p>

        <div className="flex items-center gap-3 mt-3">
          <button
            type="button"
            onClick={() => removeItem(id)}
            className="w-7 h-7 flex items-center justify-center border rounded-md hover:bg-muted transition"
          >
            -
          </button>
          <span className="text-sm font-medium">{qty}</span>
          <button
            type="button"
            onClick={() => addItem(item)}
            className="w-7 h-7 flex items-center justify-center border rounded-md hover:bg-muted transition"
          >
            +
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default CartItem;
