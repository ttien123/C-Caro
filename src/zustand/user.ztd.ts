import { create } from 'zustand';

interface selectUserInterface {
    selectUser: boolean;
    isReset: boolean;
    setSelectUser: (body: boolean) => void;
    setIsReset: (body: boolean) => void;
}

const useSelectUser = create<selectUserInterface>()((set) => ({
    selectUser: true,
    isReset: false,
    setSelectUser: (body) => set((state) => ({ selectUser: (state.selectUser = body) })),
    setIsReset: (body) => set((state) => ({ selectUser: (state.isReset = body) })),
}));

export default useSelectUser;
