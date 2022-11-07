import React, { useEffect, useState } from "react";
import { AiFillHome } from "react-icons/ai";
import { IoSearchOutline } from "react-icons/io5";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IUserModel } from "../../Models";
import { logout } from "../../Services/auth.service";

const Nav = (
    userArray: IUserModel[] | any,
    isAdmin: boolean,
    pageId: string
) => {
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
                        <AiFillHome className="homeBtn" />
                    </Link>
                )}
                <div
                    className={
                        pageId === "/dashboard"
                            ? "searchField bg-white"
                            : "searchField"
                    }
                >
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
                                ? "searchResults"
                                : "hidden aria-hidden"
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
                    className="avatar"
                >
                    <div
                        className={
                            profileMenu
                                ? "menu"
                                : " hidden aria-hidden"
                        }
                    >
                        {pageId !== "/dashboard" && (
                            <>
                                {isAdmin && (
                                    <Link
                                        className="menuLink"
                                        to={"/dashboard"}
                                    >
                                        Dashboard
                                    </Link>
                                )}
                            </>
                        )}

                        <Link
                            className="menuLink"
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

            <span className="divider"></span>
        </>
    );
};

export default Nav;
