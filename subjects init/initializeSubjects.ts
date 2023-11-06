import fs from 'fs';
import prisma from '@/app/libs/prismadb';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name } = body;

    const subject = await prisma.subject.create({
      data: {
        name,
      },
    });

    return NextResponse.json(subject);
  } catch (error) {
    return console.log(error);
  }
}

export async function initializeSubjects() {
  try {
    const subjectsData = fs.readFileSync('aatest/subjects.json', 'utf8');
    const subjects = JSON.parse(subjectsData);

    for (let i = 0; i < subjects.length; i++) {
      const data = {
        name: subjects[i],
      };
      await prisma.subject.create({ data });
    }

    console.log('Liste de matières ajoutée avec succès.');
  } catch (error) {
    console.error('Une erreur s\'est produite lors de l\'initialisation des matières :', error);
  }
}
