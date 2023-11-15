'use client';

import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import { toast } from "react-hot-toast";
import Button from "../Button";
import { signIn } from "next-auth/react";

import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import { useTheme } from "next-themes";
import { sendVerificationEmail } from "@/utils/email";
import useSWR from "swr";

const fetchMail = async (url: string) => {
    const response = await fetch(url);
    console.log(response);
    if(!response.ok) {
        throw new Error('An error occured while fetching the data.');
    }

    return response.json();
}

const RegisterModal = () => {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
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
    
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        
        axios.post("/api/register", data)
        .then(() => {
            toast.success("Registered successfully, please check your email to verify your account");
            registerModal.onClose();
            axios.post(`/api/mail/${data.email}`)
            .then(() => {
                toast.success("Email sent successfully");
            })
            })
        .catch((err) => {
            toast.error("Something went wrong");
        })
        .finally(() => {
            setIsLoading(false);
        });
    };

    const toggle = useCallback(() => {
        registerModal.onClose();
        loginModal.onOpen();
    }, [registerModal, loginModal]);


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
            <Button
            outline
            label="Continue with Google"
            icon={FcGoogle}
            onClick={()=>signIn('google')}
            />
            <Button
            outline
            label="Continue with GitHub"
            icon={AiFillGithub}
            onClick={()=>signIn('github')}
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
                        Already have an account?
                    </div>
                    <div
                    onClick={toggle}
                    className={`
                    ${theme==='dark'?'hover:text-neutral-200':'text-neutral-800'}
                    cursor-pointer
                    hover:underline
                    `}>
                        Sign In
                    </div>
                </div>
            </div>
        </div>
    )

    return (
        <Modal
        disabled={isLoading}
        isOpen={registerModal.isOpen}
        title="Register"
        actionLabel="Continue"
        onClose={registerModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        body={bodyContent}
        footer={footerContent}
        />
    );
}

export default RegisterModal;