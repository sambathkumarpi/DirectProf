import prisma from '@/app/libs/prismadb';

interface IParams {
    subjectName?: string;
}

export default async function getSubjectIdByName(
    params: IParams
) {
    try {
        let { subjectName } = params;
        if (!subjectName) {
            throw new Error('Subject name is required');
        }
        subjectName=subjectName.replace(/_/g, " ");
        console.log('subjectName', subjectName);
        const subject = await prisma.subject.findUnique({
            where: {
                name: subjectName
            }
        });

        if (!subject) {
            throw new Error('Subject not found');
        }

        return subject.id;
    } catch (error) {
        throw error;
    }
}