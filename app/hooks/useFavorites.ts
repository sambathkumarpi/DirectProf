import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import { toast } from 'react-hot-toast';
import { SafeUser } from '../types';
import useLoginModal from './useLoginModal';

interface IUseFavorites {
    coursesId: string;
    currentUser?: SafeUser | null;
}

const useFavorites = ({ coursesId, currentUser }: IUseFavorites) => {
    const router = useRouter();
    const loginModal = useLoginModal();

    const hasFavorited = useMemo(() => {
        const list = currentUser?.favoritesIds || [];

        return list.includes(coursesId);
    }, [coursesId, currentUser]);

    const toggleFavorite = useCallback(async (
        e: React.MouseEvent<HTMLDivElement>
    ) => {
        e.stopPropagation();

        if (!currentUser) {
            return loginModal.onOpen();
        }

        try {
            let request;

            if (hasFavorited) {
                request = () => axios.delete(`/api/favorites/${coursesId}`);
            }
            else{
                request = () => axios.post(`/api/favorites/${coursesId}`);
            }

            await request();
            router.refresh();
            toast.success("Success");
        } catch (error) {
            toast.error('Something went wrong.');
        }
    }, [currentUser, loginModal, hasFavorited, coursesId, router]);
    
    return {
        hasFavorited,
        toggle: toggleFavorite
    }
}

export default useFavorites;