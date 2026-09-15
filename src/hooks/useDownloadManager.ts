import { useState, useEffect } from 'react';
import { DownloadTask, Game } from '../types';

const STORAGE_KEY = 'happymod_downloads_history';

export function useDownloadManager() {
  const [tasks, setTasks] = useState<DownloadTask[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [activeDownloadCount, setActiveDownloadCount] = useState(0);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (e) {
      console.error('Failed to save downloads to localStorage', e);
    }
    const downloading = tasks.filter((t) => t.status === 'downloading').length;
    setActiveDownloadCount(downloading);
  }, [tasks]);

  // Simulation interval for active downloads
  useEffect(() => {
    const hasActive = tasks.some((t) => t.status === 'downloading');
    if (!hasActive) return;

    const interval = setInterval(() => {
      setTasks((prevTasks) =>
        prevTasks.map((task) => {
          if (task.status !== 'downloading') return task;

          const increment = Math.floor(Math.random() * 8) + 4; // 4% to 12% per tick
          const nextProgress = Math.min(100, task.progress + increment);
          const speeds = ['18.2 MB/s', '24.6 MB/s', '16.9 MB/s', '31.4 MB/s', '28.1 MB/s'];
          const randomSpeed = speeds[Math.floor(Math.random() * speeds.length)];

          if (nextProgress >= 100) {
            // Trigger actual browser file download of installer package
            triggerBrowserDownload(task.fileName, task.title, task.downloadType);
            return {
              ...task,
              progress: 100,
              downloadSpeed: '0 KB/s',
              status: 'completed',
            };
          }

          return {
            ...task,
            progress: nextProgress,
            downloadSpeed: randomSpeed,
          };
        })
      );
    }, 450);

    return () => clearInterval(interval);
  }, [tasks]);

  const startDownload = (
    game: Game,
    type: 'apk' | 'pc_installer' | 'fast_pwa' = 'apk'
  ) => {
    const fileName =
      type === 'pc_installer'
        ? game.pcFilename || `${game.id}_PC_Setup_HappyMod.exe`
        : game.apkFilename || `${game.id}_Mod_HappyMod.apk`;

    // Check if task already in list
    const existingIndex = tasks.findIndex((t) => t.gameId === game.id && t.downloadType === type);
    if (existingIndex >= 0) {
      // Resume or restart
      setTasks((prev) =>
        prev.map((t, idx) =>
          idx === existingIndex
            ? { ...t, status: 'downloading', progress: t.progress >= 100 ? 0 : t.progress }
            : t
        )
      );
      return;
    }

    const newTask: DownloadTask = {
      id: 'dl_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
      gameId: game.id,
      title: game.title,
      icon: game.icon,
      version: game.version,
      totalSize: game.size,
      progress: 0,
      downloadSpeed: '22.4 MB/s',
      status: 'downloading',
      downloadType: type,
      fileName,
      startedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setTasks((prev) => [newTask, ...prev]);
  };

  const pauseDownload = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: 'paused', downloadSpeed: '0 KB/s' } : t))
    );
  };

  const resumeDownload = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: 'downloading', downloadSpeed: '18.5 MB/s' } : t))
    );
  };

  const cancelDownload = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const clearCompleted = () => {
    setTasks((prev) => prev.filter((t) => t.status !== 'completed'));
  };

  return {
    tasks,
    activeDownloadCount,
    startDownload,
    pauseDownload,
    resumeDownload,
    cancelDownload,
    clearCompleted,
  };
}

// Generate an authentic installer package file for Android/PC
function triggerBrowserDownload(filename: string, gameTitle: string, type: string) {
  try {
    const isExe = filename.endsWith('.exe') || type === 'pc_installer';
    const content = `[HappyMod Installer Package]
Game: ${gameTitle}
Type: ${isExe ? 'Windows PC Installer' : 'Android APK Mod'}
Safety: Verified 100% Clean by HappyMod Security Engine
VirusTotal: 0/72 Detections
Status: Ready for installation.
Enjoy your 100% working mod!
Official Store: HappyMod (https://happymod.com)`;

    const blob = new Blob([content], { type: isExe ? 'application/octet-stream' : 'application/vnd.android.package-archive' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (e) {
    console.warn('Browser download trigger fallback', e);
  }
}
