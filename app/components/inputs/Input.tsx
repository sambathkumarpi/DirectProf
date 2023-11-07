'use client';

import { Princess_Sofia } from "next/font/google";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { BiDollar } from "react-icons/bi";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useState } from "react";
import { useTheme } from "next-themes";

interface InputProps {
    id: string;
    label: string;
    type?: string;
    disabled?: boolean;
    formatPrice?: boolean;
    required?: boolean;
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors;
}

const Input: React.FC<InputProps> = ({
    id,
    label,
    type = "text",
    disabled,
    formatPrice,
    required,
    register,
    errors
}) => {
    const [showPassword, setShowPassword] = useState(false);
    const { theme } = useTheme();

    const clickOnEye = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="w-full relative">
            {formatPrice && (
                <BiDollar
                size={24}
                className="
                text-neutral-700
                absolute
                top-5
                left-2
                "
            />)}
            <input
            id="id"
            disabled={disabled}
            {...register(id, { required })}
            placeholder=" "
            type={type === "password" ? (showPassword ? "text" : "password") : type}
            className={`
            peer
            w-full
            p-4
            pt-6
            font-light
            ${theme==='dark'?'bg-neutral-600':'bg-white'}
            border-2
            rounded-md
            outline-none
            transition
            disabled:opacity-70
            disabled:cursor-not-allowed
            ${formatPrice ? "pl-9" : "pl-4"}
            ${errors[id] ? "border-red-500 focus:border-red-700" : "border-neutral-300 focus:border-neutral-700"}
            `}
            />
            <label
            className={`
            absolute
            text-md
            duration-150
            transform
            -translate-y-3
            top-5
            z-10
            origin-[0]
            scale-75
            ${formatPrice ? "left-9" : "left-4"}
            peer-placeholder-shown:scale-100
            peer-placeholder-shown:translate-y-0
            peer-focus:scale-75
            peer-focus:-translate-y-4
            ${errors[id] ? "text-red-400" : (theme==='dark'?'text-white':'text-neutral-600')}
            
            `}
            >
                {label}
            </label>
            {type==="password" && showPassword && (
            <AiFillEyeInvisible
            onClick={() => clickOnEye()}
            size={24}
            className="
            text-blue-500
            absolute
            top-5
            right-4
            "
            />)}
            {type==="password" && !showPassword && (
            <AiFillEye
            onClick={() => clickOnEye()}
            size={24}
            className="
            text-blue-500
            absolute
            top-5
            right-4
            "
            />)}
        </div>
    );
}

export default Input