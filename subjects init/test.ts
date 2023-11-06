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

export async function createMathAndITCourses() {
  try {
    // Find the existing professor by email
    const teacher = await prisma.teacher.findUnique({
      where: {
        email: "jane@example.com", // Use the professor's email
      },
    });

    // Find the existing subjects for "Math" and "IT"
    const mathSubject = await prisma.subject.findUnique({
      where: {
        name: "Math",
      },
    });

    const itSubject = await prisma.subject.findUnique({
      where: {
        name: "IT",
      },
    });

    if (!teacher || !mathSubject || !itSubject) {
      throw new Error("Teacher or subject not found");
    }

    // Create multiple math courses
    const mathCourses = [
      {
        title: "Advanced Calculus",
        description: "This course covers advanced topics in calculus, including limits, derivatives, and integrals.",
      },
      {
        title: "Linear Algebra Fundamentals",
        description: "Explore the fundamentals of linear algebra, including vector spaces, matrices, and eigenvalues.",
      },
    ];

    // Create multiple IT courses
    const itCourses = [
      {
        title: "Web Development Basics",
        description: "Learn the basics of web development, including HTML, CSS, and JavaScript.",
      },
      {
        title: "Database Design Principles",
        description: "Discover the principles of designing efficient and secure databases for applications.",
      },
    ];

    for (const course of mathCourses) {
      await prisma.course.create({
        data: {
          title: course.title,
          description: course.description,
          teacher: {
            connect: {
              id: teacher.id,
            },
          },
          subject: {
            connect: {
              id: mathSubject.id,
            },
          },
        },
      });
    }

    for (const course of itCourses) {
      await prisma.course.create({
        data: {
          title: course.title,
          description: course.description,
          teacher: {
            connect: {
              id: teacher.id,
            },
          },
          subject: {
            connect: {
              id: itSubject.id,
            },
          },
        },
      });
    }

    console.log("Math and IT courses created successfully.");
  } catch (error) {
    console.error("Error creating Math and IT courses:", error);
  } finally {
    await prisma.$disconnect();
  }
}
