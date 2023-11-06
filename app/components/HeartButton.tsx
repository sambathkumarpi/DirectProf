'use client';

import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { SafeUser } from "../types";
import useFavorites from "../hooks/useFavorites";

interface HeartButtonProps {
    courseId: string;
    currentUser?: SafeUser | null;
}

const HeartButton: React.FC<HeartButtonProps>=({courseId, currentUser}) => {
    const { hasFavorited, toggle } = useFavorites({
        courseId,
        currentUser
    });
    return (
        <div
        onClick={toggle}
        className="
        relative
        hover:opacity-80
        transition-opacity
        cursor-pointer
        ">
            <AiOutlineStar
            size={28}
            className="
            fill-white
            absolute
            -top-[2px]
            -right-[2px]
            "
            />
            <AiFillStar
            size={24}
            className={`
                ${hasFavorited ? `fill-yellow-500` : `fill-neutral-500/70`}
            `}
            />
        </div>
    ); 
}
export default HeartButton;