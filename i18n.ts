import type { Lang, Translations } from './types';

export const translations: Translations = {
  tagline: { id: 'Berani Tampil Berbeda', en: 'Dare To Be Different' },
  buyHere: { id: 'BELI DISINI', en: 'BUY HERE' },
  search: { id: 'Cari produk...', en: 'Search products...' },
  allCategories: { id: 'Semua Kategori', en: 'All Categories' },
  footerText: { id: 'Fashion Futuristik untuk Generasi Berani', en: 'Futuristic Fashion for the Bold Generation' },
  footerRights: { id: 'Hak Cipta Dilindungi', en: 'All Rights Reserved' },
  adminLogin: { id: 'Login Admin', en: 'Admin Login' },
  password: { id: 'Kata Sandi', en: 'Password' },
  login: { id: 'Masuk', en: 'Login' },
  logout: { id: 'Keluar', en: 'Logout' },
  wrongPassword: { id: 'Kata sandi salah!', en: 'Wrong password!' },
  addProduct: { id: 'Tambah Produk', en: 'Add Product' },
  editProduct: { id: 'Edit Produk', en: 'Edit Product' },
  deleteProduct: { id: 'Hapus Produk', en: 'Delete Product' },
  productNameId: { id: 'Nama Produk (ID)', en: 'Product Name (ID)' },
  productNameEn: { id: 'Nama Produk (EN)', en: 'Product Name (EN)' },
  productPrice: { id: 'Harga', en: 'Price' },
  affiliateUrl: { id: 'Link Shopee', en: 'Shopee Link' },
  productImage: { id: 'Gambar Produk', en: 'Product Image' },
  productCategory: { id: 'Kategori', en: 'Category' },
  productBadge: { id: 'Badge (opsional)', en: 'Badge (optional)' },
  productNumber: { id: 'Nomor Produk', en: 'Product Number' },
  save: { id: 'Simpan', en: 'Save' },
  cancel: { id: 'Batal', en: 'Cancel' },
  delete: { id: 'Hapus', en: 'Delete' },
  confirmDelete: { id: 'Yakin ingin menghapus?', en: 'Are you sure you want to delete?' },
  manageCategories: { id: 'Kelola Kategori', en: 'Manage Categories' },
  categoryNameId: { id: 'Nama Kategori (ID)', en: 'Category Name (ID)' },
  categoryNameEn: { id: 'Nama Kategori (EN)', en: 'Category Name (EN)' },
  addCategory: { id: 'Tambah Kategori', en: 'Add Category' },
  products: { id: 'Produk', en: 'Products' },
  categories: { id: 'Kategori', en: 'Categories' },
  uploadImage: { id: 'Unggah Gambar', en: 'Upload Image' },
  noProducts: { id: 'Belum ada produk', en: 'No products yet' },
  dashboard: { id: 'Dashboard', en: 'Dashboard' },
};

export function t(key: string, lang: Lang): string {
  return translations[key]?.[lang] ?? key;
}
