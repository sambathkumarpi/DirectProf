import prisma from '@/app/libs/prismadb';
import { NextResponse } from 'next/server';

export async function POST(
    request: Request,
) {
    const body = await request.json();
    const {
        name
    } = body;

    const subject = await prisma.subject.create({
        data: {
            name,
        }
    });

    return NextResponse.json(subject);
}