import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createFictionalHistoryCourse() {
  try {
    // Create a fictional user
    const user = await prisma.user.create({
      data: {
        name: "John Doe",
        email: "john@example.com",
        // Other fictional user fields
      },
    });

    // Create a fictional teacher
    const teacher = await prisma.teacher.create({
      data: {
        name: "Jane Smith",
        email: "jane@example.com",
        // Other fictional teacher fields
      },
    });

    // Create a fictional subject
    const subject = await prisma.subject.create({
      data: {
        name: "History",
        description: "Advanced history course",
        // Other fictional subject fields
      },
    });

    // Create a fictional history course
    const course = await prisma.course.create({
      data: {
        title: "History of Ancient Civilizations",
        description: "This course covers the history of ancient civilizations.",
        image: "https://example.com/history-course.jpg",
        teacher: {
          connect: {
            id: teacher.id,
          },
        },
        subject: {
          connect: {
            id: subject.id,
          },
        },
        studentFav: {
          connect: {
            id: user.id,
          },
        },
        // Other fictional course fields
      },
    });

    console.log("Fictional history course created successfully:", course);
  } catch (error) {
    console.error("Error creating fictional history course:", error);
  } finally {
    await prisma.$disconnect();
  }
}

export async function createAdditionalHistoryCourses() {
  try {
    // Find the existing professor and subject
    const teacher = await prisma.teacher.findUnique({
      where: {
        email: "jane@example.com",
      },
    });

    const subject = await prisma.subject.findUnique({
      where: {
        name: "History",
      },
    });

    if (!teacher || !subject) {
      throw new Error("Teacher or subject not found");
    }
    // Create two additional history courses
    const course1 = await prisma.course.create({
      data: {
        title: "The Renaissance Era",
        description: "Explore the cultural and artistic movements of the Renaissance era in this comprehensive history course.",
        image: "https://example.com/renaissance-course.jpg",
        teacher: {
          connect: {
            id: teacher.id,
          },
        },
        subject: {
          connect: {
            id: subject.id,
          },
        },
        // Other fictional course fields
      },
    });

    const course2 = await prisma.course.create({
      data: {
        title: "World War II: A Detailed Account",
        description: "Delve into the events, causes, and consequences of World War II with this in-depth history course.",
        image: "https://example.com/world-war-ii-course.jpg",
        teacher: {
          connect: {
            id: teacher.id,
          },
        },
        subject: {
          connect: {
            id: subject.id,
          },
        },
        // Other fictional course fields
      },
    });

    console.log("Additional history courses created successfully:", course1, course2);
  } catch (error) {
    console.error("Error creating additional history courses:", error);
  } finally {
    await prisma.$disconnect();
  }
}
