import React from 'react';
import {
  Gamepad2,
  Car,
  Flame,
  Wrench,
  Trophy,
  Compass,
  Cpu,
  Shield,
  Clock,
  Sparkles,
  SlidersHorizontal,
} from 'lucide-react';
import { CategoryId } from '../types';

interface CategoryFilterProps {
  selectedCategory: CategoryId;
  onSelectCategory: (cat: CategoryId) => void;
  categoryCounts: Record<CategoryId, number>;
  sortBy: 'popular' | 'rating' | 'newest' | 'downloads';
  onSortChange: (sort: 'popular' | 'rating' | 'newest' | 'downloads') => void;
  filterUpdatedOnly: boolean;
  onToggleUpdatedOnly: () => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onSelectCategory,
  categoryCounts,
  sortBy,
  onSortChange,
  filterUpdatedOnly,
  onToggleUpdatedOnly,
}) => {
  const categories: { id: CategoryId; label: string; icon: React.ReactNode }[] = [
    { id: 'all', label: 'Barchasi', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'action', label: 'Action & Jangari', icon: <Flame className="w-4 h-4 text-orange-400" /> },
    { id: 'simulation', label: 'Simulyator', icon: <Gamepad2 className="w-4 h-4 text-emerald-400" /> },
    { id: 'racing', label: 'Poyga (Racing)', icon: <Car className="w-4 h-4 text-blue-400" /> },
    { id: 'arcade', label: 'Arkadalar', icon: <Gamepad2 className="w-4 h-4 text-purple-400" /> },
    { id: 'strategy', label: 'Strategiya', icon: <Shield className="w-4 h-4 text-yellow-400" /> },
    { id: 'adventure', label: 'Sarguzasht', icon: <Compass className="w-4 h-4 text-amber-400" /> },
    { id: 'sports', label: 'Sport', icon: <Trophy className="w-4 h-4 text-emerald-400" /> },
    { id: 'apps', label: 'Ilovalar (Apps)', icon: <Wrench className="w-4 h-4 text-cyan-400" /> },
  ];

  return (
    <div className="border-b border-neutral-800 bg-neutral-950/80 py-4 px-3 sm:px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        {/* Category horizontal scrollable pills */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
          {categories.map((cat) => {
            const count = categoryCounts[cat.id] || 0;
            const isSelected = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition shrink-0 ${
                  isSelected
                    ? 'bg-emerald-500 text-black shadow-md shadow-emerald-500/20'
                    : 'bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white hover:border-neutral-700 hover:bg-neutral-800'
                }`}
              >
                {cat.icon}
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    isSelected ? 'bg-black/20 text-black' : 'bg-neutral-800 text-neutral-400'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Secondary Filters & Sort Dropdown */}
        <div className="flex items-center gap-2.5 w-full md:w-auto justify-between md:justify-end shrink-0">
          {/* Recently updated filter toggle */}
          <button
            onClick={onToggleUpdatedOnly}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition ${
              filterUpdatedOnly
                ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white'
            }`}
          >
            <Clock className="w-3.5 h-3.5 text-emerald-400" />
            <span>Yangi yangilanganlar</span>
          </button>

          {/* Sort Selector */}
          <div className="flex items-center gap-1.5 bg-neutral-900 border border-neutral-800 rounded-lg px-2 py-1 text-xs text-neutral-300">
            <SlidersHorizontal className="w-3.5 h-3.5 text-neutral-400" />
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value as any)}
              className="bg-transparent text-neutral-200 focus:outline-none text-xs cursor-pointer"
            >
              <option value="popular" className="bg-neutral-900 text-white">
                Eng ommabop
              </option>
              <option value="rating" className="bg-neutral-900 text-white">
                Reyting bo'yicha
              </option>
              <option value="newest" className="bg-neutral-900 text-white">
                Eng so'nggi versiyalar
              </option>
              <option value="downloads" className="bg-neutral-900 text-white">
                Eng ko'p yuklangan
              </option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
