import { create } from 'zustand';

interface LogoutModalState {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useLogoutModal = create<LogoutModalState>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));

export default useLogoutModal;