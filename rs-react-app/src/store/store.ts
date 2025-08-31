import { create } from 'zustand';

interface State {
  countryToSearch: string;
  newYear: number;
  showMethaneColumn: boolean;
  showOilCo2Column: boolean;
  showTemperatureChangeFromCo2Column: boolean;
  setNewYear: (newYear: number) => void;
  setCountryToSearch: (country: string) => void;
  setShowMethaneColumn: () => void;
  setShowOilCo2Column: () => void;
  setShowTemperatureChangeFromCo2Column: () => void;
}

export const useStore = create<State>()((set) => ({
  countryToSearch: '',
  newYear: 2023,
  showMethaneColumn: false,
  showOilCo2Column: false,
  showTemperatureChangeFromCo2Column: false,
  setCountryToSearch: (country) =>
    set(() => ({
      countryToSearch: country,
    })),
  setNewYear: (newYear) => set({ newYear: newYear }),
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
