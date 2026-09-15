import React, { useState, useMemo, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { CategoryFilter } from './components/CategoryFilter';
import { GameCard } from './components/GameCard';
import { GameDetailModal } from './components/GameDetailModal';
import { DownloadManagerModal } from './components/DownloadManagerModal';
import { GitHubModal } from './components/GitHubModal';
import { UpdateScannerModal } from './components/UpdateScannerModal';
import { PWAInstallModal } from './components/PWAInstallModal';
import { RequestModModal } from './components/RequestModModal';
import { Footer } from './components/Footer';

import { INITIAL_GAMES } from './data/games';
import { Game, CategoryId, PlatformType, Review, ModRequest } from './types';
import { useDownloadManager } from './hooks/useDownloadManager';
import { usePWAInstall } from './hooks/usePWAInstall';

import {
  Sparkles,
  Flame,
  Gamepad2,
  AlertCircle,
  Download,
  Bookmark,
  CheckCircle2,
  BellRing,
} from 'lucide-react';

const BOOKMARKS_KEY = 'happymod_user_bookmarks';
const VOTES_KEY = 'happymod_user_votes';
const GAMES_STORAGE_KEY = 'happymod_custom_games_state';

export default function App() {
  // Games state (allows user reviews & dynamic updates)
  const [games, setGames] = useState<Game[]>(() => {
    try {
      const saved = localStorage.getItem(GAMES_STORAGE_KEY);
      return saved ? JSON.parse(saved) : INITIAL_GAMES;
    } catch {
      return INITIAL_GAMES;
    }
  });

  // User filters & search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('all');
  const [selectedPlatform, setSelectedPlatform] = useState<PlatformType>('all');
  const [sortBy, setSortBy] = useState<'popular' | 'rating' | 'newest' | 'downloads'>('popular');
  const [filterUpdatedOnly, setFilterUpdatedOnly] = useState(false);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  // Modals state
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [isDownloadsOpen, setIsDownloadsOpen] = useState(false);
  const [isGithubOpen, setIsGithubOpen] = useState(false);
  const [isUpdateScannerOpen, setIsUpdateScannerOpen] = useState(false);
  const [isRequestModOpen, setIsRequestModOpen] = useState(false);
  const [isPWAInstallOpen, setIsPWAInstallOpen] = useState(false);

  // Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Bookmarks state
  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(BOOKMARKS_KEY);
      return saved ? JSON.parse(saved) : ['minecraft-pe', 'gta-san-andreas'];
    } catch {
      return ['minecraft-pe', 'gta-san-andreas'];
    }
  });

  // User votes state (gameId -> 'working' | 'not_working')
  const [userVotes, setUserVotes] = useState<Record<string, 'working' | 'not_working'>>(() => {
    try {
      const saved = localStorage.getItem(VOTES_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Download manager hook
  const {
    tasks,
    activeDownloadCount,
    startDownload,
    pauseDownload,
    resumeDownload,
    cancelDownload,
    clearCompleted,
  } = useDownloadManager();

  // PWA install hook
  const { isInstallable, isInstalled, isIOS, isWindows, isAndroid, install } = usePWAInstall();

  // Save bookmarks
  useEffect(() => {
    try {
      localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks));
    } catch (e) {
      console.error(e);
    }
  }, [bookmarks]);

  // Save votes
  useEffect(() => {
    try {
      localStorage.setItem(VOTES_KEY, JSON.stringify(userVotes));
    } catch (e) {
      console.error(e);
    }
  }, [userVotes]);

  // Save games state
  useEffect(() => {
    try {
      localStorage.setItem(GAMES_STORAGE_KEY, JSON.stringify(games));
    } catch (e) {
      console.error(e);
    }
  }, [games]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // Toggle bookmark
  const handleToggleBookmark = (id: string) => {
    setBookmarks((prev) => {
      const exists = prev.includes(id);
      const updated = exists ? prev.filter((item) => item !== id) : [...prev, id];
      showToast(exists ? "O'yin saqlanganlardan olib tashlandi" : "O'yin saqlanganlarga qo'shildi! ⭐");
      return updated;
    });
  };

  // Community Vote
  const handleVote = (gameId: string, isWorking: boolean) => {
    const voteType = isWorking ? 'working' : 'not_working';
    setUserVotes((prev) => ({ ...prev, [gameId]: voteType }));

    setGames((prev) =>
      prev.map((g) => {
        if (g.id !== gameId) return g;
        const newVotes = g.votesCount + 1;
        const newPercentage = isWorking
          ? Math.min(100, Math.round((g.workingPercentage * g.votesCount + 100) / newVotes))
          : Math.max(70, Math.round((g.workingPercentage * g.votesCount) / newVotes));
        return {
          ...g,
          votesCount: newVotes,
          workingPercentage: newPercentage,
        };
      })
    );

    showToast(isWorking ? "Ovozingiz qabul qilindi: 100% Ishlaydi! 👍" : "Ovozingiz qabul qilindi: Ishlamadi 👎");
  };

  // User Review submission
  const handleAddReview = (gameId: string, reviewData: Omit<Review, 'id' | 'date'>) => {
    const newRev: Review = {
      ...reviewData,
      id: 'rev_' + Date.now(),
      date: 'Hozirgina',
    };

    setGames((prev) =>
      prev.map((g) => (g.id === gameId ? { ...g, reviews: [newRev, ...g.reviews] } : g))
    );

    // Also update selectedGame if modal is open
    if (selectedGame && selectedGame.id === gameId) {
      setSelectedGame((prev) => (prev ? { ...prev, reviews: [newRev, ...prev.reviews] } : null));
    }

    showToast("Sharhingiz muvaffaqiyatli saqlandi! 💬");
  };

  // Download Trigger handler
  const handleDownload = (game: Game, type: 'apk' | 'pc_installer' | 'fast_pwa' = 'apk') => {
    startDownload(game, type);
    showToast(
      type === 'pc_installer'
        ? `"${game.title}" Kompyuter (PC EXE) yuklanmoqda...`
        : `"${game.title}" Android APK yuklanmoqda...`
    );
    setIsDownloadsOpen(true);
  };

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<CategoryId, number> = {
      all: games.length,
      action: 0,
      racing: 0,
      simulation: 0,
      strategy: 0,
      arcade: 0,
      adventure: 0,
      sports: 0,
      rpg: 0,
      puzzle: 0,
      apps: 0,
    };

    games.forEach((g) => {
      if (counts[g.category] !== undefined) {
        counts[g.category]++;
      }
    });

    return counts;
  }, [games]);

  // Filtered & Sorted games
  const filteredGames = useMemo(() => {
    return games
      .filter((game) => {
        // Search
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matchesTitle = game.title.toLowerCase().includes(q);
          const matchesDev = game.developer.toLowerCase().includes(q);
          const matchesCat = game.categoryName.toLowerCase().includes(q);
          const matchesFeatures = game.modFeatures.some((f) => f.toLowerCase().includes(q));
          if (!matchesTitle && !matchesDev && !matchesCat && !matchesFeatures) {
            return false;
          }
        }

        // Category
        if (selectedCategory !== 'all' && game.category !== selectedCategory) {
          return false;
        }

        // Platform
        if (selectedPlatform === 'android' && !game.platforms.includes('android')) {
          return false;
        }
        if (selectedPlatform === 'pc' && !game.hasPcSupport) {
          return false;
        }

        // Filter updated recently
        if (filterUpdatedOnly && !game.isUpdatedRecently) {
          return false;
        }

        // Filter bookmarks only
        if (showFavoritesOnly && !bookmarks.includes(game.id)) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'newest') return b.updatedDate.localeCompare(a.updatedDate);
        if (sortBy === 'downloads') {
          const countA = parseInt(a.downloadsCount.replace(/\D/g, '')) || 0;
          const countB = parseInt(b.downloadsCount.replace(/\D/g, '')) || 0;
          return countB - countA;
        }
        // popular
        return b.workingPercentage * b.votesCount - a.workingPercentage * a.votesCount;
      });
  }, [
    games,
    searchQuery,
    selectedCategory,
    selectedPlatform,
    sortBy,
    filterUpdatedOnly,
    showFavoritesOnly,
    bookmarks,
  ]);

  // Handle new mod request submission
  const handleNewModRequest = (req: Omit<ModRequest, 'id' | 'date' | 'status'>) => {
    showToast(`"${req.gameName}" so'rovi qabul qilindi! Rahmat.`);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col selection:bg-emerald-500 selection:text-black">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 bg-emerald-500 text-black px-4 py-3 rounded-2xl shadow-2xl font-bold text-xs sm:text-sm animate-bounce">
          <CheckCircle2 className="w-5 h-5" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Top Navigation */}
      <Navbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedPlatform={selectedPlatform}
        onPlatformChange={setSelectedPlatform}
        activeDownloadsCount={activeDownloadCount}
        onOpenDownloads={() => setIsDownloadsOpen(true)}
        onOpenGithub={() => setIsGithubOpen(true)}
        onOpenUpdateScanner={() => setIsUpdateScannerOpen(true)}
        onRequestMod={() => setIsRequestModOpen(true)}
        favoritesCount={bookmarks.length}
        showFavoritesOnly={showFavoritesOnly}
        onToggleFavorites={() => setShowFavoritesOnly((prev) => !prev)}
        onOpenPWAInstall={() => setIsPWAInstallOpen(true)}
        isInstallable={isInstallable}
      />

      {/* Hero Banner with Search Highlights (only when not searching or in bookmarks) */}
      {!searchQuery && !showFavoritesOnly && (
        <HeroBanner
          onSearchTag={(tag) => setSearchQuery(tag)}
          onOpenPWAInstall={() => setIsPWAInstallOpen(true)}
          onOpenUpdateScanner={() => setIsUpdateScannerOpen(true)}
        />
      )}

      {/* Category and Filter Bar */}
      <CategoryFilter
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        categoryCounts={categoryCounts}
        sortBy={sortBy}
        onSortChange={setSortBy}
        filterUpdatedOnly={filterUpdatedOnly}
        onToggleUpdatedOnly={() => setFilterUpdatedOnly((prev) => !prev)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-3 sm:px-6 py-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                {showFavoritesOnly ? (
                  <span className="flex items-center gap-2 text-emerald-400">
                    <Bookmark className="w-5 h-5 fill-emerald-400" />
                    Saqlangan O'yinlar ({filteredGames.length})
                  </span>
                ) : searchQuery ? (
                  <span>
                    Qidiruv natijalari: <span className="text-emerald-400">"{searchQuery}"</span>
                  </span>
                ) : selectedCategory !== 'all' ? (
                  <span>
                    Kategoriya: <span className="text-emerald-400">{selectedCategory.toUpperCase()}</span>
                  </span>
                ) : (
                  <span>Eng Sara Mod O'yinlar va Ilovalar</span>
                )}
              </h2>

              <span className="text-xs px-2.5 py-0.5 rounded-full bg-neutral-900 text-neutral-400 border border-neutral-800 font-mono">
                {filteredGames.length} ta mod
              </span>
            </div>

            <p className="text-xs text-neutral-400 mt-1">
              Barcha modlar 100% xavfsiz va to'liq ochilgan imkoniyatlar bilan sinovdan o'tgan
            </p>
          </div>

          {/* Quick reset button if filters active */}
          {(searchQuery || selectedCategory !== 'all' || filterUpdatedOnly || showFavoritesOnly) && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setFilterUpdatedOnly(false);
                setShowFavoritesOnly(false);
              }}
              className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold transition"
            >
              Filtrlarni bekor qilish
            </button>
          )}
        </div>

        {/* Games Grid */}
        {filteredGames.length === 0 ? (
          <div className="bg-neutral-900/60 border border-neutral-800 rounded-3xl p-12 text-center space-y-4 max-w-lg mx-auto my-8">
            <AlertCircle className="w-12 h-12 text-neutral-500 mx-auto" />
            <div>
              <h3 className="text-base font-bold text-white mb-1">
                Hech qanday o'yin yoki ilova topilmadi
              </h3>
              <p className="text-xs text-neutral-400">
                Qidiruv so'zini o'zgartirib ko'ring yoki yangi mod so'rovini yuboring.
              </p>
            </div>
            <button
              onClick={() => setIsRequestModOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold transition shadow"
            >
              <Sparkles className="w-4 h-4" />
              <span>Yangi Mod So'rash</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredGames.map((game) => (
              <GameCard
                key={game.id}
                game={game}
                isBookmarked={bookmarks.includes(game.id)}
                onToggleBookmark={handleToggleBookmark}
                onSelectGame={(g) => setSelectedGame(g)}
                onQuickDownload={(g, type) => handleDownload(g, type)}
              />
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer
        onOpenGithub={() => setIsGithubOpen(true)}
        onOpenPWAInstall={() => setIsPWAInstallOpen(true)}
        onRequestMod={() => setIsRequestModOpen(true)}
        onOpenUpdateScanner={() => setIsUpdateScannerOpen(true)}
      />

      {/* MODAL 1: Game Detail Modal */}
      {selectedGame && (
        <GameDetailModal
          game={selectedGame}
          onClose={() => setSelectedGame(null)}
          onDownload={(game, type) => handleDownload(game, type)}
          isBookmarked={bookmarks.includes(selectedGame.id)}
          onToggleBookmark={handleToggleBookmark}
          onVote={handleVote}
          userVote={userVotes[selectedGame.id]}
          onAddReview={handleAddReview}
        />
      )}

      {/* MODAL 2: Download Manager Modal */}
      {isDownloadsOpen && (
        <DownloadManagerModal
          tasks={tasks}
          onClose={() => setIsDownloadsOpen(false)}
          onPause={pauseDownload}
          onResume={resumeDownload}
          onCancel={cancelDownload}
          onClearCompleted={clearCompleted}
        />
      )}

      {/* MODAL 3: GitHub Export & Instructions Modal */}
      {isGithubOpen && <GitHubModal onClose={() => setIsGithubOpen(false)} />}

      {/* MODAL 4: Update Scanner Modal */}
      {isUpdateScannerOpen && (
        <UpdateScannerModal
          games={games}
          onClose={() => setIsUpdateScannerOpen(false)}
          onUpdateGame={(game) => handleDownload(game, 'apk')}
        />
      )}

      {/* MODAL 5: PWA Install Modal */}
      {isPWAInstallOpen && (
        <PWAInstallModal
          onClose={() => setIsPWAInstallOpen(false)}
          onInstall={install}
          isInstallable={isInstallable}
          isIOS={isIOS}
          isAndroid={isAndroid}
          isWindows={isWindows}
          isInstalled={isInstalled}
        />
      )}

      {/* MODAL 6: Request New Mod Modal */}
      {isRequestModOpen && (
        <RequestModModal
          onClose={() => setIsRequestModOpen(false)}
          onSubmitRequest={handleNewModRequest}
        />
      )}
    </div>
  );
}
