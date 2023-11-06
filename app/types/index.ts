import { Subject, User } from "@prisma/client";

export type safeSubject = Omit<
    Subject,
    "createdAt"
> & {
    createdAt: string;
};

export type SafeUser = Omit<
    User,
    "password" | "createdAt" | "updatedAt" | "emailVerified"
> & {
    createdAt: string;
    updatedAt: string;
    emailVerified: string | null;
};