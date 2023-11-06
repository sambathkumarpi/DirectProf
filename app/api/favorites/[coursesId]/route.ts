import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams {
    coursesId?: string;
}

export async function POST(
    request: Request,
    { params }: { params: IParams }
) {
    const currentUser = await getCurrentUser();
    if (!currentUser) return NextResponse.error();  // return NextResponse.redirect("/");

    const { coursesId } = params;
    if (!coursesId || typeof(coursesId)!=='string') throw new Error("Invalid ID");

    let favIds = [...(currentUser.favoritesIds||[])];
    favIds.push(coursesId);

    const user = await prisma.user.update({
        where: { id: currentUser.id },
        data: { favoritesIds: favIds }
    });

    return NextResponse.json(user);
}

export async function DELETE(
    request: Request,
    { params }: { params: IParams }
) {
    const currentUser = await getCurrentUser();
    if(!currentUser) return NextResponse.error();  // return NextResponse.redirect("/");

    const { coursesId } = params;
    if (!coursesId || typeof(coursesId)!=='string') throw new Error("Invalid ID");

    let favIds = [...(currentUser.favoritesIds||[])];
    favIds = favIds.filter((id) => id!==coursesId);

    const user = await prisma.user.update({
        where: { id: currentUser.id },
        data: { favoritesIds: favIds }
    });
    
    return NextResponse.json(user);
}