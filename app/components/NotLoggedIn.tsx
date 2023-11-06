'use client';

import useLoginModal from "../hooks/useLoginModal";
import Button from "./Button";
import EmptyState from "./EmptyState";

interface NotLoggedInProps {
        
}

const NotLoggedIn: React.FC<NotLoggedInProps> = () => {
    const loginModal = useLoginModal();
    return (
        <div className="h-screen flex flex-col justify-center items-center">
            <EmptyState 
                title="You are not logged in"
                subtitle="You can log in or register to access this page."
                noHeight
            />
            <Button
                label="Log in"
                onClick={loginModal.onOpen}
                notLarge
            />
        </div>
    );
}

export default NotLoggedIn;