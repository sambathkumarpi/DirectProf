'use client';

import { SafeUser } from "@/app/types";
import { Course } from "@prisma/client";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";
import Image from "next/image";
import Modal from "../modals/Modal";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLogoutModal from "@/app/hooks/useLogoutModal";
import { log } from "console";
import { set } from "react-hook-form";
import HeartButton from "../HeartButton";

interface CourseCardProps {
    data: Course;
    onAction?: (id: string) => void;
    disabled?: boolean;
    actionLabel?: string;
    actionId?: string;
    currentUser?: SafeUser | null;
}

const CourseCard:React.FC<CourseCardProps> = ({
    data,
    onAction,
    disabled,
    actionLabel,
    actionId="",
    currentUser
}) => {
    const router = useRouter();
    const register = useRegisterModal();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const logoutModal = useLogoutModal();
    let clicked = false;
    const handleCancel = useCallback((
        e : React.MouseEvent<HTMLButtonElement>
    ) => {
        e.stopPropagation();

        if (disabled) {
            return;
        }

        onAction?.(actionId);
    }, [actionId, onAction, disabled]);

    const redirection = () => {
        if (currentUser !== null) {
            router.push(`/courses/${data.id}`);
        } else {
            logoutModal.onOpen();
        }
    };

    const toggle = useCallback(() => {
        logoutModal.onClose();
        register.onOpen();
    }, [register, logoutModal]);

    return (
        <div
        onClick={() => {clicked = true; redirection();}}
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
                    alt="Course image"
                    src={'/images/course.jpeg'} 
                    className="object-cover object-center w-full h-full group-hover:scale-105 transition-all duration-300"
                    />
                    <div className="absolute top-3 right-3">
                        <HeartButton
                        courseId={data.id}
                        currentUser={currentUser}
                        />
                    </div>
                </div>
                <div
                className="
                font-semibold
                text-lg
                "
                >
                    {data.title}
                </div>
                <Modal
                isOpen={logoutModal.isOpen}
                title="Not registered"
                body={(<div>You must be registered to access to courses</div>)}
                actionLabel="Register"
                onSubmit={toggle}
                onClose={logoutModal.onClose}
                />
            </div>
        </div>
    )
}

export default CourseCard;