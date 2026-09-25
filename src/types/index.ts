export interface ProductVariant {
  id: string;
  name: string;
  tagline: string;
  description: string;
  badge: string;
  color: string;
  accentColor: string;
  canBg: string;
  textColor: string;
  calories: number;
  sugar: string;
  caffeine: string;
  sodium: string;
  servings: string;
  ingredients: string[];
  tasteProfile: {
    sweetness: number; // 1-10
    carbonation: number; // 1-10
    spiceBite: number; // 1-10
    citrusKick: number; // 1-10
  };
  sizes: {
    label: string;
    pack: string;
    price: number;
  }[];
}

export interface CartItem {
  variantId: string;
  name: string;
  pack: string;
  price: number;
  quantity: number;
  imageColor: string;
}

export interface StoryMilestone {
  year: string;
  title: string;
  description: string;
  tag: string;
}

export interface ImpactPillar {
  id: string;
  title: string;
  subtitle: string;
  metric: string;
  metricLabel: string;
  description: string;
  details: string[];
  icon: string;
}
