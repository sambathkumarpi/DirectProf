import prisma from "@/app/libs/prismadb";

export default async function getSubjects() {
    try {
        const subjects = await prisma.subject.findMany({
            orderBy: { createdAt: "asc" },
        });
        
        const safeSubjects = subjects.map((subject) => ({
             ...subject,
            createdAt: subject.createdAt.toISOString(),

        }));

        return safeSubjects;
    } catch (error: any) {
        throw new Error(error);
    }
}