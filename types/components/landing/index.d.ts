export interface ShopCardProps {
  id: string;
  name: string;
  image: string;
  rating?: number;
  offers?: string;
  distance?: string;
  deliveryTime?: string;
  isOpen?: boolean;
  tags?: string[];
}

export interface CategorySectionProps {
  title: string;
  shops: ShopCardProps[];
  id: string;
}

export interface ProductCardProps {
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

export interface CartItemProps {
  id: string;
  name: string;
  qty: number;
  price: number;
  shopId: string;
  discount?: number;
}
