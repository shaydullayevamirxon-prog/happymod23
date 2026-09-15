import React from 'react';
import { ShieldCheck, Heart, Github, Smartphone, Monitor, Sparkles } from 'lucide-react';

interface FooterProps {
  onOpenGithub: () => void;
  onOpenPWAInstall: () => void;
  onRequestMod: () => void;
  onOpenUpdateScanner: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenGithub,
  onOpenPWAInstall,
  onRequestMod,
  onOpenUpdateScanner,
}) => {
  return (
    <footer className="mt-16 border-t border-neutral-800/80 bg-neutral-950 py-10 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center p-1 shadow">
                <img src="/icon.svg" alt="HappyMod" className="w-6 h-6 object-contain" />
              </div>
              <span className="text-lg font-black text-white font-mono">
                Happy<span className="text-emerald-400">Mod</span>
              </span>
            </div>
            <p className="text-xs text-neutral-400 max-w-md leading-relaxed">
              HappyMod - dunyodagi eng katta va xavfsiz mod o'yinlar va ilovalar katalogi. 
              Barcha taqdim etilayotgan modlar 100% foydalanuvchilar tomonidan tekshiriladi va 
              antivirus skanerlaridan o'tkaziladi.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <button
                onClick={onOpenGithub}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-xs text-neutral-300 hover:text-white transition"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GitHub Repozitoriyasi</span>
              </button>
              <button
                onClick={onOpenPWAInstall}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-400 hover:bg-emerald-500/20 transition"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>PWA O'rnatish</span>
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-2.5">
            <h5 className="text-xs font-bold text-white uppercase tracking-wider">Xizmatlar</h5>
            <ul className="text-xs text-neutral-400 space-y-2">
              <li>
                <button onClick={onOpenUpdateScanner} className="hover:text-emerald-400 transition">
                  Yangilanishlarni tekshirish
                </button>
              </li>
              <li>
                <button onClick={onRequestMod} className="hover:text-emerald-400 transition">
                  Yangi mod so'rash
                </button>
              </li>
              <li>
                <button onClick={onOpenPWAInstall} className="hover:text-emerald-400 transition">
                  Telefon va Kompyuter ilovasi
                </button>
              </li>
            </ul>
          </div>

          {/* Trust Badges */}
          <div className="space-y-2.5">
            <h5 className="text-xs font-bold text-white uppercase tracking-wider">Xavfsizlik</h5>
            <div className="space-y-2 text-xs text-neutral-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>VirusTotal Toza (0/72)</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Google Play Protect</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>100% Ishlaydigan Modlar</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-500">
          <p>© 2026 HappyMod Store. Barcha modlar ochiq manba va bepul foydalanish uchun.</p>
          <div className="flex items-center gap-1">
            <span>O'zbekiston foydalanuvchilari uchun maxsus tayyorlandi</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
