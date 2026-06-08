export type Lang = 'id' | 'en';

export interface Product {
  id: string;
  number: number;
  nameId: string;
  nameEn: string;
  price: string;
  image: string;
  affiliateUrl: string;
  category: string;
  badge?: string;
}

export interface Category {
  id: string;
  nameId: string;
  nameEn: string;
}

export interface Translations {
  [key: string]: { id: string; en: string };
}
