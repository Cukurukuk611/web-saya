import type { Product, Category, Lang } from './types';

const PRODUCTS_KEY = 'lookverse_products';
const CATEGORIES_KEY = 'lookverse_categories';
const LANG_KEY = 'lookverse_lang';

const defaultCategories: Category[] = [
  { id: 'cat1', nameId: 'Hoodie', nameEn: 'Hoodie' },
  { id: 'cat2', nameId: 'Parfum', nameEn: 'Perfume' },
  { id: 'cat3', nameId: 'Sneakers', nameEn: 'Sneakers' },
];

const defaultProducts: Product[] = [
  {
    id: 'prod1',
    number: 1,
    nameId: 'Shadow Hoodie',
    nameEn: 'Shadow Hoodie',
    price: 'Rp 289.000',
    image: 'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=600',
    affiliateUrl: 'https://shopee.co.id/',
    category: 'cat1',
    badge: 'BEST SELLER',
  },
  {
    id: 'prod2',
    number: 2,
    nameId: 'Midnight Parfum',
    nameEn: 'Midnight Parfum',
    price: 'Rp 159.000',
    image: 'https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg?auto=compress&cs=tinysrgb&w=600',
    affiliateUrl: 'https://shopee.co.id/',
    category: 'cat2',
  },
  {
    id: 'prod3',
    number: 3,
    nameId: 'Neon Sneakers',
    nameEn: 'Neon Sneakers',
    price: 'Rp 459.000',
    image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=600',
    affiliateUrl: 'https://shopee.co.id/',
    category: 'cat3',
    badge: 'NEW',
  },
];

function getStored<T>(key: string, fallback: T[]): T[] {
  try {
    const raw = localStorage.getItem(key);
    if (raw) return JSON.parse(raw);
  } catch { /* ignore */ }
  return fallback;
}

function setStored<T>(key: string, data: T[]): void {
  localStorage.setItem(key, JSON.stringify(data));
}

export function getProducts(): Product[] {
  return getStored(PRODUCTS_KEY, defaultProducts);
}

export function setProducts(products: Product[]): void {
  setStored(PRODUCTS_KEY, products);
}

export function getCategories(): Category[] {
  return getStored(CATEGORIES_KEY, defaultCategories);
}

export function setCategories(categories: Category[]): void {
  setStored(CATEGORIES_KEY, categories);
}

export function getLang(): Lang {
  return (localStorage.getItem(LANG_KEY) as Lang) || 'id';
}

export function setLang(lang: Lang): void {
  localStorage.setItem(LANG_KEY, lang);
}

export function isAdminAuth(): boolean {
  return sessionStorage.getItem('lookverse_admin') === 'true';
}

export function adminLogin(password: string): boolean {
  if (password === 'lookverse2024') {
    sessionStorage.setItem('lookverse_admin', 'true');
    return true;
  }
  return false;
}

export function adminLogout(): void {
  sessionStorage.removeItem('lookverse_admin');
}

export function genId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}
