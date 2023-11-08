import { create } from 'zustand';

interface TeacherRegisterModalState {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useTeacherRegisterModal = create<TeacherRegisterModalState>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));

export default useTeacherRegisterModal;