import { ProductVariant, StoryMilestone, ImpactPillar } from '../types';

export const PRODUCT_VARIANTS: ProductVariant[] = [
  {
    id: 'classic',
    name: 'Classic Kola',
    tagline: 'The Original Ice-Cold Masterpiece',
    description: 'The authentic flavor that captivated the world. Sparkling carbonated spring water blended with our proprietary caramel formula, kola nut infusions, and delicate aromatic botanical oils.',
    badge: 'Original Recipe',
    color: '#F40009',
    accentColor: '#B90007',
    canBg: 'linear-gradient(135deg, #E60000 0%, #F40009 50%, #990000 100%)',
    textColor: '#FFFFFF',
    calories: 140,
    sugar: '39g',
    caffeine: '34mg',
    sodium: '45mg',
    servings: '12 fl oz (355ml)',
    ingredients: [
      'Carbonated Mountain Spring Water',
      'High Fructose Corn Syrup / Pure Cane Sugar',
      'Caramel Color (Class IV)',
      'Phosphoric Acid',
      'Natural Flavors (Citrus Oils, Vanilla Extract, Kola Nut Blend)',
      'Caffeine'
    ],
    tasteProfile: {
      sweetness: 8,
      carbonation: 9,
      spiceBite: 7,
      citrusKick: 6,
    },
    sizes: [
      { label: 'Standard Pack', pack: '12 × 12 fl oz Cans', price: 9.99 },
      { label: 'Heritage Glass', pack: '6 × 8 fl oz Contour Glass', price: 11.49 },
      { label: 'Party Case', pack: '24 × 12 fl oz Cans', price: 17.99 },
    ]
  },
  {
    id: 'zero-sugar',
    name: 'Zero Sugar',
    tagline: 'Maximum Kola Taste. Zero Sugar.',
    description: 'Engineered for those who refuse to compromise. Delivers the exact iconic crisp bite, depth of spice, and effervescence of the classic recipe with zero sugar and zero calories.',
    badge: 'Zero Sugar & Calorie',
    color: '#111111',
    accentColor: '#F40009',
    canBg: 'linear-gradient(135deg, #222225 0%, #111111 60%, #000000 100%)',
    textColor: '#FFFFFF',
    calories: 0,
    sugar: '0g',
    caffeine: '34mg',
    sodium: '40mg',
    servings: '12 fl oz (355ml)',
    ingredients: [
      'Carbonated Mountain Spring Water',
      'Caramel Color',
      'Phosphoric Acid',
      'Aspartame & Acesulfame Potassium',
      'Natural Flavors & Botanical Oils',
      'Potassium Benzoate',
      'Caffeine'
    ],
    tasteProfile: {
      sweetness: 6,
      carbonation: 10,
      spiceBite: 8,
      citrusKick: 7,
    },
    sizes: [
      { label: 'Standard Pack', pack: '12 × 12 fl oz Cans', price: 9.99 },
      { label: 'Slim Line', pack: '8 × 10 fl oz Sleek Cans', price: 8.99 },
      { label: 'Party Case', pack: '24 × 12 fl oz Cans', price: 17.99 },
    ]
  },
  {
    id: 'diet-kola',
    name: 'Diet Kola',
    tagline: 'Distinctively Crisp & Light',
    description: 'An independent icon born in 1982. A brighter, crisp citrus-forward character that stands distinct from the classic profile, tailored for an invigorating midday lift.',
    badge: 'Calorie Free Legend',
    color: '#D1D5DB',
    accentColor: '#F40009',
    canBg: 'linear-gradient(135deg, #E5E7EB 0%, #D1D5DB 45%, #9CA3AF 100%)',
    textColor: '#111111',
    calories: 0,
    sugar: '0g',
    caffeine: '46mg',
    sodium: '40mg',
    servings: '12 fl oz (355ml)',
    ingredients: [
      'Carbonated Purified Spring Water',
      'Caramel Color',
      'Aspartame',
      'Phosphoric Acid',
      'Potassium Benzoate',
      'Natural Citrus Extracts & Spice Essences',
      'Citric Acid',
      'Caffeine'
    ],
    tasteProfile: {
      sweetness: 5,
      carbonation: 9,
      spiceBite: 6,
      citrusKick: 9,
    },
    sizes: [
      { label: 'Standard Pack', pack: '12 × 12 fl oz Cans', price: 9.99 },
      { label: 'Sleek Six', pack: '6 × 12 fl oz Cans', price: 5.79 },
      { label: 'Party Case', pack: '24 × 12 fl oz Cans', price: 17.99 },
    ]
  },
  {
    id: 'cherry',
    name: 'Cherry Kola',
    tagline: 'Infused with Ripe Black Cherry',
    description: 'A decadent fusion of our legendary kola base infused with rich, tart-sweet black cherry fruit extracts. Luxurious, velvety mouthfeel with a lingering fruity aroma.',
    badge: 'Signature Fruit Fusion',
    color: '#7F1D1D',
    accentColor: '#DC2626',
    canBg: 'linear-gradient(135deg, #581C87 0%, #831843 50%, #450A0A 100%)',
    textColor: '#FFFFFF',
    calories: 150,
    sugar: '42g',
    caffeine: '34mg',
    sodium: '45mg',
    servings: '12 fl oz (355ml)',
    ingredients: [
      'Carbonated Mountain Spring Water',
      'High Fructose Corn Syrup / Cane Sugar',
      'Caramel Color',
      'Natural Black Cherry Essence',
      'Phosphoric Acid',
      'Natural Botanical Flavors',
      'Caffeine'
    ],
    tasteProfile: {
      sweetness: 9,
      carbonation: 8,
      spiceBite: 6,
      citrusKick: 8,
    },
    sizes: [
      { label: 'Standard Pack', pack: '12 × 12 fl oz Cans', price: 10.49 },
      { label: 'Heritage Glass', pack: '6 × 8 fl oz Contour Glass', price: 12.29 },
      { label: 'Party Case', pack: '24 × 12 fl oz Cans', price: 18.99 },
    ]
  }
];

