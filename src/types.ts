export type CategoryId =
  | 'all'
  | 'action'
  | 'racing'
  | 'simulation'
  | 'strategy'
  | 'arcade'
  | 'adventure'
  | 'sports'
  | 'rpg'
  | 'puzzle'
  | 'apps';

export type PlatformType = 'android' | 'pc' | 'ios' | 'all';

export interface VersionInfo {
  version: string;
  releaseDate: string;
  changelog: string;
  size: string;
  isLatest?: boolean;
}

export interface SecurityReport {
  virusTotal: string;
  playProtect: 'Xavfsiz' | 'Tasdiqlangan';
  malwareDetected: boolean;
  sha256: string;
  scanDate: string;
}

export interface Review {
  id: string;
  author: string;
  avatar?: string;
  rating: number;
  date: string;
  comment: string;
  isWorking: boolean;
  device: string;
}

export interface Game {
  id: string;
  title: string;
  developer: string;
  category: CategoryId;
  categoryName: string;
  icon: string;
  bannerImage: string;
  rating: number;
  downloadsCount: string;
  size: string;
  version: string;
  updatedDate: string;
  workingPercentage: number;
  votesCount: number;
  platforms: ('android' | 'pc' | 'ios')[];
  modFeatures: string[];
  description: string;
  security: SecurityReport;
  versions: VersionInfo[];
  reviews: Review[];
  apkFilename: string;
  pcFilename?: string;
  hasPcSupport: boolean;
  isFeatured?: boolean;
  isTrending?: boolean;
  isUpdatedRecently?: boolean;
}

export interface DownloadTask {
  id: string;
  gameId: string;
  title: string;
  icon: string;
  version: string;
  totalSize: string;
  progress: number; // 0 to 100
  downloadSpeed: string; // e.g. "12.4 MB/s"
  status: 'downloading' | 'paused' | 'completed' | 'failed';
  downloadType: 'apk' | 'pc_installer' | 'fast_pwa';
  fileName: string;
  startedAt: string;
}

export interface ModRequest {
  id: string;
  gameName: string;
  requestedFeatures: string;
  platform: 'android' | 'pc' | 'both';
  userEmail: string;
  status: 'pending' | 'reviewed' | 'adding_soon';
  date: string;
}
