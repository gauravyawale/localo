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
