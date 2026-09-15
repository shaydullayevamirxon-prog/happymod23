import React, { useState } from 'react';
import { X, Send, Sparkles, CheckCircle2 } from 'lucide-react';
import { ModRequest } from '../types';

interface RequestModModalProps {
  onClose: () => void;
  onSubmitRequest: (req: Omit<ModRequest, 'id' | 'date' | 'status'>) => void;
}

export const RequestModModal: React.FC<RequestModModalProps> = ({
  onClose,
  onSubmitRequest,
}) => {
  const [gameName, setGameName] = useState('');
  const [features, setFeatures] = useState('');
  const [platform, setPlatform] = useState<'android' | 'pc' | 'both'>('both');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!gameName.trim()) return;

    onSubmitRequest({
      gameName: gameName.trim(),
      requestedFeatures: features.trim(),
      platform,
      userEmail: email.trim(),
    });

    setSubmitted(true);
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col">
        {/* Header */}
        <div className="p-5 border-b border-neutral-800 flex items-center justify-between bg-neutral-950/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Yangi Mod So'rash</h3>
              <p className="text-xs text-neutral-400">Kerakli o'yin yoki ilovani yozing, tez orada qo'shamiz</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        {submitted ? (
          <div className="p-8 text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
            <h4 className="text-base font-bold text-white">So'rovingiz qabul qilindi!</h4>
            <p className="text-xs text-neutral-400">
              HappyMod mutaxassislari modni sinab ko'rib tez orada bazaga kiritadi.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 space-y-4">
            <div>
              <label className="text-xs font-semibold text-neutral-300 block mb-1">
                O'yin yoki Ilova Nomi *
              </label>
              <input
                type="text"
                required
                value={gameName}
                onChange={(e) => setGameName(e.target.value)}
                placeholder="Masalan: Call of Duty Mobile, Clash Royale..."
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-neutral-300 block mb-1">
                Qaysi mod imkoniyatlari kerak?
              </label>
              <textarea
                rows={2}
                value={features}
                onChange={(e) => setFeatures(e.target.value)}
                placeholder="Masalan: Cheksiz pul, barcha skinlar, no ads..."
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-neutral-300 block mb-1">
                Qurilma turi
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['android', 'pc', 'both'] as const).map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPlatform(p)}
                    className={`py-1.5 text-xs rounded-xl border transition ${
                      platform === p
                        ? 'bg-emerald-500 text-black font-bold border-emerald-500'
                        : 'bg-neutral-950 text-neutral-400 border-neutral-800 hover:text-white'
                    }`}
                  >
                    {p === 'android' ? 'Android' : p === 'pc' ? 'Kompyuter' : 'Ikkalasi ham'}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-neutral-300 block mb-1">
                Elektron pochta (ixtiyoriy)
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="mod_tayyor@gmail.com"
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold transition shadow"
            >
              <Send className="w-3.5 h-3.5" />
              <span>So'rovni Yuborish</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