export const STORY_MILESTONES: StoryMilestone[] = [
  {
    year: '1892',
    title: 'The Atlanta Secret Blend',
    description: 'Dr. John Pemberton crafts the inaugural formulation in a brass kettle, producing the golden syrup that defined modern effervescent refreshment.',
    tag: 'Formula Origins'
  },
  {
    year: '1915',
    title: 'The Contour Silhouette Patent',
    description: 'Earl R. Dean designs the distinctive ribbed glass contour bottle—engineered so anyone could recognize it in the dark or by touch alone.',
    tag: 'Iconic Design'
  },
  {
    year: '1971',
    title: 'Hilltop Harmony & Global Unity',
    description: 'The legendary "I\'d Like to Buy the World a Coke" commercial unites hundreds of voices on an Italian hillside, defining universal brand optimism.',
    tag: 'Cultural Landmark'
  },
  {
    year: '2026',
    title: '100% Circular Packaging Era',
    description: 'Pioneering closed-loop bottle-to-bottle recycling with 100% recycled PET and 100% water replenishment across all global bottling hubs.',
    tag: 'Sustainable Future'
  }
];

export const IMPACT_PILLARS: ImpactPillar[] = [
  {
    id: 'packaging',
    title: 'World Without Waste',
    subtitle: 'Circular Packaging & Material Innovation',
    metric: '100%',
    metricLabel: 'Recyclable packaging design global commitment',
    description: 'We are redesigning packaging to ensure every single bottle and can has more than one life through closed-loop circular systems.',
    details: [
      'Over 40 markets already distribute 100% recycled plastic (rPET) bottles (excluding cap & label)',
      'Lightweighting bottle designs saving over 120,000 metric tons of virgin plastic annually',
      'Partnering with local recycling cooperatives in 200+ countries to collect a bottle for every one sold'
    ],
    icon: 'Recycle'
  },
  {
    id: 'water',
    title: 'Water Stewardship',
    subtitle: '100%+ Watershed Replenishment',
    metric: '159%',
    metricLabel: 'Water returned to nature vs total volume used',
    description: 'Water is our primary ingredient. We protect high-stress river basins, restore wetlands, and provide clean drinking infrastructure to vulnerable communities.',
    details: [
      'Over 2.2 trillion liters of water safely returned to nature and communities since 2015',
      'Advanced reverse-osmosis water recycling inside 98% of all operational bottling plants',
      'Community clean water access projects currently serving 18.5 million individuals worldwide'
    ],
    icon: 'Droplet'
  },
  {
    id: 'community',
    title: 'Community Empowerment',
    subtitle: 'Local Prosperity & Youth Opportunity',
    metric: '$1.4B+',
    metricLabel: 'Invested directly in community education & resilience',
    description: 'We believe sustainable progress starts on the street corner. Empowering women entrepreneurs, funding climate grants, and supporting local supply chains.',
    details: [
      'The 5by20 initiative achieved economic empowerment for 6 million female entrepreneurs',
      'Disaster relief water dispatching with over 50 million emergency bottles delivered worldwide',
      'Regenerative agriculture standards enforced across 100% of vanilla, sugar, and citrus growers'
    ],
    icon: 'Users'
  }
];

export const GLOBAL_STATS = [
  { value: '130+', label: 'Years of Timeless Heritage' },
  { value: '200+', label: 'Countries & Global Territories' },
  { value: '1.9B+', label: 'Servings Enjoyed Daily' },
  { value: '3°C', label: 'The Optimal Chilled Pour' },
];
