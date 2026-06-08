import { useState, useMemo } from 'react';
import { useLang } from '../components/LangContext';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import Footer from '../components/Footer';
import { getProducts, getCategories } from '../store';
import { t } from '../i18n';

export default function HomePage() {
  const { lang } = useLang();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const products = useMemo(() => getProducts(), []);
  const categories = useMemo(() => getCategories(), []);

  const filtered = useMemo(() => {
    return products.filter(p => {
      const name = lang === 'id' ? p.nameId : p.nameEn;
      const matchSearch = !searchQuery || name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchCategory = !selectedCategory || p.category === selectedCategory;
      return matchSearch && matchCategory;
    });
  }, [products, searchQuery, selectedCategory, lang]);

  const getCategory = (id: string) => categories.find(c => c.id === id);

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Navbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        categories={categories}
      />

      <main className="pt-24 pb-8 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-12 mt-4 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-black tracking-wider neon-text mb-3">
            LOOKVERSE
          </h1>
          <p className="text-white/50 text-lg font-light tracking-wide">
            {t('tagline', lang)}
          </p>
        </div>

        {filtered.length === 0 ? (
          <p className="text-center text-white/40 py-20 text-lg">
            {t('noProducts', lang)}
          </p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {filtered.map((product, i) => (
              <div
                key={product.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <ProductCard
                  product={product}
                  category={getCategory(product.category)}
                  lang={lang}
                />
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
