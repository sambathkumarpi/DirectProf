import prisma from "@/app/libs/prismadb";


interface IParams {
    teacherId?: string;
}

export default async function getCoursesByTeacher(
    params: IParams
) {
    try {
        const courses = await prisma.course.findMany({
            where: {
                teacherId: params.teacherId
            }
        });
        return courses;

    } catch (error: any) {
        throw new Error(error);
    }

}
