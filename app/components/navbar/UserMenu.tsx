'use client';

import { AiOutlineMenu } from 'react-icons/ai';
import { RiMoonClearFill, RiSunFill } from 'react-icons/ri';
import { useCallback, useEffect, useRef, useState } from 'react';
import { signOut } from 'next-auth/react';
import { SafeUser } from '@/app/types';
import { useRouter } from "next/navigation";

import MenuItem from './MenuItem';
import Avatar from '../Avatar';

import useRegisterModal from '@/app/hooks/useRegisterModal';
import useLoginModal from '@/app/hooks/useLoginModal';
import useTeacherRegisterModal from '@/app/hooks/useTeacherRegisterModal';
import { useTheme } from 'next-themes';
import Providers from '@/app/providers';
import { Teacher } from '@prisma/client';
import UserConnectedMenu from './UserConnectedMenu';
import TeacherMenu from './TeacherMenu';

interface UserMenuProps {
    currentUser?: SafeUser | null;
    currentTeacher?: Teacher | null;
}

const UserMenu: React.FC<UserMenuProps> = ({
    currentUser,
    currentTeacher
}) => {
    const router = useRouter();
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const teacherRegisterModal = useTeacherRegisterModal();
    
    const [isOpen, setIsOpen] = useState(false);
    const [darkmode, setDarkmode] = useState(false);
    const {theme, setTheme} = useTheme();
    const [loaded, setLoaded] = useState(false);

    const toggleOpen = useCallback(() => {
        setIsOpen((value) => !value);
    }, []);

    const toggleDarkmode = useCallback(() => {
        setDarkmode((value) => !value);
        setTheme(theme === 'dark' ? 'light' : 'dark');
    }, [theme, setTheme]);

    const ref = useRef<HTMLDivElement | null>(null);
  
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
          toggleOpen();
        }
      };
      document.addEventListener('click', handleClickOutside, true);
      return () => {
        document.removeEventListener('click', handleClickOutside, true);
      };
    });


    useEffect(() => {
      if (!loaded) {
        toggleDarkmode();
      }
    }, [loaded]);

    console.log(theme);

    return (
        <Providers>
        <div className="relative">
            <div className="flex flex-row items-center gap-3">
                {darkmode ? (
                    <RiMoonClearFill className="text-blue-500 cursor-pointer" onClick={toggleDarkmode} title="Change to Dark Mode"/>
                ) : (
                    <RiSunFill className="text-yellow-500 cursor-pointer" onClick={toggleDarkmode} title="Change to Light Mode"/>
                )}
                {/* <div 
                onClick={() => {}}
                className="
                hidden
                md:block
                text-sm
                font-semibold
                py-3
                px-4
                rounded-full
                hover:bg-neutral-100
                hover:underline
                transition
                cursor-pointer
                ">
                    Dashboard
                </div> */}
                <div 
                onClick={toggleOpen}
                className="
                p-4
                md:py-1
                md:px-2
                border-[1px]
                border-neutral-200
                flex
                flex-row
                items-center
                gap-3
                rounded-xl
                cursor-pointer
                hover:shadow-md
                transition
                ">
                    <AiOutlineMenu className={`text-${theme==='dark' ? 'blue':'neutral'}-500`} />
                    <div className="hidden md:block">
                        <Avatar src={currentUser?.image} />
                    </div>
                </div>
            </div>
            {isOpen && (
                <div
                className={`
                absolute
                rounded-xl
                shadow-md
                w-[40vw]
                md:w-3/4
                ${theme==='dark' ? 'bg-neutral-700' : 'bg-white'}
                overflow-hidden
                right-0
                top-12
                text-sm
                min-w-[150px]
                `}>
                    <div ref={ref} className='flex flex-col'>
                        {currentUser ? (
                            <UserConnectedMenu currentUser={currentUser} />
                        ) : (
                            (currentTeacher) ? (
                                <TeacherMenu currentTeacher={currentTeacher} />
                            ) :
                            <>
                                <MenuItem
                                onClick={()=>{loginModal.onOpen();toggleOpen();}}
                                label="Login"
                                />
                                <MenuItem
                                onClick={registerModal.onOpen}
                                label="Sign Up"
                                />
                                <hr className='my-2' />
                                <MenuItem
                                onClick={teacherRegisterModal.onOpen}
                                label="You're a teacher?"
                                />
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
        </Providers>
    );
}

export default UserMenu;