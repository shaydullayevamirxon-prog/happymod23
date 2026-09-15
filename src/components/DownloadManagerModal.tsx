import React from 'react';
import {
  X,
  Download,
  Pause,
  Play,
  Trash2,
  CheckCircle2,
  AlertCircle,
  FileCode,
  Smartphone,
  Monitor,
  HardDrive,
  ExternalLink,
} from 'lucide-react';
import { DownloadTask } from '../types';

interface DownloadManagerModalProps {
  tasks: DownloadTask[];
  onClose: () => void;
  onPause: (id: string) => void;
  onResume: (id: string) => void;
  onCancel: (id: string) => void;
  onClearCompleted: () => void;
}

export const DownloadManagerModal: React.FC<DownloadManagerModalProps> = ({
  tasks,
  onClose,
  onPause,
  onResume,
  onCancel,
  onClearCompleted,
}) => {
  const activeTasks = tasks.filter((t) => t.status === 'downloading' || t.status === 'paused');
  const completedTasks = tasks.filter((t) => t.status === 'completed');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-neutral-800 flex items-center justify-between bg-neutral-950/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Download className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Yuklamalar Menejeri</h3>
              <p className="text-xs text-neutral-400">
                {activeTasks.length} ta faol yuklama • {completedTasks.length} ta tugatilgan
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {completedTasks.length > 0 && (
              <button
                onClick={onClearCompleted}
                className="text-xs text-neutral-400 hover:text-red-400 px-2 py-1 rounded transition"
              >
                Tugatilganlarni tozalash
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-6">
          {tasks.length === 0 ? (
            <div className="py-12 text-center">
              <HardDrive className="w-12 h-12 text-neutral-600 mx-auto mb-3" />
              <h4 className="text-sm font-semibold text-neutral-300 mb-1">
                Yuklamalar ro'yxati hozircha bo'sh
              </h4>
              <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                Istalgan mod o'yin yoki ilovani tanlab "Yuklash" tugmasini bosing.
              </p>
            </div>
          ) : (
            <>
              {/* Active Downloads Section */}
              {activeTasks.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Yuklanmoqda ({activeTasks.length})
                  </h4>

                  <div className="space-y-3">
                    {activeTasks.map((task) => (
                      <div
                        key={task.id}
                        className="bg-neutral-950 border border-neutral-800/90 rounded-2xl p-3.5 space-y-2.5"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-2.5 min-w-0">
                            <img
                              src={task.icon}
                              alt={task.title}
                              className="w-10 h-10 rounded-xl object-cover border border-neutral-800 shrink-0"
                            />
                            <div className="min-w-0">
                              <h5 className="text-xs sm:text-sm font-bold text-white truncate">
                                {task.title}
                              </h5>
                              <p className="text-[11px] font-mono text-neutral-400 truncate">
                                {task.fileName}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-1 shrink-0">
                            {task.status === 'downloading' ? (
                              <button
                                onClick={() => onPause(task.id)}
                                className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300"
                                title="To'xtatib turish"
                              >
                                <Pause className="w-3.5 h-3.5" />
                              </button>
                            ) : (
                              <button
                                onClick={() => onResume(task.id)}
                                className="p-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black"
                                title="Davom ettirish"
                              >
                                <Play className="w-3.5 h-3.5" />
                              </button>
                            )}

                            <button
                              onClick={() => onCancel(task.id)}
                              className="p-1.5 rounded-lg bg-neutral-800 hover:bg-red-500/20 text-neutral-400 hover:text-red-400"
                              title="Bekor qilish"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="space-y-1">
                          <div className="w-full bg-neutral-800 rounded-full h-2 overflow-hidden">
                            <div
                              className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full transition-all duration-300 rounded-full"
                              style={{ width: `${task.progress}%` }}
                            />
                          </div>

                          <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400">
                            <span className="text-emerald-400 font-bold">{task.progress}%</span>
                            <span>{task.downloadSpeed}</span>
                            <span>{task.totalSize}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Completed Downloads Section */}
              {completedTasks.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    Tugatilgan Fayllar ({completedTasks.length})
                  </h4>

                  <div className="space-y-2.5">
                    {completedTasks.map((task) => (
                      <div
                        key={task.id}
                        className="bg-neutral-950/70 border border-neutral-800/80 rounded-2xl p-3 flex items-center justify-between gap-3"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <img
                            src={task.icon}
                            alt={task.title}
                            className="w-9 h-9 rounded-xl object-cover shrink-0"
                          />
                          <div className="min-w-0">
                            <h5 className="text-xs font-bold text-white truncate">{task.title}</h5>
                            <p className="text-[11px] font-mono text-neutral-400 truncate">
                              {task.fileName} • {task.totalSize}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                            Yuklandi
                          </span>
                          <button
                            onClick={() => onCancel(task.id)}
                            className="p-1.5 text-neutral-500 hover:text-red-400 transition"
                            title="Tarixdan o'chirish"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {/* Quick Help for Phone and PC installation */}
          <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-4 text-xs space-y-2">
            <h5 className="font-bold text-white flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 text-emerald-400" />
              Yuklab olingan faylni qanday ochish mumkin?
            </h5>
            <p className="text-neutral-400 leading-relaxed">
              Brauzeringizning "Yuklamalar" (Downloads) papkasini oching. Android telefonlarda yuklab olingan .apk faylni bosing va "O'rnatish"ni tasdiqlang. Kompyuterda .exe faylni bosing.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
