import { create } from 'zustand';

interface State {
  year: number;
  showMethaneColumn: boolean;
  showOilCo2Column: boolean;
  showTemperatureChangeFromCo2Column: boolean;
  setYear: (newYear: number) => void;
  setShowMethaneColumn: () => void;
  setShowOilCo2Column: () => void;
  setShowTemperatureChangeFromCo2Column: () => void;
}

export const useStore = create<State>()((set) => ({
  year: 2023,
  showMethaneColumn: false,
  showOilCo2Column: false,
  showTemperatureChangeFromCo2Column: false,
  setYear: (newYear) => set({ year: newYear }),
  setShowMethaneColumn: () =>
    set((state) => ({
      showMethaneColumn: state.showMethaneColumn ? false : true,
    })),
  setShowOilCo2Column: () =>
    set((state) => ({
      showOilCo2Column: state.showOilCo2Column ? false : true,
    })),
  setShowTemperatureChangeFromCo2Column: () =>
    set((state) => ({
      showTemperatureChangeFromCo2Column:
        state.showTemperatureChangeFromCo2Column ? false : true,
    })),
}));
