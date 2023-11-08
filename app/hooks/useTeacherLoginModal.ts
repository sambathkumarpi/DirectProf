import { create } from 'zustand';

interface TeacherLoginModalState {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useTeacherLoginModal = create<TeacherLoginModalState>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));

export default useTeacherLoginModal;