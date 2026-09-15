import React from 'react';
import { ShieldCheck, Zap, DownloadCloud, Smartphone, Monitor, CheckCircle2, Award, Sparkles } from 'lucide-react';

interface HeroBannerProps {
  onSearchTag: (tag: string) => void;
  onOpenPWAInstall: () => void;
  onOpenUpdateScanner: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onSearchTag,
  onOpenPWAInstall,
  onOpenUpdateScanner,
}) => {
  const quickTags = [
    'Minecraft PE',
    'GTA San Andreas',
    'Subway Surfers',
    'Car Parking',
    'Roblox',
    'Free Fire MAX',
    'Spotify Premium',
    'CapCut Pro',
    'Brawl Stars',
  ];

  return (
    <div className="relative overflow-hidden border-b border-neutral-800 bg-gradient-to-b from-neutral-900/60 via-neutral-950 to-neutral-950 px-4 py-8 sm:py-12">
      {/* Background glow circle */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 sm:w-[600px] h-64 bg-emerald-500/10 blur-[100px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Left Column Text */}
          <div className="max-w-2xl text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Telefon va Kompyuter uchun 100% Ishlaydigan Modlar</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4 leading-tight">
              Barcha Sevimli O'yinlaringizni{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500">
                HappyMod
              </span>{' '}
              Bilan Cheklovlarsiz O'ynang
            </h1>

            <p className="text-sm sm:text-base text-neutral-300 mb-6 leading-relaxed">
              Cheksiz pullar, barcha qahramon va skinlar ochiq, reklamasiz toza o'yinlar hamda VIP ilovalar.
              Har bir mod xavfsizlik tekshiruvidan o'tgan va 100% sinovdan o'tkazilgan.
            </p>

            {/* Quick action buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mb-6">
              <button
                id="hero-install-btn"
                onClick={onOpenPWAInstall}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-sm shadow-lg shadow-emerald-500/25 transition transform active:scale-95"
              >
                <DownloadCloud className="w-4 h-4" />
                <span>HappyMod Ilovasini O'rnatish</span>
              </button>

              <button
                id="hero-check-updates"
                onClick={onOpenUpdateScanner}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-200 text-sm font-semibold transition"
              >
                <Zap className="w-4 h-4 text-emerald-400" />
                <span>Mod Yangilanishlarini Tekshirish</span>
              </button>
            </div>

            {/* Platform pills */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 text-xs text-neutral-400">
              <div className="flex items-center gap-1.5 bg-neutral-900/80 px-2.5 py-1 rounded-md border border-neutral-800">
                <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
                <span>Android (APK & OBB)</span>
              </div>
              <div className="flex items-center gap-1.5 bg-neutral-900/80 px-2.5 py-1 rounded-md border border-neutral-800">
                <Monitor className="w-3.5 h-3.5 text-blue-400" />
                <span>Kompyuter (Windows EXE & Mac)</span>
              </div>
              <div className="flex items-center gap-1.5 bg-neutral-900/80 px-2.5 py-1 rounded-md border border-neutral-800">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>100% Virusdan Xoli</span>
              </div>
            </div>
          </div>

          {/* Right Column Highlights Card */}
          <div className="w-full lg:w-96 bg-neutral-900/80 border border-neutral-800/80 rounded-2xl p-5 shadow-2xl backdrop-blur-sm">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <span className="font-bold text-sm text-white">Xavfsizlik Kafolati</span>
              </div>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                VERIFIED
              </span>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-start gap-2.5 text-xs text-neutral-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">VirusTotal Skanneri:</strong> Har bir yuklangan fayl 70 dan ortiq antivirusda sinovdan o'tkaziladi.
                </div>
              </div>

              <div className="flex items-start gap-2.5 text-xs text-neutral-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">Hamjamiyat Tasdig'i:</strong> Modlar faqat 85% dan yuqori ijobiy baholanganda tavsiya etiladi.
                </div>
              </div>

              <div className="flex items-start gap-2.5 text-xs text-neutral-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">Tezkor Yuklash:</strong> Kesh va yuklama menejeri orqali maksimal tezlikda uzluksiz yuklash.
                </div>
              </div>
            </div>

            {/* Quick stats grid */}
            <div className="grid grid-cols-3 gap-2 pt-3 border-t border-neutral-800 text-center">
              <div className="bg-neutral-950/60 rounded-lg p-2">
                <div className="text-base font-bold text-emerald-400 font-mono">100K+</div>
                <div className="text-[10px] text-neutral-400">Mod O'yinlar</div>
              </div>
              <div className="bg-neutral-950/60 rounded-lg p-2">
                <div className="text-base font-bold text-white font-mono">98.5%</div>
                <div className="text-[10px] text-neutral-400">Ishlaydi</div>
              </div>
              <div className="bg-neutral-950/60 rounded-lg p-2">
                <div className="text-base font-bold text-teal-400 font-mono">0 ta</div>
                <div className="text-[10px] text-neutral-400">Tahdid</div>
              </div>
            </div>
          </div>
        </div>

        {/* Popular Quick Search Tags */}
        <div className="mt-8 pt-6 border-t border-neutral-800/80 flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-neutral-400 mr-1">Ommabop qidiruvlar:</span>
          {quickTags.map((tag) => (
            <button
              key={tag}
              onClick={() => onSearchTag(tag)}
              className="text-xs px-2.5 py-1 rounded-full bg-neutral-900 hover:bg-emerald-500/20 hover:text-emerald-300 border border-neutral-800 text-neutral-300 transition"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
