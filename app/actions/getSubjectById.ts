import prisma from '@/app/libs/prismadb';

interface IParams {
    subjectId?: string;
}

export default async function getSubjectById(
    params: IParams
) {
    try {
        const { subjectId: subjectId } = params;

        const subject = await prisma.subject.findUnique({
            where: {
                id: subjectId
            }
        });

        if (!subject) {
            throw new Error('Course not found');
        }

        return {
            ... subject,
            createdAt: subject.createdAt.toISOString(),
        };
    } catch (error) {
        throw error;
    }
}