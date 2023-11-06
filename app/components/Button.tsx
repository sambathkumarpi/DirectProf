'use client';

import { IconType } from "react-icons";

interface ButtonProps {
    label: string;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    outline?: boolean;
    small?: boolean;
    icon?: IconType;
    notLarge?: boolean;
}

const Button: React.FC<ButtonProps> = ({
    label,
    onClick,
    disabled,
    outline,
    small,
    icon: Icon,
    notLarge
}) => {
    return ( 
        <button
        onClick={onClick}
        disabled={disabled}
        className={`
        relative
        disabled:opacity-70
        disabled:cursor-not-allowed
        rounded-lg
        hover:opacity-80
        transition
        ${notLarge ? 'w-1/4' : 'w-full'}
        ${outline ? 'bg-white border-[1px] border-black text-black' : 'bg-blue-500 text-white'}
        ${small ? 'py-1 px-4 text-sm font-light border-[1px]' : 'py-3 px-6 text-md font-semibold border-2'}
        `}
        >
            {Icon && 
            <Icon
                size={18}
                className="
                absolute
                left-4
                top-3.5
                "
            />}
            {label}
        </button>
    );
}

export default Button;