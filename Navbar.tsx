import { Search, Globe } from 'lucide-react';
import { useLang } from './LangContext';
import { t } from '../i18n';

interface NavbarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedCategory: string;
  onCategoryChange: (c: string) => void;
  categories: { id: string; nameId: string; nameEn: string }[];
}

export default function Navbar({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  categories,
}: NavbarProps) {
  const { lang, toggleLang } = useLang();

  return (
    <nav className="fixed top-0 left-0 right-0 z-[1000] glass border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-3">
        <a href="/" className="flex items-center gap-2 shrink-0">
          <span className="text-2xl font-black tracking-wider text-white neon-text">
            LOOKVERSE
          </span>
        </a>

        <div className="flex-1 flex items-center gap-3 ml-4">
          <div className="relative flex-1 max-w-md">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={e => onSearchChange(e.target.value)}
              placeholder={t('search', lang)}
              className="w-full bg-white/5 border border-white/10 rounded-lg pl-9 pr-3 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30 transition-all"
            />
          </div>

          <select
            value={selectedCategory}
            onChange={e => onCategoryChange(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500/50 transition-all appearance-none cursor-pointer"
          >
            <option value="" className="bg-[#1a1a1a]">
              {t('allCategories', lang)}
            </option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id} className="bg-[#1a1a1a]">
                {lang === 'id' ? cat.nameId : cat.nameEn}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={toggleLang}
          className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white hover:border-purple-500/50 hover:text-purple-400 transition-all shrink-0"
        >
          <Globe size={14} />
          <span className="font-semibold">{lang.toUpperCase()}</span>
        </button>
      </div>
    </nav>
  );
}
