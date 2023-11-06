import prisma from "@/app/libs/prismadb";
import getSubjectIdByName from "./getSubjectIdByName";
import { createFictionalHistoryCourse } from "@/subjects init/test";

interface IParams {
    subjectName?: string;
}

export default async function getCoursesBySubject(
    params: IParams
) {
    try {
        const subjectId = await getSubjectIdByName(params);
        const subject = await prisma.subject.findUnique({
            where: {
                id: subjectId
            }
        });

        if (!subject) {
            throw new Error('Subject not found');
        }
        
        // return subject.courses;
        // A SUPPRIMER

        const courses = await prisma.course.findMany({
            where: {
                subjectId: subjectId
            }
        });
        return courses;

    } catch (error: any) {
        throw new Error(error);
    }
}