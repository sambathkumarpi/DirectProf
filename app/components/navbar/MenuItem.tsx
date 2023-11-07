'use client';

import { on } from "events";
import { useTheme } from "next-themes";

interface MenuItemProps {
    onClick: () => void;
    label: string;
}

const MenuItem: React.FC<MenuItemProps> = ({
    onClick,
    label
}) => {
    const { theme } = useTheme();
    return (
        <div
        onClick={onClick}
        className={`
        px-4
        py-3
        hover:bg-neutral-100
        ${theme==='dark'?'hover:text-neutral-700':''}
        transition
        font-semibold
        cursor-pointer
        text-end
        `}
        >
            {label}
        </div>
    );
}

export default MenuItem;