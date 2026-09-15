import React from 'react';
import {
  Star,
  Download,
  ShieldCheck,
  Smartphone,
  Monitor,
  Bookmark,
  CheckCircle,
  Sparkles,
} from 'lucide-react';
import { Game } from '../types';

interface GameCardProps {
  game: Game;
  isBookmarked: boolean;
  onToggleBookmark: (gameId: string) => void;
  onSelectGame: (game: Game) => void;
  onQuickDownload: (game: Game, type: 'apk' | 'pc_installer') => void;
}

export const GameCard: React.FC<GameCardProps> = ({
  game,
  isBookmarked,
  onToggleBookmark,
  onSelectGame,
  onQuickDownload,
}) => {
  return (
    <div className="group relative flex flex-col justify-between bg-neutral-900/90 hover:bg-neutral-900 border border-neutral-800/80 hover:border-emerald-500/50 rounded-2xl p-4 transition-all duration-200 hover:shadow-xl hover:shadow-emerald-500/5">
      {/* Top Section: Icon, Title, Rating, Bookmark */}
      <div>
        <div className="flex items-start gap-3 mb-3">
          {/* Game App Icon */}
          <div
            onClick={() => onSelectGame(game)}
            className="relative w-16 h-16 sm:w-18 sm:h-18 rounded-2xl overflow-hidden bg-neutral-800 shrink-0 cursor-pointer border border-neutral-700/50 shadow-md group-hover:scale-105 transition-transform"
          >
            <img
              src={game.icon}
              alt={game.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            {game.isTrending && (
              <span className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 to-transparent text-[9px] text-center text-emerald-400 font-bold py-0.5">
                HOT 🔥
              </span>
            )}
          </div>

          {/* Title & Developer */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-1">
              <h3
                onClick={() => onSelectGame(game)}
                className="text-sm sm:text-base font-bold text-white group-hover:text-emerald-400 transition-colors line-clamp-1 cursor-pointer"
                title={game.title}
              >
                {game.title}
              </h3>

              {/* Bookmark Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleBookmark(game.id);
                }}
                className={`p-1.5 rounded-lg border transition ${
                  isBookmarked
                    ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400'
                    : 'border-transparent text-neutral-500 hover:text-neutral-300 hover:bg-neutral-800'
                }`}
                title={isBookmarked ? "Saqlanganlardan o'chirish" : 'Saqlash'}
              >
                <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-emerald-400' : ''}`} />
              </button>
            </div>

            <p className="text-xs text-neutral-400 line-clamp-1 mb-1.5">{game.developer}</p>

            {/* Stats row: Rating, Downloads, Size */}
            <div className="flex items-center gap-2 text-[11px] text-neutral-400">
              <span className="flex items-center gap-0.5 text-amber-400 font-semibold">
                <Star className="w-3 h-3 fill-amber-400" />
                {game.rating}
              </span>
              <span>•</span>
              <span className="font-mono text-neutral-300">{game.downloadsCount}</span>
              <span>•</span>
              <span className="font-mono text-neutral-400">{game.size}</span>
            </div>
          </div>
        </div>

        {/* Working Percentage Badge (HappyMod Signature Feature) */}
        <div className="flex items-center justify-between bg-neutral-950/60 border border-neutral-800/80 rounded-xl px-2.5 py-1.5 mb-3">
          <div className="flex items-center gap-1.5">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold text-emerald-400 font-mono">
              {game.workingPercentage}% Ishlaydi
            </span>
          </div>

          <div className="flex items-center gap-1 text-[10px] text-neutral-400">
            <ShieldCheck className="w-3 h-3 text-emerald-400" />
            <span>Tekshirilgan mod</span>
          </div>
        </div>

        {/* Mod Features Highlights */}
        <div className="space-y-1 mb-3">
          {game.modFeatures.slice(0, 2).map((feat, idx) => (
            <div key={idx} className="flex items-center gap-1.5 text-xs text-neutral-300 line-clamp-1">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className="truncate">{feat}</span>
            </div>
          ))}
          {game.modFeatures.length > 2 && (
            <div
              onClick={() => onSelectGame(game)}
              className="text-[11px] text-emerald-400/90 hover:underline cursor-pointer pt-0.5"
            >
              +{game.modFeatures.length - 2} ta qo'shimcha mod imkoniyatlari...
            </div>
          )}
        </div>
      </div>

      {/* Bottom Section: Platform Badges & Download Actions */}
      <div className="pt-3 border-t border-neutral-800/70">
        <div className="flex items-center justify-between gap-2">
          {/* Platform support badges */}
          <div className="flex items-center gap-1">
            <span
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono bg-neutral-800 text-neutral-300 border border-neutral-700/60"
              title="Android APK mavjud"
            >
              <Smartphone className="w-3 h-3 text-emerald-400" />
              APK
            </span>

            {game.hasPcSupport && (
              <span
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono bg-neutral-800 text-neutral-300 border border-neutral-700/60"
                title="Windows PC versiya mavjud"
              >
                <Monitor className="w-3 h-3 text-blue-400" />
                PC
              </span>
            )}
          </div>

          {/* Download Action Buttons */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => onSelectGame(game)}
              className="px-2.5 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs font-semibold text-neutral-200 transition"
            >
              Ko'rish
            </button>

            <button
              onClick={() => onQuickDownload(game, 'apk')}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold transition shadow-sm shadow-emerald-500/20 active:scale-95"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Yuklash</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
