import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { useLang } from '../components/LangContext';
import { t } from '../i18n';
import { adminLogin } from '../store';

export default function LoginPage() {
  const { lang } = useLang();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminLogin(password)) {
      navigate('/admin', { replace: true });
    } else {
      setError(true);
      setTimeout(() => setError(false), 2500);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="glass-card rounded-2xl p-8 w-full max-w-sm space-y-6 animate-fade-in"
      >
        <div className="text-center">
          <h1 className="text-3xl font-black tracking-wider neon-text mb-1">LOOKVERSE</h1>
          <p className="text-white/40 text-sm">{t('adminLogin', lang)}</p>
        </div>

        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder={t('password', lang)}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30 transition-all pr-12"
            autoFocus
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {error && (
          <p className="text-red-400 text-sm text-center animate-shake">
            {t('wrongPassword', lang)}
          </p>
        )}

        <button
          type="submit"
          className="w-full py-3 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl transition-all duration-300 hover:shadow-[0_0_20px_rgba(123,0,255,0.4)] active:scale-95"
        >
          {t('login', lang)}
        </button>
      </form>
    </div>
  );
}
