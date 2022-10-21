import React, { FC, useEffect, useState } from "react";
import Post from "./components/post";
import Search from "../heroicons/search";
import {IoSearchOutline} from 'react-icons/io5'
import { checkIsLoggedIn, logout } from "../Services/auth.service";
import { Link, useNavigate } from "react-router-dom";

const FeedView: FC = () => {
    const posts: number = 9;

    const navigate = useNavigate();

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [profileMenu, setProfileMenu] = useState(false);

    function onClickLogout() {
        logout();
        navigate("/login");
        window.location.reload();
    }

    const onClickProfile = () => {
        profileMenu ? setProfileMenu(false) : setProfileMenu(true);
    };

    useEffect(() => {
        const isLoggedIn = checkIsLoggedIn();
        setIsLoggedIn(isLoggedIn);
    }, []);

    return (
        <>
            <div className="w-full py-6 flex flex-col">
                {/* Nav */}
                <nav className="flex flex-row justify-center items-center">
                    <div className="flex flex-row border border-gray-300 rounded-lg w-min p-2 items-center">
                        <input
                            type="text"
                            name=""
                            id=""
                            className="focus:outline-none"
                        />
                        <IoSearchOutline className="w-6 h-6 text-gray-300" />
                    </div>

                    <div
                        onClick={onClickProfile}
                        className="rounded-full w-4 h-4 p-4 bg-slate-500 border border-gray-500 ml-5 relative cursor-pointer"
                    >
                        <div
                            className={
                                profileMenu
                                    ? "absolute w-min h-min shadow-md rounded-lg py-4 z-20 bg-white -left-10 top-5 mt-6 flex flex-col items-center gap-4"
                                    : "absolute w-60 h-min shadow-md rounded-lg py-2 z-20 bg-white left-0 top-0 mt-6 hidden"
                            }
                        >
                            <Link
                                className="px-8 w-min hover:text-cyan-600"
                                to={`/user/${localStorage.getItem("username")}`}
                            >
                                Profile
                            </Link>
                            <button
                                className="hover:text-cyan-600"
                                onClick={onClickLogout}
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </nav>

                <span className="w-full h-px border-b border-gray-200 p-2"></span>

                {/* Content */}

                <Post photo={null} />

                <span className="w-full h-px border-b border-gray-200 p-2"></span>


            </div>
        </>
    );
};

export default FeedView;
