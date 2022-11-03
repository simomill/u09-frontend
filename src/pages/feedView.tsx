import React, { FC, FormEvent, useEffect, useState } from "react";
import Post from "./components/post";
import { IoSearchOutline } from "react-icons/io5";
import { checkIsLoggedIn, logout } from "../Services/auth.service";
import { Link, useNavigate } from "react-router-dom";
import { getAllUsers, getPhotos } from "../Services/user.service";
import { IPhotoModel } from "../Models";
import FullscreenModal from "./components/fullscreenModal";

const FeedView: FC = () => {
    const navigate = useNavigate();

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [profileMenu, setProfileMenu] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [searchVal, setSearchVal] = useState("");
    const initialArray: any[] | (() => any[]) = [];
    const [photoArray, setPhotoArray] = useState<any[] | null>(null);
    const [userArray, setUserArray] = useState<any[] | null>(null);
    const [findings, setFindings] = useState(initialArray);
    const [chosenPhoto, setChosenPhoto] = useState<string | null>(null);
    const [showFullscreenModal, setShowFullscreenModal] = useState(false);

    function onClickLogout() {
        logout();
        navigate("/login");
        window.location.reload();
    }

    const onClickProfile = () => {
        profileMenu ? setProfileMenu(false) : setProfileMenu(true);
    };

    const onSearch = (val: string) => {
        setSearchVal(val);

        if (userArray) {
            for (const user of userArray) {
                if (user.username.includes(val)) {
                    if (!findings.includes(user.username)) {
                        setFindings((oldArr) => [...oldArr, user.username]);
                    }
                } else {
                    if (findings.includes(user.username)) {
                        findings.pop();
                        setFindings(findings);
                    }
                }
            }
        }
    };

    const changeState = (data: any) => {
        console.log({ data });

        if (!chosenPhoto) {
            setChosenPhoto(data);
            setShowFullscreenModal((prev) => !prev);
        }
    };

    async function fetchUsers() {
        const response = await getAllUsers();
        
        console.log(response.data);
        setUserArray(response.data);
    }

    // async function fetchPhotos() {
    //     const response = await getPhotos();

    //     setPhotoArray(response.data);
    // }

    useEffect(() => {
        const isLoggedIn = checkIsLoggedIn();
        setIsLoggedIn(isLoggedIn.token);
        setIsAdmin(isLoggedIn.isAdmin ?? "");

        if (userArray === null) {
            fetchUsers();
        }
        // if (photoArray === null) {
        //     fetchPhotos();
        // }

        if (!searchVal) {
            setFindings([]);
        }

        if (!showFullscreenModal) {
            setChosenPhoto(null);
        }
    }, [photoArray, searchVal, showFullscreenModal, userArray]);

    return (
        <>
            <div className="w-full py-6 flex flex-col">
                {/* Nav */}
                <nav className="flex flex-row justify-center items-center">
                    <div className="flex flex-row border border-gray-300 rounded-lg w-min p-3 items-center">
                        <input
                            type="text"
                            name=""
                            id=""
                            className="focus:outline-none"
                            onChange={(e) => onSearch(e.target.value)}
                        />
                        <IoSearchOutline className="w-6 h-6 text-gray-300" />
                    </div>

                    {searchVal && (
                        <div
                            className={
                                findings.length
                                    ? "absolute top-20 border z-20 w-72 rounded bg-white flex flex-col gap-1 items-center shadow-md"
                                    : "hidden"
                            }
                        >
                            {findings.map((user: string, index: number) => (
                                <Link
                                    key={index}
                                    className="flex flex-col w-1/3 items-start"
                                    to={`user/${user}`}
                                >
                                    <p className="font-medium py-2">{user}</p>
                                </Link>
                            ))}
                        </div>
                    )}

                    <div
                        onClick={onClickProfile}
                        className="rounded-full w-4 h-4 p-4 bg-slate-500 border border-gray-500 ml-5 relative cursor-pointer"
                    >
                        <div
                            className={
                                profileMenu
                                    ? "absolute w-min h-min shadow-md rounded-lg py-4 z-20 bg-white -left-10 top-5 mt-6 flex flex-col items-center gap-4"
                                    : "absolute w-60 h-min shadow-md rounded-lg py-2 z-20 bg-white left-0 top-0 mt-6 hidden aria-hidden"
                            }
                        >
                            {isAdmin && (
                                <Link to={"/dashboard"}>Dashboard</Link>
                            )}
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

                <div className="flex flex-wrap items-center justify-center">
                    {/* IF THERE ARE PHOTOS, THEN LOOP OVER THEM */}
                    {(() => {
                        if (photoArray && photoArray.length > 0) {
                            return (
                                <>
                                    {photoArray.map(
                                        (item: any, index: number) => (
                                            <div
                                                className="w-full flex flex-col items-center relative"
                                                key={index}
                                            >
                                                <Post
                                                    photo={photoArray[index]}
                                                    changeState={changeState}
                                                />
                                                <span className="w-full h-px border-b border-gray-200"></span>
                                            </div>
                                        )
                                    )}
                                </>
                            );
                        }
                    })()}
                </div>

                <FullscreenModal
                    showModal={showFullscreenModal}
                    setShowModal={setShowFullscreenModal}
                    data={chosenPhoto}
                />
            </div>
        </>
    );
};

export default FeedView;
