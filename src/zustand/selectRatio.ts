import { create } from 'zustand';

interface selectUserInterface {
    selectRatio: number;
    grid: string[][];
    listWin: string[];
    setListWin: (body: string[]) => void;
    setSelectRatio: (body: number) => void;
    setGrid: (body: string[][]) => void;
}

const useSelectRatio = create<selectUserInterface>()((set) => ({
    selectRatio: 10,
    grid: [],
    listWin: [],
    setSelectRatio: (body) => set((state) => ({ selectRatio: (state.selectRatio = body) })),
    setGrid: (body) => set((state) => ({ grid: (state.grid = body) })),
    setListWin: (body) => set((state) => ({ listWin: (state.listWin = body) })),
}));

export default useSelectRatio;
