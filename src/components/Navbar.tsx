import React from 'react';
import {
  Search,
  Download,
  Github,
  RefreshCw,
  Bookmark,
  Smartphone,
  Monitor,
  Sparkles,
  ShieldCheck,
  PlusCircle,
} from 'lucide-react';
import { PlatformType } from '../types';

interface NavbarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedPlatform: PlatformType;
  onPlatformChange: (p: PlatformType) => void;
  activeDownloadsCount: number;
  onOpenDownloads: () => void;
  onOpenGithub: () => void;
  onOpenUpdateScanner: () => void;
  onRequestMod: () => void;
  favoritesCount: number;
  showFavoritesOnly: boolean;
  onToggleFavorites: () => void;
  onOpenPWAInstall: () => void;
  isInstallable: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  searchQuery,
  onSearchChange,
  selectedPlatform,
  onPlatformChange,
  activeDownloadsCount,
  onOpenDownloads,
  onOpenGithub,
  onOpenUpdateScanner,
  onRequestMod,
  favoritesCount,
  showFavoritesOnly,
  onToggleFavorites,
  onOpenPWAInstall,
  isInstallable,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-800/80 bg-neutral-950/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 h-16 flex items-center justify-between gap-3">
        {/* Brand Logo */}
        <div className="flex items-center gap-3 shrink-0 cursor-pointer" onClick={() => onSearchChange('')}>
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-lg shadow-emerald-500/20">
            <img src="/icon.svg" alt="HappyMod Logo" className="w-8 h-8 object-contain" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-black tracking-tight text-white font-mono">
                Happy<span className="text-emerald-400">Mod</span>
              </span>
              <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase tracking-wider">
                100% Mod
              </span>
            </div>
            <p className="text-[11px] text-neutral-400 hidden sm:block">
              Xavfsiz O'yinlar & Ilovalar Do'koni
            </p>
          </div>
        </div>

        {/* Global Search Bar */}
        <div className="flex-1 max-w-md mx-2 relative">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              id="main-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="O'yin, ilova yoki mod qidiring (masalan: GTA, Minecraft, Spotify)..."
              className="w-full bg-neutral-900 border border-neutral-800 rounded-full pl-9 pr-8 py-2 text-xs sm:text-sm text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white text-xs bg-neutral-800 hover:bg-neutral-700 rounded-full w-4 h-4 flex items-center justify-center"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Platform Quick Switch */}
          <div className="hidden lg:flex items-center bg-neutral-900 border border-neutral-800 rounded-lg p-0.5">
            <button
              onClick={() => onPlatformChange('all')}
              className={`px-2.5 py-1 rounded-md text-xs font-medium transition ${
                selectedPlatform === 'all'
                  ? 'bg-emerald-500 text-black font-semibold shadow'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Barchasi
            </button>
            <button
              onClick={() => onPlatformChange('android')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium transition ${
                selectedPlatform === 'android'
                  ? 'bg-emerald-500 text-black font-semibold shadow'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              Android
            </button>
            <button
              onClick={() => onPlatformChange('pc')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium transition ${
                selectedPlatform === 'pc'
                  ? 'bg-emerald-500 text-black font-semibold shadow'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              Kompyuter (PC)
            </button>
          </div>

          {/* Check Updates Scanner */}
          <button
            id="nav-check-updates-btn"
            onClick={onOpenUpdateScanner}
            title="Yangilanishlarni tekshirish"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-neutral-800 bg-neutral-900 text-xs text-neutral-300 hover:text-white hover:border-emerald-500/50 hover:bg-neutral-800 transition"
          >
            <RefreshCw className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden md:inline">Yangilanishlar</span>
          </button>

          {/* GitHub Publish / Repo Modal */}
          <button
            id="nav-github-btn"
            onClick={onOpenGithub}
            title="GitHub Repozitoriyasi va Kod"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-neutral-800 bg-neutral-900 text-xs text-neutral-300 hover:text-white hover:border-neutral-700 hover:bg-neutral-800 transition"
          >
            <Github className="w-3.5 h-3.5 text-white" />
            <span className="hidden sm:inline">GitHub</span>
          </button>

          {/* Request Mod */}
          <button
            id="nav-request-mod-btn"
            onClick={onRequestMod}
            title="Yangi mod yoki o'yin so'rash"
            className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-neutral-800 bg-neutral-900 text-xs text-neutral-300 hover:text-white hover:border-emerald-500/50 transition"
          >
            <PlusCircle className="w-3.5 h-3.5 text-emerald-400" />
            <span>Mod So'rash</span>
          </button>

          {/* Bookmarks Toggle */}
          <button
            id="nav-favorites-btn"
            onClick={onToggleFavorites}
            className={`relative p-2 rounded-lg border transition ${
              showFavoritesOnly
                ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white'
            }`}
            title="Saqlangan o'yinlar"
          >
            <Bookmark className="w-4 h-4" />
            {favoritesCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 text-black font-bold text-[10px] rounded-full flex items-center justify-center">
                {favoritesCount}
              </span>
            )}
          </button>

          {/* Download Manager Drawer Trigger */}
          <button
            id="nav-downloads-btn"
            onClick={onOpenDownloads}
            className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium text-xs transition ${
              activeDownloadsCount > 0
                ? 'bg-emerald-500 text-black animate-pulse shadow-lg shadow-emerald-500/25'
                : 'bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white hover:border-neutral-700'
            }`}
            title="Yuklamalar Menejeri"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Yuklamalar</span>
            {activeDownloadsCount > 0 && (
              <span className="bg-black text-emerald-400 text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                {activeDownloadsCount}
              </span>
            )}
          </button>

          {/* PWA / App Install Button */}
          <button
            id="nav-install-pwa-btn"
            onClick={onOpenPWAInstall}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-black font-semibold text-xs transition shadow-md shadow-emerald-500/20"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">Ilovani O'rnatish</span>
            <span className="xs:hidden">O'rnatish</span>
          </button>
        </div>
      </div>
    </header>
  );
};
