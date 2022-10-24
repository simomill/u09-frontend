import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../Services/auth.service";
import { getAllUsers } from "../Services/user.service";
import { AiOutlineStop } from "react-icons/ai";
import { BsFillPencilFill, BsTrashFill } from "react-icons/bs";
import { ImPlus } from "react-icons/im";
import { BsFillKeyFill } from "react-icons/bs";
import RemoveUsrModal from "./components/removeUsrModal";
import NewUsrModal from "./components/NewUsrModal";

const Dashboard = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [profileMenu, setProfileMenu] = useState(false);
    const initialArray: any[] | (() => any[]) = [];
    const [userArray, setUserArray] = useState(initialArray);
    const [userName, setUserName] = useState("");
    const [showRemoveModal, setShowRemoveModal] = useState(false);
    const [showNewUsrModal, setShowNewUsrModal] = useState(false);

    function onClickLogout() {
        logout();
        navigate("/login");
        window.location.reload();
    }

    const onClickProfile = () => {
        profileMenu ? setProfileMenu(false) : setProfileMenu(true);
    };

    const onRemove = (username: string) => {
        // console.log(username);

        setShowRemoveModal((prev) => !prev);
        setUserName(username);
    };

    const onAdd = () => {
        setShowNewUsrModal((prev) => !prev);
    };

    useEffect(() => {
        const fetchUsers = async () => {
            const users = await getAllUsers();

            setUserArray(users);
        };

        if (userArray.length === 0) {
            fetchUsers();
        }
    }, [userArray.length]);

    return (
        <div className="h-screen py-6 px-2 items-center flex flex-col bg-gray-100 relative">
            {/* Nav */}
            <nav className="flex flex-row justify-center items-center">
                <div className="flex flex-row border border-gray-300 rounded-lg w-min p-2 items-center bg-white">
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

            <span className="w-full h-px border-b border-gray-200 py-2"></span>

            {/* Content */}

            <div className="flex flex-col justify-start items-stretch p-4 gap-2">
                <p className="text-3xl font-bold pb-3">Users</p>
                {userArray.map((user, index) => (
                    <div
                        key={index}
                        className="flex bg-white border border-gray-200 rounded justify-between"
                    >
                        
                        
                        <div className="flex items-start flex-col p-3 hover:text-sky-400 cursor-pointer"
                        onClick={() => navigate(`/user/${user.username}`)}>
                                <p>{user.name}</p>
                                <p>{user.email}</p>
                            </div>

                        <div className="flex justify-center border-l border-gray-200">
                            <div className="flex items-center border-r border-gray-200 px-4">
                                <BsFillKeyFill className="w-6 h-6 text-sky-900" />
                            </div>
                            <div className="flex items-center border-r border-gray-200 px-4">
                                <BsFillPencilFill className="w-6 h-6 text-sky-900" />
                            </div>

                            <div className="flex items-center px-4">
                                <BsTrashFill
                                    className="w-6 h-6 text-sky-900 hover:text-red-900 cursor-pointer"
                                    onClick={() => onRemove(user.username)}
                                />
                            </div>
                        </div>
                    </div>
                ))}
                <ImPlus
                    className={
                        showNewUsrModal
                            ? "w-6 h-6 my-5 mx-2 text-green-600 hover:text-green-600 cursor-pointer"
                            : "w-6 h-6 my-5 mx-2 text-green-800 hover:text-green-600 cursor-pointer"
                    }
                    onClick={onAdd}
                />
            </div>

            <RemoveUsrModal
                userName={userName}
                showModal={showRemoveModal}
                setShowModal={setShowRemoveModal}
            />

            <NewUsrModal
                showModal={showNewUsrModal}
                setShowModal={setShowNewUsrModal}
            />

            {/* <span className="w-full h-px border-b border-gray-200"></span> */}
        </div>
    );
};

export default Dashboard;