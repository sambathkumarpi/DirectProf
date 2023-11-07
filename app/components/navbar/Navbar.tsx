'use client';

import { useTheme } from "next-themes";
import Container from "../Container";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";
import { SafeUser } from "@/app/types";

interface NavbarProps {
    currentUser?: SafeUser | null;
}

const Navbar: React.FC<NavbarProps> = ({
    currentUser
}) => {
    const { theme } = useTheme();
    return (
        <div className={`fixed w-full ${theme==='dark'?'bg-[#1a202c]':'bg-white'} z-10 shadow-lg`}>
            <div
            className="
            py-4
            border-b-[1px]
            ">
                <Container>
                    <div className="flex flex-row items-center justify-between">
                        <div className="flex items-center flex-1" title="Home page DirectProf">
                            <Logo />
                        </div>
                        <div className="flex items-center justify-center">
                            <Search />
                        </div>
                        <div className="flex items-center flex-1 justify-end">
                            <UserMenu currentUser={currentUser} />
                        </div>
                    </div>
                </Container>
            </div>
        </div>
    ); 
}

export default Navbar;