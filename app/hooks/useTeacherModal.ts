import { create } from 'zustand';

interface TeacherModalState {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useTeacherModal = create<TeacherModalState>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));

export default useTeacherModal;