import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from "@/app/libs/prismadb";
import { Session } from "next-auth";

export async function getSession() {
    return await getServerSession(authOptions);
}

export default async function getCurrentTeacher() {
    try {
        const session = await getSession() as Session;

        if (!session?.user?.email) return null;

        const currentTeacher = await prisma.teacher.findUnique({
            where: { email: session.user.email as string } 
        });

        if (!currentTeacher) return null;

        return currentTeacher;        
    } catch (error: any) {
        return null;
    }
}
