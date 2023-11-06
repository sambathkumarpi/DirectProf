import prisma from "@/app/libs/prismadb";

export default async function getCourses() {
    try {
        const courses = await prisma.course.findMany({
            orderBy: { createdAt: "desc" },
        });
        
        return courses;

    } catch (error: any) {
        throw new Error(error);
    }
}