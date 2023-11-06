'use client';

import { SafeUser, safeSubject } from "@/app/types";
import { Subject } from "@prisma/client";
import { useRouter } from "next/navigation";
import React, { useCallback } from "react";
import Image from "next/image";

interface SubjectCardProps {
    data: safeSubject;
    onAction?: (id: string) => void;
    disabled?: boolean;
    actionLabel?: string;
    actionId?: string;
    currentUser?: SafeUser | null;
}

const SubjectCard:React.FC<SubjectCardProps> = ({
    data,
    onAction,
    disabled,
    actionLabel,
    actionId="",
    currentUser
}) => {
    const router = useRouter();
    
    const handleCancel = useCallback((
        e : React.MouseEvent<HTMLButtonElement>
    ) => {
        e.stopPropagation();

        if (disabled) {
            return;
        }

        onAction?.(actionId);
    }, [actionId, onAction, disabled]);

    return (
        <div
        onClick={() => router.push(`/subjects/${data.name.replace(/\s/g, "_")}`)}
        className="col-span-1 cursor-pointer group"
        >
            <div
            className="flex flex-col w-full gap-2"
            >
                <div
                className="
                aspect-square
                w-full
                relative
                overflow-hidden
                rounded-xl
                "
                >
                    <Image
                    width={800}
                    height={800}
                    alt="Subject image"
                    src={data.image || '/images/course.jpeg'} 
                    className="object-cover object-center w-full h-full group-hover:scale-105 transition-all duration-300"
                    />
                </div>
                <div
                className="
                font-semibold
                text-lg
                "
                >
                    {data.name}
                </div>
            </div>
        </div>
    )
}

export default SubjectCard;