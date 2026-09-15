import React, { useState } from 'react';
import {
  X,
  Star,
  Download,
  ShieldCheck,
  CheckCircle2,
  Smartphone,
  Monitor,
  ThumbsUp,
  ThumbsDown,
  Clock,
  Copy,
  Check,
  Share2,
  AlertCircle,
  MessageSquare,
  Send,
  Zap,
} from 'lucide-react';
import { Game, Review } from '../types';

interface GameDetailModalProps {
  game: Game;
  onClose: () => void;
  onDownload: (game: Game, type: 'apk' | 'pc_installer' | 'fast_pwa') => void;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
  onVote: (gameId: string, isWorking: boolean) => void;
  userVote?: 'working' | 'not_working' | null;
  onAddReview: (gameId: string, review: Omit<Review, 'id' | 'date'>) => void;
}

export const GameDetailModal: React.FC<GameDetailModalProps> = ({
  game,
  onClose,
  onDownload,
  isBookmarked,
  onToggleBookmark,
  onVote,
  userVote,
  onAddReview,
}) => {
  const [activeTab, setActiveTab] = useState<'details' | 'security' | 'versions' | 'reviews'>('details');
  const [copiedHash, setCopiedHash] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Review Form State
  const [authorName, setAuthorName] = useState('');
  const [commentText, setCommentText] = useState('');
  const [ratingVal, setRatingVal] = useState(5);
  const [testedWorking, setTestedWorking] = useState(true);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const handleCopyHash = () => {
    navigator.clipboard.writeText(game.security.sha256);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${game.title} HappyMod`,
        text: `HappyMod orqali ${game.title} modini bepul yuklab oling!`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !commentText.trim()) return;

    onAddReview(game.id, {
      author: authorName.trim(),
      rating: ratingVal,
      comment: commentText.trim(),
      isWorking: testedWorking,
      device: 'Android / PC Qurilma',
    });

    setAuthorName('');
    setCommentText('');
    setReviewSubmitted(true);
    setTimeout(() => setReviewSubmitted(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl my-6 flex flex-col max-h-[90vh]">
        {/* Banner Header Image with overlay */}
        <div className="relative h-44 sm:h-56 w-full bg-neutral-800 overflow-hidden shrink-0">
          <img
            src={game.bannerImage}
            alt={game.title}
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/60 to-transparent" />

          {/* Close & Share buttons */}
          <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
            <button
              onClick={handleShare}
              className="p-2 rounded-full bg-black/60 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-700/50 backdrop-blur transition"
              title="Ulashish"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
            </button>
            <button
              id="detail-modal-close-btn"
              onClick={onClose}
              className="p-2 rounded-full bg-black/60 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-700/50 backdrop-blur transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Main Title, Icon and working percentage inside banner */}
          <div className="absolute bottom-4 left-4 sm:left-6 right-4 flex items-end gap-3 sm:gap-4">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-emerald-500/50 shadow-2xl bg-neutral-800 shrink-0">
              <img src={game.icon} alt={game.title} className="w-full h-full object-cover" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="px-2 py-0.5 rounded bg-emerald-500 text-black text-[11px] font-black uppercase tracking-wider font-mono">
                  {game.workingPercentage}% ISHLAYDI
                </span>
                <span className="px-2 py-0.5 rounded bg-neutral-800 text-neutral-300 text-[11px] border border-neutral-700 font-mono">
                  v{game.version}
                </span>
              </div>
              <h2 className="text-lg sm:text-2xl font-black text-white truncate drop-shadow">
                {game.title}
              </h2>
              <p className="text-xs text-neutral-300 truncate">{game.developer} • {game.categoryName}</p>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-neutral-800 px-4 sm:px-6 bg-neutral-950/60 overflow-x-auto scrollbar-none shrink-0">
          <button
            onClick={() => setActiveTab('details')}
            className={`py-3 px-3 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition ${
              activeTab === 'details'
                ? 'border-emerald-500 text-emerald-400'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            Mod Haqida
          </button>
          <button
            onClick={() => setActiveTab('security')}
            className={`py-3 px-3 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition flex items-center gap-1.5 ${
              activeTab === 'security'
                ? 'border-emerald-500 text-emerald-400'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            Xavfsizlik Tekshiruvi
          </button>
          <button
            onClick={() => setActiveTab('versions')}
            className={`py-3 px-3 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition flex items-center gap-1.5 ${
              activeTab === 'versions'
                ? 'border-emerald-500 text-emerald-400'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Clock className="w-4 h-4" />
            Versiyalar Tarixi ({game.versions.length})
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`py-3 px-3 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition flex items-center gap-1.5 ${
              activeTab === 'reviews'
                ? 'border-emerald-500 text-emerald-400'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            Sharhlar ({game.reviews.length})
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* TAB 1: DETAILS */}
          {activeTab === 'details' && (
            <div className="space-y-6">
              {/* Quick Info Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                <div className="bg-neutral-950/70 border border-neutral-800 rounded-xl p-3 text-center">
                  <span className="text-[11px] text-neutral-400 block mb-1">Reyting</span>
                  <div className="flex items-center justify-center gap-1 text-amber-400 font-bold text-base">
                    <Star className="w-4 h-4 fill-amber-400" />
                    <span>{game.rating}</span>
                  </div>
                </div>

                <div className="bg-neutral-950/70 border border-neutral-800 rounded-xl p-3 text-center">
                  <span className="text-[11px] text-neutral-400 block mb-1">Fayl Hajmi</span>
                  <span className="text-white font-mono font-bold text-base">{game.size}</span>
                </div>

                <div className="bg-neutral-950/70 border border-neutral-800 rounded-xl p-3 text-center">
                  <span className="text-[11px] text-neutral-400 block mb-1">Yuklamalar</span>
                  <span className="text-emerald-400 font-mono font-bold text-base">{game.downloadsCount}</span>
                </div>

                <div className="bg-neutral-950/70 border border-neutral-800 rounded-xl p-3 text-center">
                  <span className="text-[11px] text-neutral-400 block mb-1">Yangilangan</span>
                  <span className="text-neutral-300 font-mono text-xs">{game.updatedDate}</span>
                </div>
              </div>

              {/* Mod Features Checklist (Highlight) */}
              <div className="bg-gradient-to-br from-emerald-950/30 via-neutral-950 to-neutral-950 border border-emerald-500/30 rounded-2xl p-4 sm:p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-emerald-400" />
                    <h4 className="text-sm sm:text-base font-bold text-white">
                      Mod Imkoniyatlari (Mod Features)
                    </h4>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-mono font-bold border border-emerald-500/40">
                    TEST QILINGAN
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {game.modFeatures.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 bg-neutral-900/60 p-2.5 rounded-xl border border-neutral-800/80">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="text-xs text-neutral-200 font-medium leading-relaxed">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Community Working Vote Widget */}
              <div className="bg-neutral-950/80 border border-neutral-800 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <div className="text-sm font-bold text-white mb-0.5">
                    Ushbu mod sizning qurilmangizda ishlayaptimi?
                  </div>
                  <p className="text-xs text-neutral-400">
                    {game.votesCount.toLocaleString()} ta foydalanuvchi ovoz bergan ({game.workingPercentage}% tasdiqlangan)
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onVote(game.id, true)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border transition ${
                      userVote === 'working'
                        ? 'bg-emerald-500 text-black border-emerald-500'
                        : 'bg-neutral-900 border-neutral-700 text-emerald-400 hover:bg-emerald-500/10'
                    }`}
                  >
                    <ThumbsUp className="w-4 h-4" />
                    <span>Ha, 100% Ishlaydi</span>
                  </button>

                  <button
                    onClick={() => onVote(game.id, false)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border transition ${
                      userVote === 'not_working'
                        ? 'bg-red-500 text-white border-red-500'
                        : 'bg-neutral-900 border-neutral-700 text-red-400 hover:bg-red-500/10'
                    }`}
                  >
                    <ThumbsDown className="w-4 h-4" />
                    <span>Ishlamadi</span>
                  </button>
                </div>
              </div>

              {/* Description */}
              <div>
                <h4 className="text-sm font-bold text-white mb-2">O'yin Haqida</h4>
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed bg-neutral-950/50 p-4 rounded-xl border border-neutral-800">
                  {game.description}
                </p>
              </div>

              {/* Installation Guide for Android & PC */}
              <div className="bg-neutral-950/70 border border-neutral-800 rounded-2xl p-4 text-xs space-y-3">
                <h4 className="font-bold text-white flex items-center gap-2 text-sm">
                  <Smartphone className="w-4 h-4 text-emerald-400" />
                  Qurilmaga O'rnatish Qo'llanmasi
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-neutral-300">
                  <div className="bg-neutral-900/60 p-3 rounded-xl border border-neutral-800">
                    <strong className="text-white block mb-1 text-xs">📱 Android (Telefon / Planshet):</strong>
                    1. "Android APK Yuklab Olish" tugmasini bosing.<br />
                    2. Sozlamalarda "Noma'lum manbalardan o'rnatish"ga ruxsat bering.<br />
                    3. Yuklab olingan faylni oching va "O'rnatish"ni tanlang.
                  </div>

                  <div className="bg-neutral-900/60 p-3 rounded-xl border border-neutral-800">
                    <strong className="text-white block mb-1 text-xs">💻 Kompyuter (Windows / Mac):</strong>
                    1. "Kompyuter (PC EXE) Yuklab Olish" tugmasini bosing.<br />
                    2. Faylni ishga tushiring yoki HappyMod Desktop / Emulator orqali bosing.<br />
                    3. Katta ekranda to'liq boshqaruv bilan zavqlaning.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: SECURITY */}
          {activeTab === 'security' && (
            <div className="space-y-4">
              <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-2xl p-4 flex items-center gap-3">
                <ShieldCheck className="w-8 h-8 text-emerald-400 shrink-0" />
                <div>
                  <h4 className="text-sm font-bold text-white">Fayl 100% Xavfsiz va Viruslardan Xoli</h4>
                  <p className="text-xs text-neutral-300">
                    HappyMod laboratoriyasi ushbu mod faylni barcha xalqaro xavfsizlik protokollari bilan skanerdan o'tkazdi.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-3.5">
                  <span className="text-xs text-neutral-400 block mb-1">VirusTotal Natijasi</span>
                  <div className="text-sm font-bold text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>{game.security.virusTotal}</span>
                  </div>
                </div>

                <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-3.5">
                  <span className="text-xs text-neutral-400 block mb-1">Google Play Protect</span>
                  <div className="text-sm font-bold text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>{game.security.playProtect}</span>
                  </div>
                </div>
              </div>

              {/* SHA256 Hash */}
              <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-3.5">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-neutral-400">SHA-256 Hash Nazorati:</span>
                  <button
                    onClick={handleCopyHash}
                    className="flex items-center gap-1 text-[11px] text-emerald-400 hover:text-emerald-300 transition"
                  >
                    {copiedHash ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedHash ? 'Nusxalandi!' : 'Nusxalash'}</span>
                  </button>
                </div>
                <code className="text-[11px] font-mono text-neutral-300 break-all bg-neutral-900 p-2 rounded block">
                  {game.security.sha256}
                </code>
              </div>

              <div className="text-xs text-neutral-400 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-neutral-500" />
                <span>Oxirgi avtomatik xavfsizlik skaneri: {game.security.scanDate}</span>
              </div>
            </div>
          )}

          {/* TAB 3: VERSIONS HISTORY */}
          {activeTab === 'versions' && (
            <div className="space-y-3">
              <p className="text-xs text-neutral-400 mb-2">
                Eski yoki yangi versiyalarni tanlab yuklab olishingiz mumkin:
              </p>

              {game.versions.map((ver, idx) => (
                <div
                  key={idx}
                  className="bg-neutral-950 border border-neutral-800 rounded-xl p-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono font-bold text-sm text-white">v{ver.version}</span>
                      {ver.isLatest && (
                        <span className="text-[10px] px-2 py-0.5 bg-emerald-500/20 text-emerald-400 rounded-full font-bold border border-emerald-500/30">
                          Oxirgi versiya
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-neutral-300 mb-1">{ver.changelog}</p>
                    <span className="text-[11px] text-neutral-500 font-mono">
                      {ver.releaseDate} • {ver.size}
                    </span>
                  </div>

                  <button
                    onClick={() => onDownload(game, 'apk')}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold shrink-0 transition"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Yuklash ({ver.size})</span>
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* TAB 4: REVIEWS */}
          {activeTab === 'reviews' && (
            <div className="space-y-6">
              {/* Existing Reviews List */}
              <div className="space-y-3">
                {game.reviews.map((rev) => (
                  <div key={rev.id} className="bg-neutral-950 border border-neutral-800 rounded-xl p-3.5">
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-xs flex items-center justify-center">
                          {rev.author.charAt(0)}
                        </div>
                        <div>
                          <span className="text-xs font-bold text-white block">{rev.author}</span>
                          <span className="text-[10px] text-neutral-400 font-mono">{rev.device} • {rev.date}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${
                              i < rev.rating ? 'fill-amber-400 text-amber-400' : 'text-neutral-700'
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    <p className="text-xs text-neutral-300 leading-relaxed">{rev.comment}</p>

                    {rev.isWorking && (
                      <div className="mt-2 inline-flex items-center gap-1 text-[10px] text-emerald-400 font-medium">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Qurilmada to'liq ishlashi tasdiqlangan</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Add Review Form */}
              <form onSubmit={handleSubmitReview} className="bg-neutral-950 border border-neutral-800 rounded-2xl p-4 space-y-3">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                  Fikringizni qoldiring
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="Ismingiz yoki taxallusingiz"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    className="bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500"
                  />

                  <div className="flex items-center justify-between bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2">
                    <span className="text-xs text-neutral-400">Baholash:</span>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRatingVal(star)}
                          className="text-amber-400 hover:scale-110 transition"
                        >
                          <Star className={`w-4 h-4 ${star <= ratingVal ? 'fill-amber-400' : 'text-neutral-600'}`} />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <textarea
                  required
                  rows={3}
                  placeholder="Mod qanday ishladi? O'yin haqidagi fikringizni yozing..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-xl p-3 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500"
                />

                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer text-xs text-neutral-300">
                    <input
                      type="checkbox"
                      checked={testedWorking}
                      onChange={(e) => setTestedWorking(e.target.checked)}
                      className="rounded accent-emerald-500"
                    />
                    <span>Mod meni qurilmamda ishladi</span>
                  </label>

                  <button
                    type="submit"
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold transition shadow"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Yuborish</span>
                  </button>
                </div>

                {reviewSubmitted && (
                  <div className="text-xs text-emerald-400 bg-emerald-500/10 p-2 rounded-lg border border-emerald-500/20 text-center">
                    Rahmat! Sizning sharhingiz muvaffaqiyatli saqlandi.
                  </div>
                )}
              </form>
            </div>
          )}
        </div>

        {/* Modal Sticky Footer with Download Choices */}
        <div className="border-t border-neutral-800 bg-neutral-950 p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-neutral-400 hidden sm:block">
            <span className="font-mono text-emerald-400 font-semibold">{game.title}</span> uchun yuklab olish varianti:
          </div>

          <div className="flex flex-wrap items-center justify-end gap-2.5 w-full sm:w-auto">
            {/* Download for Android APK */}
            <button
              id="modal-download-apk-btn"
              onClick={() => onDownload(game, 'apk')}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs sm:text-sm transition shadow-lg shadow-emerald-500/20 active:scale-95"
            >
              <Smartphone className="w-4 h-4" />
              <span>Android APK ({game.size})</span>
            </button>

            {/* Download for PC Windows */}
            {game.hasPcSupport && (
              <button
                id="modal-download-pc-btn"
                onClick={() => onDownload(game, 'pc_installer')}
                className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-white font-bold text-xs sm:text-sm transition active:scale-95"
              >
                <Monitor className="w-4 h-4 text-blue-400" />
                <span>PC (Windows EXE)</span>
              </button>
            )}

            {/* Fast PWA download option */}
            <button
              id="modal-download-fast-btn"
              onClick={() => onDownload(game, 'fast_pwa')}
              className="px-3 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 hover:text-white text-xs font-semibold transition"
              title="HappyMod tezlatgich orqali yuklash"
            >
              <Zap className="w-4 h-4 text-amber-400" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
