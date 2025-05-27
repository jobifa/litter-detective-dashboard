
export interface PlasticItem {
  type: 'plastic_bottles' | 'plastic_cups' | 'plastic_containers' | 'plastic_straws' | 'plastic_bags' | 'styrofoam';
  count: number;
}

export interface Detection {
  id: string;
  imageUrl: string;
  items: PlasticItem[];
  location: {
    latitude: number;
    longitude: number;
    address?: string;
  };
  date: string;
  userId: string;
  totalItems: number;
}

export const PLASTIC_TYPES = {
  plastic_bottles: 'Plastic Bottles',
  plastic_cups: 'Plastic Cups',
  plastic_containers: 'Plastic Containers', 
  plastic_straws: 'Plastic Straws',
  plastic_bags: 'Plastic Bags',
  styrofoam: 'Styrofoam'
} as const;
