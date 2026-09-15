import React, { useState } from 'react';
import {
  X,
  Github,
  Copy,
  Check,
  ExternalLink,
  Code2,
  Terminal,
  Globe,
  DownloadCloud,
  CheckCircle2,
} from 'lucide-react';

interface GitHubModalProps {
  onClose: () => void;
}

export const GitHubModal: React.FC<GitHubModalProps> = ({ onClose }) => {
  const [copied, setCopied] = useState(false);
  const [repoName, setRepoName] = useState('happymod-uz-app');

  const gitCommands = `# 1. Loyihangiz papkasida terminalni oching va Git-ni ishga tushiring:
git init

# 2. Barcha fayllarni kommitga tayyorlang:
git add .

# 3. Ilk kommitni yarating:
git commit -m "feat: HappyMod 100% Mod O'yinlar va Ilovalar Do'koni (PWA, Android & PC)"

# 4. Asosiy tarmoqni main deb nomlang:
git branch -M main

# 5. O'zingizning GitHub repozitoriyangizni ulang:
git remote add origin https://github.com/SIZNING_GITHUB_USERNAME/${repoName}.git

# 6. Kodni GitHub-ga yuklang:
git push -u origin main`;

  const handleCopyCommands = () => {
    navigator.clipboard.writeText(gitCommands);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-neutral-800 flex items-center justify-between bg-neutral-950/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-neutral-800 border border-neutral-700 text-white flex items-center justify-center">
              <Github className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">GitHub Repozitoriyasiga Joylash</h3>
              <p className="text-xs text-neutral-400">
                HappyMod loyihasini GitHub-ga saqlash va onlayn serverga joylash qo'llanmasi
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

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* Quick Info Box */}
          <div className="bg-gradient-to-r from-emerald-950/40 via-neutral-950 to-neutral-950 border border-emerald-500/30 rounded-2xl p-4 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div className="text-xs text-neutral-300 space-y-1">
              <span className="font-bold text-white block text-sm">
                Loyiha GitHub uchun to'liq tayyorlangan:
              </span>
              <p>
                • Barcha komponentlar, PWA manifest, service worker va turlar to'liq sozlangan.<br />
                • Vercel, Netlify yoki GitHub Pages orqali bir necha soniyada bepul onlayn domen ochishingiz mumkin.
              </p>
            </div>
          </div>

          {/* Step 1: Create Repo on GitHub */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-emerald-500 text-black font-mono font-bold flex items-center justify-center text-xs">
                  1
                </span>
                GitHub-da Yangi Repozitoriya Ochish
              </span>

              <a
                href="https://github.com/new"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 text-xs text-emerald-400 hover:text-emerald-300 font-semibold transition"
              >
                <span>github.com/new ga o'tish</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-xs text-neutral-400">
              GitHub-da yangi repozitoriya yarating (masalan:{' '}
              <code className="text-emerald-400 font-mono font-bold">{repoName}</code>) va "Public" qilib belgilang.
            </div>
          </div>

          {/* Step 2: Terminal Commands */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-emerald-500 text-black font-mono font-bold flex items-center justify-center text-xs">
                  2
                </span>
                Terminal (Git Bash) Buyruqlari
              </span>

              <button
                onClick={handleCopyCommands}
                className="flex items-center gap-1.5 text-xs text-neutral-200 bg-neutral-800 hover:bg-neutral-700 px-3 py-1.5 rounded-lg border border-neutral-700 font-medium transition"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Nusxalandi!' : 'Buyruqlarni nusxalash'}</span>
              </button>
            </div>

            <div className="relative bg-black/90 border border-neutral-800 rounded-2xl p-4 font-mono text-xs text-neutral-300 overflow-x-auto leading-relaxed">
              <pre>{gitCommands}</pre>
            </div>
          </div>

          {/* Step 3: AI Studio Direct Export */}
          <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-4 text-xs space-y-2">
            <h5 className="font-bold text-white flex items-center gap-2">
              <DownloadCloud className="w-4 h-4 text-emerald-400" />
              AI Studio orqali to'g'ridan-to'g'ri GitHub yoki ZIP eksport
            </h5>
            <p className="text-neutral-400 leading-relaxed">
              Shuningdek, yuqoridagi menyu orqali <strong className="text-neutral-200">"Settings" &gt; "Export to GitHub"</strong> yoki <strong className="text-neutral-200">"Export to ZIP"</strong> tugmasini bosish orqali loyiha arxivini bir zumda kompyuteringizga yuklab olishingiz mumkin.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
