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
    // ----------------STATES AND VARIABLES
    const navigate = useNavigate();
    const [profileMenu, setProfileMenu] = useState(false);
    const [searchVal, setSearchVal] = useState("");
    const initialArray: any[] | (() => any[]) = [];
    const [findings, setFindings] = useState(initialArray);
    isAdmin = userArray.isAdmin;
    pageId = userArray.pageId;

    // ------------------FUNCTIONS
    function onClickLogout() {
        logout();
        navigate("/login");
        window.location.reload();
    }

    //  Show/Hide the menu when clicking the avatar
    const onClickProfile = () => {
        profileMenu ? setProfileMenu(false) : setProfileMenu(true);
    };

    // When writing in searchbar,
    // suggestions of users should appear.
    const onSearch = (val: string) => {
        setSearchVal(val);

        // Look through all the users,
        // and if a username has what is being searched
        // for, that username should be saved. If it doesnt,
        // and that username already is saved, it should be removed.
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

                {(() => {
                    if (searchVal && findings.length > 0)
                        return (
                            <div className={"searchResults"}>
                                {findings.map((user: string, index: number) => (
                                    <Link
                                        key={index}
                                        className="flex flex-col w-1/3 items-start"
                                        to={`user/${user}`}
                                    >
                                        <p className="font-medium py-2">
                                            {user}
                                        </p>
                                    </Link>
                                ))}
                            </div>
                        );
                })()}

                <div onClick={onClickProfile} className="avatar">
                    {profileMenu && (
                        <div
                            className={"menu"}>
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
                    )}
                </div>
            </nav>

            <span className="divider"></span>
        </>
    );
};

export default Nav;
