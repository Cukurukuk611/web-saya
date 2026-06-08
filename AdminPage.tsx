import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Plus, Pencil, Trash2, LogOut, Package, Tags, X, Save, ImagePlus,
} from 'lucide-react';
import { useLang } from '../components/LangContext';
import { t } from '../i18n';
import {
  getProducts, setProducts, getCategories, setCategories,
  adminLogout, genId,
} from '../store';
import type { Product, Category } from '../types';

export default function AdminPage() {
  const { lang } = useLang();
  const navigate = useNavigate();
  const [tab, setTab] = useState<'products' | 'categories'>('products');
  const [products, setProductsState] = useState<Product[]>([]);
  const [categories, setCategoriesState] = useState<Category[]>([]);
  const [showProductModal, setShowProductModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const [formNameId, setFormNameId] = useState('');
  const [formNameEn, setFormNameEn] = useState('');
  const [formPrice, setFormPrice] = useState('');
  const [formUrl, setFormUrl] = useState('');
  const [formCategory, setFormCategory] = useState('');
  const [formBadge, setFormBadge] = useState('');
  const [formNumber, setFormNumber] = useState(1);
  const [formImage, setFormImage] = useState('');
  const [catNameId, setCatNameId] = useState('');
  const [catNameEn, setCatNameEn] = useState('');

  const reload = useCallback(() => {
    setProductsState(getProducts());
    setCategoriesState(getCategories());
  }, []);

  useEffect(() => { reload(); }, [reload]);

  const handleLogout = () => {
    adminLogout();
    navigate('/', { replace: true });
  };

  const openAddProduct = () => {
    setEditingProduct(null);
    const nextNum = products.length > 0 ? Math.max(...products.map(p => p.number)) + 1 : 1;
    setFormNumber(nextNum);
    setFormNameId(''); setFormNameEn(''); setFormPrice(''); setFormUrl('');
    setFormCategory(categories[0]?.id ?? ''); setFormBadge(''); setFormImage('');
    setShowProductModal(true);
  };

  const openEditProduct = (p: Product) => {
    setEditingProduct(p);
    setFormNumber(p.number); setFormNameId(p.nameId); setFormNameEn(p.nameEn);
    setFormPrice(p.price); setFormUrl(p.affiliateUrl); setFormCategory(p.category);
    setFormBadge(p.badge ?? ''); setFormImage(p.image);
    setShowProductModal(true);
  };

  const saveProduct = () => {
    const data: Product = {
      id: editingProduct?.id ?? genId(),
      number: formNumber,
      nameId: formNameId,
      nameEn: formNameEn,
      price: formPrice,
      image: formImage,
      affiliateUrl: formUrl,
      category: formCategory,
      badge: formBadge || undefined,
    };
    const updated = editingProduct
      ? products.map(p => (p.id === editingProduct.id ? data : p))
      : [...products, data];
    setProducts(updated);
    setProductsState(updated);
    setShowProductModal(false);
  };

  const deleteProduct = (id: string) => {
    const updated = products.filter(p => p.id !== id);
    setProducts(updated);
    setProductsState(updated);
    setDeleteConfirm(null);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setFormImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const openAddCategory = () => {
    setEditingCategory(null);
    setCatNameId(''); setCatNameEn('');
    setShowCategoryModal(true);
  };

  const openEditCategory = (c: Category) => {
    setEditingCategory(c);
    setCatNameId(c.nameId); setCatNameEn(c.nameEn);
    setShowCategoryModal(true);
  };

  const saveCategory = () => {
    const data: Category = {
      id: editingCategory?.id ?? genId(),
      nameId: catNameId,
      nameEn: catNameEn,
    };
    const updated = editingCategory
      ? categories.map(c => (c.id === editingCategory.id ? data : c))
      : [...categories, data];
    setCategories(updated);
    setCategoriesState(updated);
    setShowCategoryModal(false);
  };

  const deleteCategory = (id: string) => {
    const updated = categories.filter(c => c.id !== id);
    setCategories(updated);
    setCategoriesState(updated);
    setDeleteConfirm(null);
  };

  const getCategoryName = (id: string) => {
    const cat = categories.find(c => c.id === id);
    return cat ? (lang === 'id' ? cat.nameId : cat.nameEn) : id;
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] pt-6 pb-10 px-4">
      <div className="max-w-5xl mx-auto flex items-center justify-between mb-8">
        <h1 className="text-2xl font-black tracking-wider neon-text">LOOKVERSE CMS</h1>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 border border-purple-500/50 text-purple-400 rounded-xl hover:bg-purple-500/10 hover:shadow-[0_0_15px_rgba(123,0,255,0.2)] transition-all text-sm font-semibold"
        >
          <LogOut size={16} />
          {t('logout', lang)}
        </button>
      </div>

      <div className="max-w-5xl mx-auto flex gap-2 mb-6">
        <button
          onClick={() => setTab('products')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
            tab === 'products'
              ? 'bg-purple-600 text-white shadow-[0_0_15px_rgba(123,0,255,0.3)]'
              : 'bg-white/5 text-white/60 hover:bg-white/10'
          }`}
        >
          <Package size={16} />
          {t('products', lang)} ({products.length})
        </button>
        <button
          onClick={() => setTab('categories')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
            tab === 'categories'
              ? 'bg-purple-600 text-white shadow-[0_0_15px_rgba(123,0,255,0.3)]'
              : 'bg-white/5 text-white/60 hover:bg-white/10'
          }`}
        >
          <Tags size={16} />
          {t('categories', lang)} ({categories.length})
        </button>
      </div>

      <div className="max-w-5xl mx-auto">
        {tab === 'products' && (
          <div className="space-y-4">
            <button
              onClick={openAddProduct}
              className="flex items-center gap-2 px-5 py-2.5 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-sm font-semibold transition-all hover:shadow-[0_0_15px_rgba(123,0,255,0.3)]"
            >
              <Plus size={16} />
              {t('addProduct', lang)}
            </button>

            <div className="grid gap-3">
              {products.map(p => (
                <div key={p.id} className="glass-card rounded-xl p-4 flex items-center gap-4">
                  <img src={p.image} alt={p.nameEn} className="w-16 h-16 rounded-lg object-cover shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-semibold text-sm truncate">
                      {String(p.number).padStart(2, '0')} - {lang === 'id' ? p.nameId : p.nameEn}
                    </p>
                    <p className="text-white/40 text-xs">{p.price} &middot; {getCategoryName(p.category)}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button onClick={() => openEditProduct(p)} className="p-2 text-white/40 hover:text-purple-400 transition-colors">
                      <Pencil size={16} />
                    </button>
                    {deleteConfirm === p.id ? (
                      <div className="flex items-center gap-1">
                        <button onClick={() => deleteProduct(p.id)} className="px-3 py-1 bg-red-600 text-white text-xs rounded-lg font-semibold">{t('delete', lang)}</button>
                        <button onClick={() => setDeleteConfirm(null)} className="px-3 py-1 bg-white/10 text-white/60 text-xs rounded-lg">{t('cancel', lang)}</button>
                      </div>
                    ) : (
                      <button onClick={() => setDeleteConfirm(p.id)} className="p-2 text-white/40 hover:text-red-400 transition-colors">
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'categories' && (
          <div className="space-y-4">
            <button
              onClick={openAddCategory}
              className="flex items-center gap-2 px-5 py-2.5 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-sm font-semibold transition-all hover:shadow-[0_0_15px_rgba(123,0,255,0.3)]"
            >
              <Plus size={16} />
              {t('addCategory', lang)}
            </button>

            <div className="grid gap-3">
              {categories.map(c => (
                <div key={c.id} className="glass-card rounded-xl p-4 flex items-center gap-4">
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-semibold text-sm">{lang === 'id' ? c.nameId : c.nameEn}</p>
                    <p className="text-white/30 text-xs">{c.nameId} / {c.nameEn}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button onClick={() => openEditCategory(c)} className="p-2 text-white/40 hover:text-purple-400 transition-colors">
                      <Pencil size={16} />
                    </button>
                    {deleteConfirm === c.id ? (
                      <div className="flex items-center gap-1">
                        <button onClick={() => deleteCategory(c.id)} className="px-3 py-1 bg-red-600 text-white text-xs rounded-lg font-semibold">{t('delete', lang)}</button>
                        <button onClick={() => setDeleteConfirm(null)} className="px-3 py-1 bg-white/10 text-white/60 text-xs rounded-lg">{t('cancel', lang)}</button>
                      </div>
                    ) : (
                      <button onClick={() => setDeleteConfirm(c.id)} className="p-2 text-white/40 hover:text-red-400 transition-colors">
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {showProductModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="glass-card rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto space-y-4 animate-fade-in-up">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-white">{editingProduct ? t('editProduct', lang) : t('addProduct', lang)}</h2>
              <button onClick={() => setShowProductModal(false)} className="p-1.5 text-white/40 hover:text-white transition-colors"><X size={20} /></button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="block text-white/50 text-xs mb-1">{t('productNumber', lang)}</label>
                <input type="number" value={formNumber} onChange={e => setFormNumber(Number(e.target.value))} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500/50 transition-all" />
              </div>
              <div>
                <label className="block text-white/50 text-xs mb-1">{t('productNameId', lang)}</label>
                <input type="text" value={formNameId} onChange={e => setFormNameId(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500/50 transition-all" />
              </div>
              <div>
                <label className="block text-white/50 text-xs mb-1">{t('productNameEn', lang)}</label>
                <input type="text" value={formNameEn} onChange={e => setFormNameEn(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500/50 transition-all" />
              </div>
              <div>
                <label className="block text-white/50 text-xs mb-1">{t('productPrice', lang)}</label>
                <input type="text" value={formPrice} onChange={e => setFormPrice(e.target.value)} placeholder="Rp 259.000" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-white/20 focus:outline-none focus:border-purple-500/50 transition-all" />
              </div>
              <div>
                <label className="block text-white/50 text-xs mb-1">{t('affiliateUrl', lang)}</label>
                <input type="url" value={formUrl} onChange={e => setFormUrl(e.target.value)} placeholder="https://shopee.co.id/..." className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-white/20 focus:outline-none focus:border-purple-500/50 transition-all" />
              </div>
              <div>
                <label className="block text-white/50 text-xs mb-1">{t('productCategory', lang)}</label>
                <select value={formCategory} onChange={e => setFormCategory(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500/50 transition-all">
                  {categories.map(c => (
                    <option key={c.id} value={c.id} className="bg-[#1a1a1a]">{c.nameId} / {c.nameEn}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-white/50 text-xs mb-1">{t('productBadge', lang)}</label>
                <input type="text" value={formBadge} onChange={e => setFormBadge(e.target.value)} placeholder="BEST SELLER / NEW / ..." className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-white/20 focus:outline-none focus:border-purple-500/50 transition-all" />
              </div>
              <div>
                <label className="block text-white/50 text-xs mb-1">{t('uploadImage', lang)}</label>
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg cursor-pointer hover:border-purple-500/50 transition-all text-sm text-white/60">
                    <ImagePlus size={16} />
                    <span>Choose file</span>
                    <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                  </label>
                  {formImage && <img src={formImage} alt="preview" className="w-12 h-12 rounded-lg object-cover" />}
                </div>
                <input
                  type="text"
                  value={formImage.startsWith('data:') ? '[uploaded image]' : formImage}
                  onChange={e => setFormImage(e.target.value)}
                  placeholder="Or paste image URL..."
                  className="w-full mt-2 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-white/20 focus:outline-none focus:border-purple-500/50 transition-all"
                  readOnly={formImage.startsWith('data:')}
                />
              </div>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <button onClick={saveProduct} className="flex items-center gap-2 px-5 py-2.5 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-sm font-semibold transition-all hover:shadow-[0_0_15px_rgba(123,0,255,0.3)]">
                <Save size={16} />{t('save', lang)}
              </button>
              <button onClick={() => setShowProductModal(false)} className="px-5 py-2.5 bg-white/5 text-white/60 rounded-xl text-sm hover:bg-white/10 transition-all">
                {t('cancel', lang)}
              </button>
            </div>
          </div>
        </div>
      )}

      {showCategoryModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="glass-card rounded-2xl p-6 w-full max-w-sm space-y-4 animate-fade-in-up">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-white">{editingCategory ? t('editProduct', lang) : t('addCategory', lang)}</h2>
              <button onClick={() => setShowCategoryModal(false)} className="p-1.5 text-white/40 hover:text-white transition-colors"><X size={20} /></button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="block text-white/50 text-xs mb-1">{t('categoryNameId', lang)}</label>
                <input type="text" value={catNameId} onChange={e => setCatNameId(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500/50 transition-all" />
              </div>
              <div>
                <label className="block text-white/50 text-xs mb-1">{t('categoryNameEn', lang)}</label>
                <input type="text" value={catNameEn} onChange={e => setCatNameEn(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500/50 transition-all" />
              </div>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <button onClick={saveCategory} className="flex items-center gap-2 px-5 py-2.5 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-sm font-semibold transition-all hover:shadow-[0_0_15px_rgba(123,0,255,0.3)]">
                <Save size={16} />{t('save', lang)}
              </button>
              <button onClick={() => setShowCategoryModal(false)} className="px-5 py-2.5 bg-white/5 text-white/60 rounded-xl text-sm hover:bg-white/10 transition-all">
                {t('cancel', lang)}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
