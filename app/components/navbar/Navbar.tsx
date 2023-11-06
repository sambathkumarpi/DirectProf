'use client';

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
    return (
        <div className="fixed w-full bg-white z-10 shadow-lg">
            {/* shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] */}
            <div
            className="
            py-4
            border-b-[1px]
            ">
                <Container>
                    <div className="flex flex-row items-center justify-between">
                        <div className="flex items-center flex-1">
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