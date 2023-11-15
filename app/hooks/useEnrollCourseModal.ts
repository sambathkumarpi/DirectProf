import { create } from 'zustand';

interface EnrollCourseModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useEnrollCourseModal = create<EnrollCourseModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}));


export default useEnrollCourseModal;