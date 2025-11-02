"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { ShopCardProps } from "@/types/components/landing";

export const ShopCard = ({
  id,
  name,
  image,
  rating,
  offers,
  distance,
  deliveryTime,
  isOpen = true,
  tags = [],
}: ShopCardProps) => (
  <Link href={`/shop/${id}`} className="block">
    <motion.div
      whileHover={{ scale: 1.03 }}
      className={`relative min-w-[200px] bg-card rounded-2xl shadow-md p-3 cursor-pointer hover:shadow-lg transition group ${
        !isOpen ? "opacity-70" : ""
      }`}
    >
      {/* Image Section */}
      <div className="relative w-full h-[200px] mb-3">
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="rounded-xl object-cover bg-neutral-100 dark:bg-neutral-800 hover:object-cover transition-all duration-300"
          priority
          unoptimized
        />

        {/* Offer badge */}
        {offers && (
          <span className="absolute top-2 left-2 bg-primary text-white text-xs font-medium px-2 py-1 rounded-lg shadow-md">
            {offers}
          </span>
        )}

        {/* Closed Overlay */}
        {!isOpen && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-xl">
            <span className="text-white text-sm font-medium">Closed</span>
          </div>
        )}
      </div>

      {/* Name + Rating */}
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-base text-foreground truncate">
          {name}
        </h3>
        {rating && <p className="text-sm text-muted-foreground">⭐ {rating}</p>}
      </div>

      {/* Distance & Time */}
      {(distance || deliveryTime) && (
        <p className="text-xs text-muted-foreground mt-1">
          {distance && <span>{distance}</span>}
          {distance && deliveryTime && <span> • </span>}
          {deliveryTime && <span>{deliveryTime}</span>}
        </p>
      )}

      {/* Tags */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </motion.div>
  </Link>
);
