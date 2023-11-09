'use client';

import { useTheme } from "next-themes";
import { IconType } from "react-icons";

interface SubjectButtonProps {
    icon?: IconType;
    label: string;
    selected?: boolean;
    onClick: (value: string) => void;
}

const SubjectButton: React.FC<SubjectButtonProps> = ({
    // icon: Icon,
    label,
    selected,
    onClick
}) => {
    const { theme } = useTheme();
    return (
        <button
            className={`
            flex
            items-center
            justify-center
            w-24
            h-24
            rounded-lg
            ${theme === 'dark' ? (selected ? 'bg-blue-500 text-white' : 'bg-gray-800') : (selected ? 'bg-blue-500 text-white' : 'bg-gray-100')}
            `}
            onClick={() => onClick(label)}
        >
            <span className="text-xl">{label}</span>
            {/* <Icon className={`w-10 h-10 ${selected ? 'text-white' : 'text-gray-500'}`} /> */}
        </button>
    );
};

export default SubjectButton;