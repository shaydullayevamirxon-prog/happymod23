import React, { useState } from 'react';
import {
  X,
  RefreshCw,
  CheckCircle2,
  Zap,
  Clock,
  Download,
  Bell,
  Sparkles,
  Smartphone,
  ShieldCheck,
} from 'lucide-react';
import { Game } from '../types';

interface UpdateScannerModalProps {
  games: Game[];
  onClose: () => void;
  onUpdateGame: (game: Game) => void;
}

export const UpdateScannerModal: React.FC<UpdateScannerModalProps> = ({
  games,
  onClose,
  onUpdateGame,
}) => {
  const [isScanning, setIsScanning] = useState(false);
  const [autoNotify, setAutoNotify] = useState(true);
  const [scanComplete, setScanComplete] = useState(false);

  // Filter games with updates or recent dates
  const updatedGames = games.filter((g) => g.isUpdatedRecently);

  const runScan = () => {
    setIsScanning(true);
    setScanComplete(false);
    setTimeout(() => {
      setIsScanning(false);
      setScanComplete(true);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-neutral-800 flex items-center justify-between bg-neutral-950/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <RefreshCw className={`w-4 h-4 ${isScanning ? 'animate-spin text-emerald-400' : ''}`} />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Doimiy Yangilanishlar Markazi</h3>
              <p className="text-xs text-neutral-400">
                O'yin va ilovalarning eng so'nggi xavfsiz mod versiyalari
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Action / Status Bar */}
        <div className="p-4 bg-neutral-950/50 border-b border-neutral-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={runScan}
              disabled={isScanning}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold transition disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isScanning ? 'animate-spin' : ''}`} />
              <span>{isScanning ? 'Tekshirilmoqda...' : 'Serverdan Qayta Tekshirish'}</span>
            </button>

            {scanComplete && (
              <span className="text-xs text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Barcha modlar tekshirildi</span>
              </span>
            )}
          </div>

          <label className="flex items-center gap-2 text-xs text-neutral-300 cursor-pointer">
            <input
              type="checkbox"
              checked={autoNotify}
              onChange={(e) => setAutoNotify(e.target.checked)}
              className="rounded accent-emerald-500"
            />
            <Bell className="w-3.5 h-3.5 text-neutral-400" />
            <span>Yangi mod chiqqanda xabar berish</span>
          </label>
        </div>

        {/* Updated games list */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3">
          <div className="text-xs text-neutral-400 flex items-center justify-between mb-1">
            <span>Yangi chiqarilgan versiyalar ({updatedGames.length} ta o'yin):</span>
            <span className="text-[11px] font-mono text-emerald-400">Har kuni 24/7 sinxronizatsiya</span>
          </div>

          {updatedGames.map((game) => (
            <div
              key={game.id}
              className="bg-neutral-950 border border-neutral-800 rounded-2xl p-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 hover:border-emerald-500/40 transition"
            >
              <div className="flex items-start gap-3 min-w-0">
                <img
                  src={game.icon}
                  alt={game.title}
                  className="w-12 h-12 rounded-xl object-cover shrink-0 border border-neutral-800"
                />
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h5 className="text-xs sm:text-sm font-bold text-white truncate">
                      {game.title}
                    </h5>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-400 font-mono font-bold">
                      v{game.version}
                    </span>
                  </div>

                  <p className="text-xs text-neutral-300 line-clamp-1 mb-1">
                    {game.versions[0]?.changelog || 'Barqarorlik yaxshilandi va yangi mod funksiyalari qo\'shildi.'}
                  </p>

                  <div className="flex items-center gap-2 text-[11px] text-neutral-400 font-mono">
                    <span className="text-neutral-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {game.updatedDate}
                    </span>
                    <span>•</span>
                    <span className="text-emerald-400">{game.workingPercentage}% Ishlaydi</span>
                    <span>•</span>
                    <span>{game.size}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  onUpdateGame(game);
                  onClose();
                }}
                className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold shrink-0 transition"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Yangilash</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
