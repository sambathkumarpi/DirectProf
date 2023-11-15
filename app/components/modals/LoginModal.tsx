'use client';

import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, set, useForm } from "react-hook-form";

import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";

import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import { toast } from "react-hot-toast";
import Button from "../Button";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";

const LoginModal = () => {
    const router = useRouter();
    const loginModal = useLoginModal();
    const registerModal = useRegisterModal();
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
            password: "",
        },
    });

    const toggle = useCallback(() => {
        loginModal.onClose();
        registerModal.onOpen();
    }, [loginModal, registerModal]);

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
                loginModal.onClose();
            }

            if(callback?.error) {
                toast.error(callback.error);
            }
        });
    };


    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading
            title="Welcome back !"
            subtitle="Login to your account"
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
    
    // PASSWORD FORGOTTEN ???
    
    const footerContent = (
        <div className="flex flex-col gap-4 mt-3 max-h-[50vh] overflow-y-auto">
            <hr />
            <Button
            outline
            label="Continue with Google"
            icon={FcGoogle}
            onClick={()=>{}}
            />
            <Button
            outline
            label="Continue with GitHub"
            icon={AiFillGithub}
            onClick={()=>{}}
            />
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
                        First time using DirectProf ?
                    </div>
                    <div
                    onClick={toggle}
                    className={`
                    ${theme==='dark'?'hover:text-neutral-200':'text-neutral-800'}
                    cursor-pointer
                    hover:underline
                    `}>
                        Create an account
                    </div>
                </div>
            </div>
        </div>
    )

    return (
        <Modal
        disabled={isLoading}
        isOpen={loginModal.isOpen}
        title="Login"
        actionLabel="Continue"
        onClose={loginModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        body={bodyContent}
        footer={footerContent}
        />
    );
}

export default LoginModal;