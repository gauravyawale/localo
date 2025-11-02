"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  name: string;
  images: string[];
  details: string;
  price: number;
  discount: number;
  gst: number;
  isAvailable: boolean;
  tags?: string[];
  id: string;
  shopId: string;
}

export const ProductCard = ({
  name,
  images,
  details,
  price,
  discount,
  gst,
  isAvailable,
  tags = [],
  id,
  shopId,
}: ProductCardProps) => {
  const discountedPrice = price - (price * discount) / 100;

  return (
    <Link href={`/product/${id}`} className="block">
      <motion.div
        whileHover={{ scale: 1.03 }}
        className={`bg-card rounded-2xl shadow-md p-3 cursor-pointer hover:shadow-lg transition relative ${
          !isAvailable ? "opacity-70" : ""
        }`}
      >
        <div className="relative w-full h-[200px] mb-3">
          {/* Product Image */}
          <Image
            src={images?.[0]}
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="rounded-xl object-cover bg-neutral-100 dark:bg-neutral-800 hover:object-cover transition-all duration-300"
            priority
            unoptimized
          />
          {/* out of stock Overlay */}
          {!isAvailable && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-xl">
              <span className="text-white text-sm font-medium">
                Out Of Stock
              </span>
            </div>
          )}
        </div>

        {/* Product Name */}
        <h3 className="font-semibold text-base line-clamp-1">{name}</h3>

        {/* Product Details */}
        <p className="text-sm text-muted-foreground line-clamp-2">{details}</p>

        {/* Pricing */}
        <div className="flex items-center justify-between mt-2">
          <div>
            <p className="font-bold text-lg">
              ₹{discountedPrice.toFixed(2)}
              <span className="text-sm text-muted-foreground line-through ml-1">
                ₹{price}
              </span>
            </p>
            {/* <p className="text-xs text-muted-foreground">+{gst}% GST</p> */}
          </div>

          {/* Discount Tag */}
          {discount > 0 && (
            <span className="bg-green-100 text-green-700 text-xs font-medium px-2 py-1 rounded-md">
              {discount}% OFF
            </span>
          )}
        </div>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-[10px] bg-muted text-muted-foreground px-2 py-0.5 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        <button
          className="mt-4 w-full bg-primary text-white text-sm font-medium py-2 rounded-lg hover:bg-primary/90 transition cursor-pointer"
          disabled={!isAvailable}
          type="button"
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          Add to cart
        </button>
      </motion.div>
    </Link>
  );
};
