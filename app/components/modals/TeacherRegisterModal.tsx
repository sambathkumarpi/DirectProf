'use client';

import axios from "axios";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import { toast } from "react-hot-toast";
import useTeacherRegisterModal from "@/app/hooks/useTeacherRegisterModal";
import { useTheme } from "next-themes";
import useTeacherLoginModal from "@/app/hooks/useTeacherLoginModal";

const TeacherRegisterModal = () => {
    const teacherRegisterModal = useTeacherRegisterModal();
    const teacherLoginModal = useTeacherLoginModal();
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
            name: "",
            email: "",
            password: ""
        },
    });

    const toggle = useCallback(() => {
        teacherRegisterModal.onClose();
        teacherLoginModal.onOpen();
    }, [teacherRegisterModal, teacherLoginModal]);

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        axios.post("/api/teacher", data)
            .then(() => {
                toast.success("Registered successfully");
                teacherRegisterModal.onClose();
            })
            .catch((err) => {
                toast.error("Something went wrong");
            })
            .finally(() => {
                setIsLoading(false);
            });
    };


    const bodyContent = (
        <div className="flex flex-col gap-4 max-h-[50vh] overflow-y-auto">
            <Heading
            title="Welcome to DirectProf !"
            subtitle="Create an account to get started."
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
            id="name"
            label="Name"
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
                        Already have an account?
                    </div>
                    <div
                    onClick={toggle}
                    className={`
                    ${theme==='dark'?'hover:text-neutral-200':'text-neutral-800'}
                    cursor-pointer
                    hover:underline
                    `}>
                        Sign in as a teacher
                    </div>
                </div>
            </div>
        </div>
    )

    return (
        <Modal
        disabled={isLoading}
        isOpen={teacherRegisterModal.isOpen}
        title="Register as a Teacher"
        actionLabel="Continue"
        onClose={teacherRegisterModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        body={bodyContent}
        footer={footerContent}
        />
    );
}

export default TeacherRegisterModal;