import { ExternalLink } from 'lucide-react';
import type { Product, Category, Lang } from '../types';
import { t } from '../i18n';

interface ProductCardProps {
  product: Product;
  category?: Category;
  lang: Lang;
}

export default function ProductCard({ product, category, lang }: ProductCardProps) {
  const displayName = lang === 'id' ? product.nameId : product.nameEn;
  const categoryName = category
    ? lang === 'id' ? category.nameId : category.nameEn
    : '';
  const formattedNumber = String(product.number).padStart(2, '0');

  return (
    <div className="group glass-card rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(123,0,255,0.15)]">
      <a
        href={product.affiliateUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block relative overflow-hidden aspect-square"
      >
        <img
          src={product.image}
          alt={displayName}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        {product.badge && (
          <span className="absolute top-3 left-3 px-3 py-1 text-xs font-bold bg-purple-600/90 text-white rounded-full backdrop-blur-sm">
            {product.badge}
          </span>
        )}
      </a>

      <div className="p-4 space-y-3">
        <a
          href={product.affiliateUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full"
        >
          <button className="w-full py-2.5 px-4 bg-purple-600 hover:bg-purple-500 text-white text-sm font-bold rounded-xl flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-[0_0_20px_rgba(123,0,255,0.4)] active:scale-95">
            {t('buyHere', lang)}
            <ExternalLink size={14} />
          </button>
        </a>

        <div className="flex items-center justify-between">
          <span className="text-white font-bold text-lg">{product.price}</span>
          {categoryName && (
            <span className="text-xs font-medium text-purple-400 bg-purple-500/10 px-2.5 py-1 rounded-full border border-purple-500/20">
              {categoryName}
            </span>
          )}
        </div>

        <p className="text-white/70 text-sm font-medium truncate">
          {formattedNumber} - {displayName}
        </p>
      </div>
    </div>
  );
}
