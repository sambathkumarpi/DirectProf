import prisma from '@/app/libs/prismadb';

interface IParams {
    teacherId?: string;
}

export default async function getTeacherById(
    params: IParams
) {
    try {
        const { teacherId: teacherId } = params;

        const teacher = await prisma.teacher.findUnique({
            where: {
                id: teacherId
            }
        });

        if (!teacher) {
            throw new Error('Course not found');
        }

        return {
            ... teacher,
            createdAt: teacher.createdAt.toISOString(),
        };
    } catch (error) {
        throw error;
    }
}