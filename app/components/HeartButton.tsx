'use client';

import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { SafeUser } from "../types";
import useFavorites from "../hooks/useFavorites";

interface HeartButtonProps {
    courseId: string;
    currentUser?: SafeUser | null;
    table?: boolean;
}

const HeartButton: React.FC<HeartButtonProps>=({courseId, currentUser,table=false}) => {
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
            className={`
            fill-white
            absolute
            -top-[2px]
            -right-[2px]
            ${table ? 'hidden' : 'show'}
            `}
            />
            <AiFillStar
            size={24}
            className={`
                ${hasFavorited ? `fill-yellow-500` : `fill-neutral-500/70`}
                ${table ? 'mx-auto' : ''}
            `}
            />
        </div>
    ); 
}
export default HeartButton;