import { create } from 'zustand';
import { Pillar, Initiative, FilterOptions } from '../types';
import { initiativesData } from '../data/initiatives';

interface InitiativesStore {
  pillars: Pillar[];
  filteredPillars: Pillar[];
  filters: FilterOptions;
  
  setPillars: (pillars: Pillar[]) => void;
  updateInitiative: (initiativeId: string, updates: Partial<Initiative>) => void;
  setFilters: (filters: FilterOptions) => void;
  applyFilters: () => void;
  getPillarById: (id: string) => Pillar | undefined;
  getInitiativeById: (id: string) => Initiative | undefined;
  resetFilters: () => void;
}

const defaultFilters: FilterOptions = {
  searchQuery: '',
  status: [],
  priority: [],
  pillarId: [],
};

export const useInitiativesStore = create<InitiativesStore>((set, get) => ({
  pillars: initiativesData,
  filteredPillars: initiativesData,
  filters: defaultFilters,

  setPillars: (pillars) => set({ pillars }),

  updateInitiative: (initiativeId, updates) => {
    set((state) => ({
      pillars: state.pillars.map((pillar) => ({
        ...pillar,
        initiatives: pillar.initiatives.map((init) =>
          init.id === initiativeId ? { ...init, ...updates } : init
        ),
      })),
    }));
  },

  setFilters: (filters) => set({ filters }),

  applyFilters: () => {
    const { pillars, filters } = get();
    
    let filtered = pillars.map((pillar) => ({
      ...pillar,
      initiatives: pillar.initiatives.filter((init) => {
        const matchesSearch = 
          !filters.searchQuery ||
          init.title.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
          init.description.toLowerCase().includes(filters.searchQuery.toLowerCase());
        
        const matchesStatus = 
          filters.status.length === 0 || filters.status.includes(init.status);
        
        const matchesPriority = 
          filters.priority.length === 0 || filters.priority.includes(init.priority);
        
        const matchesPillar = 
          filters.pillarId.length === 0 || filters.pillarId.includes(init.pillarId);
        
        return matchesSearch && matchesStatus && matchesPriority && matchesPillar;
      }),
    }));

    set({ filteredPillars: filtered });
  },

  getPillarById: (id) => {
    const { pillars } = get();
    return pillars.find((p) => p.id === id);
  },

  getInitiativeById: (id) => {
    const { pillars } = get();
    for (const pillar of pillars) {
      const initiative = pillar.initiatives.find((i) => i.id === id);
      if (initiative) return initiative;
    }
    return undefined;
  },

  resetFilters: () => {
    set({ filters: defaultFilters });
    set({ filteredPillars: get().pillars });
  },
}));
