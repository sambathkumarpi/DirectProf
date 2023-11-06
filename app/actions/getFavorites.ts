import prisma from "@/app/libs/prismadb";
import getCurrentUser from './getCurrentUser';

export default async function getFavorites(){
    try{
        const currentUser = await getCurrentUser();

        if(!currentUser){
            return [];
        }

        const favorites = await prisma.course.findMany({
            where: {
                id: {
                    in: [...(currentUser.favoritesIds || [])] 
                }
            }
        });

        return favorites;
        
    }catch(error: any){
        throw new Error(error);
    }
}