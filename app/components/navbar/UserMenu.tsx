"use client";
import React, { useState, useCallback } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import MenuItem from "./MenuItem";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import { signOut } from "next-auth/react";
import { SafeUser } from "@/app/types";

interface MenuProps {
    currentUser?: SafeUser | null;
}

const UserMenu: React.FC<MenuProps> = ({ currentUser }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleOpen = useCallback(() => {
        setIsOpen((value) => !value);
    }, []);

    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();

    return (
        <div className="relative">
            <div
                className="flex flex-row items-center gap-3"
                onClick={toggleOpen}
            >
                <div className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer">
                    Airbnb your home
                </div>
                <div className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition">
                    <AiOutlineMenu />
                    <div className="hidden sm:block">
                        <Avatar src={currentUser?.image} />
                    </div>
                </div>
            </div>
            {isOpen && (
                <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
                    <div className="flex flex-col items-center cursor-pointer">
                        {currentUser ? (
                            <>
                                <MenuItem onClick={() => {}} label="My trips" />
                                <MenuItem
                                    onClick={() => {}}
                                    label="My favorites"
                                />

                                <MenuItem
                                    onClick={() => {}}
                                    label="My properties"
                                />
                                <MenuItem
                                    onClick={() => {}}
                                    label="Airbnb my home"
                                />
                                <hr />

                                <MenuItem
                                    onClick={() => signOut()}
                                    label="Logout"
                                />
                            </>
                        ) : (
                            <>
                                <MenuItem
                                    onClick={loginModal.onOpen}
                                    label="Login"
                                />
                                <MenuItem
                                    onClick={registerModal.onOpen}
                                    label="Sign up"
                                />
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserMenu;
