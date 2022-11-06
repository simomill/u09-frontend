import React, { useEffect, useState } from "react";
import { AiFillHome } from "react-icons/ai";
import { IoSearchOutline } from "react-icons/io5";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IUserModel } from "../../Models";
import { logout } from "../../Services/auth.service";

const Nav = (userArray: IUserModel[] | any, isAdmin: boolean, pageId: string) => {
    const navigate = useNavigate();
    const [profileMenu, setProfileMenu] = useState(false);
    const [searchVal, setSearchVal] = useState("");
    const initialArray: any[] | (() => any[]) = [];
    const [findings, setFindings] = useState(initialArray);
    isAdmin = userArray.isAdmin;
    pageId = userArray.pageId;    

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
            for (const user of userArray.userArray) {
                if (user.username?.includes(val)) {
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

    useEffect(() => {
        if (!searchVal) {
            setFindings([]);
        }
    }, [searchVal]);

    return (
        <>
            <nav className="flex flex-row justify-center items-center">
                {pageId === "/dashboard" && (
                    <Link to={"/"}>
                        <AiFillHome className="w-6 h-6 text-slate-800 hover:text-slate-600 mr-4" />
                    </Link>
                )}
                <div className={pageId === "/dashboard" ? "bg-white flex flex-row border border-gray-300 rounded-lg w-min p-3 items-center" : "flex flex-row border border-gray-300 rounded-lg w-min p-3 items-center"}>
                    <input
                        type="text"
                        name="searchfield"
                        id="searchfield"
                        className="focus:outline-none"
                        onChange={(e) => onSearch(e.target.value)}
                        aria-label={"search"}
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
                        {pageId === "/dashboard" ? (
                            <>
                                <Link
                                    className="px-8 w-min hover:text-cyan-600"
                                    to={`/user/${localStorage.getItem(
                                        "username"
                                    )}`}
                                >
                                    Profile
                                </Link>
                                <button
                                    className="hover:text-cyan-600"
                                    onClick={onClickLogout}
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                {isAdmin && (
                                    <Link to={"//dashboard"}>/dashboard</Link>
                                )}
                                <Link
                                    className="px-8 w-min hover:text-cyan-600"
                                    to={`/user/${localStorage.getItem(
                                        "username"
                                    )}`}
                                >
                                    Profile
                                </Link>
                                <button
                                    className="hover:text-cyan-600"
                                    onClick={onClickLogout}
                                >
                                    Logout
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </nav>

            <span className="w-full h-px border-b border-gray-200 p-2"></span>
        </>
    );
};

export default Nav;
