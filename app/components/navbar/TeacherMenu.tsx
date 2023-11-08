'use client';

import { useRouter } from "next/navigation";
import MenuItem from "./MenuItem";
import { signOut } from "next-auth/react";
import { Teacher } from "@prisma/client";

interface TeacherConnectedMenuProps {
    currentTeacher: Teacher;
}

const TeacherConnectedMenu: React.FC<TeacherConnectedMenuProps> = ({
    currentTeacher
}) => {
    const router = useRouter();
    return (
        <>
            <div
            className="
            cursor-default
            text-center
            px-4
            py-3
            font-bold
            "
            >
                Hello {currentTeacher.name}
            </div>
            <MenuItem
            onClick={()=>{}}
            label="My Dashboard"
            />
            <MenuItem
            onClick={()=>{}}
            label="Create a course"
            />
            <MenuItem
            onClick={() => signOut()}
            label="Log out"
            />
        </>
    )
}

export default TeacherConnectedMenu;