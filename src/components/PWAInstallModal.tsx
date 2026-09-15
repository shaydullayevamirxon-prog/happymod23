import React from 'react';
import {
  X,
  Smartphone,
  Monitor,
  DownloadCloud,
  CheckCircle2,
  Share,
  PlusSquare,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';

interface PWAInstallModalProps {
  onClose: () => void;
  onInstall: () => Promise<boolean>;
  isInstallable: boolean;
  isIOS: boolean;
  isAndroid: boolean;
  isWindows: boolean;
  isInstalled: boolean;
}

export const PWAInstallModal: React.FC<PWAInstallModalProps> = ({
  onClose,
  onInstall,
  isInstallable,
  isIOS,
  isAndroid,
  isWindows,
  isInstalled,
}) => {
  const handleInstallClick = async () => {
    const success = await onInstall();
    if (success) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col">
        {/* Header with App Logo */}
        <div className="p-6 bg-gradient-to-b from-neutral-800/60 to-neutral-900 border-b border-neutral-800 text-center relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 mx-auto mb-3 p-2 shadow-xl shadow-emerald-500/25 flex items-center justify-center">
            <img src="/icon.svg" alt="HappyMod" className="w-12 h-12 object-contain" />
          </div>

          <h3 className="text-xl font-black text-white mb-1">
            HappyMod Ilovasini O'rnatish
          </h3>
          <p className="text-xs text-neutral-300 max-w-xs mx-auto">
            Telefon (Android / iPhone) yoki Kompyuteringizga (Windows / Mac) o'rnating va o'yinlarni tezkor yuklab oling
          </p>
        </div>

        {/* Body Content */}
        <div className="p-6 space-y-5">
          {/* Main Direct Install Button (If supported by browser) */}
          {isInstallable ? (
            <div className="space-y-3">
              <button
                onClick={handleInstallClick}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-sm shadow-lg shadow-emerald-500/25 transition active:scale-95"
              >
                <DownloadCloud className="w-5 h-5" />
                <span>Hoziroq O'rnatish (1-klikda)</span>
              </button>
              <p className="text-[11px] text-center text-neutral-400">
                Google Chrome, Edge yoki Samsung Internet brauzerlarida to'g'ridan-to'g'ri ish stoliga o'rnatiladi.
              </p>
            </div>
          ) : isInstalled ? (
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-4 text-center">
              <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
              <h4 className="text-sm font-bold text-white mb-1">Ilova allaqachon o'rnatilgan!</h4>
              <p className="text-xs text-neutral-400">
                Siz HappyMod-dan mustaqil ilova (PWA) sifatida foydalanmoqdasiz.
              </p>
            </div>
          ) : null}

          {/* Device Specific Guides */}
          <div className="space-y-4">
            {/* Android Phone Guide */}
            <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-4 space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-bold text-white">
                <Smartphone className="w-4 h-4 text-emerald-400" />
                <span>Android Telefon uchun:</span>
              </div>
              <ol className="text-xs text-neutral-300 space-y-1.5 list-decimal list-inside leading-relaxed">
                <li>Brauzer menyusini oching (yuqori o'ng burchakdagi <strong>3 nuqta</strong>).</li>
                <li><strong>"Ilovani o'rnatish"</strong> yoki <strong>"Bosh ekranga qo'shish"</strong> (Add to Home Screen) tugmasini bosing.</li>
                <li>HappyMod belgisi telefoningiz bosh ekranida paydo bo'ladi.</li>
              </ol>
            </div>

            {/* iOS iPhone / iPad Guide */}
            <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-4 space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-bold text-white">
                <Share className="w-4 h-4 text-blue-400" />
                <span>iPhone / iPad (iOS Safari) uchun:</span>
              </div>
              <ol className="text-xs text-neutral-300 space-y-1.5 list-decimal list-inside leading-relaxed">
                <li>Safari pastki panelidagi <strong className="text-white">"Ulashish" (Share / kvadrat strelka)</strong> tugmasini bosing.</li>
                <li>Menyuni pastga surib, <strong className="text-white">"Bosh ekranga qo'shish" (Add to Home Screen)</strong> bandini tanlang.</li>
                <li>Yuqori o'ng burchakdagi <strong>"Qo'shish" (Add)</strong> tugmasini bosing.</li>
              </ol>
            </div>

            {/* PC / Laptop Guide */}
            <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-4 space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-bold text-white">
                <Monitor className="w-4 h-4 text-cyan-400" />
                <span>Kompyuter (Windows / Mac) uchun:</span>
              </div>
              <p className="text-xs text-neutral-300 leading-relaxed">
                Chrome yoki Edge brauzerining manzil satrida (URL o'ng tomonida) joylashgan <strong>"Ilovani o'rnatish"</strong> piktogrammasini bosing. HappyMod alohida kompyuter dasturi kabi ishlaydi.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-neutral-950/80 border-t border-neutral-800 text-center">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-semibold transition"
          >
            Tushundim, Yopish
          </button>
        </div>
      </div>
    </div>
  );
};
