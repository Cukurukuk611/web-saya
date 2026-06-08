import { Instagram, Facebook } from 'lucide-react';
import { useLang } from './LangContext';
import { t } from '../i18n';

function TikTokIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
  );
}

export default function Footer() {
  const { lang } = useLang();

  return (
    <footer className="border-t border-white/5 bg-black/40 backdrop-blur-md mt-16">
      <div className="max-w-7xl mx-auto px-4 py-10 text-center space-y-6">
        <p className="text-white/50 text-sm">{t('footerText', lang)}</p>

        <div className="flex items-center justify-center gap-6">
          <a
            href="https://instagram.com/look.verse"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon text-white/50 hover:text-purple-400 transition-all duration-300"
          >
            <Instagram size={22} />
          </a>
          <a
            href="https://tiktok.com/@look.verse"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon text-white/50 hover:text-purple-400 transition-all duration-300"
          >
            <TikTokIcon size={22} />
          </a>
          <a
            href="https://facebook.com/share/18cL3W8WBj/"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon text-white/50 hover:text-purple-400 transition-all duration-300"
          >
            <Facebook size={22} />
          </a>
        </div>

        <div className="space-y-1">
          <p className="text-xl font-black tracking-wider neon-text">LOOKVERSE</p>
          <p className="text-white/30 text-xs">&copy; 2024 LOOKVERSE. {t('footerRights', lang)}.</p>
        </div>
      </div>
    </footer>
  );
}
