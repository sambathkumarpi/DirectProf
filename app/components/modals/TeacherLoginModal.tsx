'use client';

import axios from "axios";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import { toast } from "react-hot-toast";
import useTeacherLoginModal from "@/app/hooks/useTeacherLoginModal";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import useTeacherRegisterModal from "@/app/hooks/useTeacherRegisterModal";
import { signIn } from "next-auth/react";

const TeacherLoginModal = () => {
    const router = useRouter();
    const teacherLoginModal = useTeacherLoginModal();
    const teacherRegisterModal = useTeacherRegisterModal();
    const [isLoading, setIsLoading] = useState(false);
    const { theme } = useTheme();

    const {
        register,
        handleSubmit,
        formState: {
            errors
        },
    } = useForm<FieldValues>({
        defaultValues: {
            email: "",
            password: ""
        },
    });

    const toggle = useCallback(() => {
        teacherLoginModal.onClose();
        teacherRegisterModal.onOpen();
    }, [teacherLoginModal, teacherRegisterModal]);

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        signIn('credentials', {
            ...data,
            redirect: false,
        })
        .then((callback) => {
            setIsLoading(false);

            if(callback?.ok) {
                toast.success("Logged in successfully");
                router.refresh();
                teacherLoginModal.onClose();
            }

            if(callback?.error) {
                toast.error(callback.error);
            }
        });

    };


    const bodyContent = (
        <div className="flex flex-col gap-4 max-h-[50vh] overflow-y-auto">
            <Heading
            title="Welcome back !"
            subtitle="Login to your teacher account"
            center
            />
            <hr />
            <Input
            id="email"
            label="Email"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
            />
            <Input
            id="password"
            type="password"
            label="Password"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
            />
        </div>
    );
    
    const footerContent = (
        <div className="flex flex-col gap-4 mt-3">
            <hr />
            <div
            className="
            text-neutral-500
            text-center
            mt-4
            font-light
            "
            >
                <div className="flex flex-row items-center gap-2">
                    <div >
                        First time here ?
                    </div>
                    <div
                    onClick={toggle}
                    className={`
                    ${theme==='dark'?'hover:text-neutral-200':'text-neutral-800'}
                    cursor-pointer
                    hover:underline
                    `}>
                        Create a teacher account
                    </div>
                </div>
            </div>
        </div>
    )

    return (
        <Modal
        disabled={isLoading}
        isOpen={teacherLoginModal.isOpen}
        title="Login as a Teacher"
        actionLabel="Continue"
        onClose={teacherLoginModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        body={bodyContent}
        footer={footerContent}
        />
    );
}

export default TeacherLoginModal;