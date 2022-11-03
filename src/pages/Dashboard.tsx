import React, { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logout } from "../Services/auth.service";
import { getAllUsers } from "../Services/user.service";
import { BsFillPencilFill, BsTrashFill } from "react-icons/bs";
import { ImPlus } from "react-icons/im";
import { BsFillKeyFill } from "react-icons/bs";
import RemoveUsrModal from "./components/removeUsrModal";
import NewUsrModal from "./components/NewUsrModal";
import UpdateUsrModal from "./components/UpdateUsrModal";
import AdminAssignModal from "./components/AdminAssignModal";
import { AiFillHome } from "react-icons/ai";

const Dashboard = () => {
    const navigate = useNavigate();
    const [profileMenu, setProfileMenu] = useState(false);
    const initialArray: any[] | (() => any[]) = [];
    const [userArray, setUserArray] = useState<any[] | null>(null);
    const [userName, setUserName] = useState<object | string>("");
    const [showRemoveModal, setShowRemoveModal] = useState(false);
    const [showNewUsrModal, setShowNewUsrModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showAdminModal, setShowAdminModal] = useState(false);
    const [findings, setFindings] = useState(initialArray);
    const [searchVal, setSearchVal] = useState("");
    const { state } = useLocation();
    const [statusMsg, setStatusMsg] = useState(state ?? "");
    const authRole = localStorage.getItem("isAdmin");

    function onClickLogout() {
        logout();
        navigate("/login");
        window.location.reload();
    }

    const onClickProfile = () => {
        profileMenu ? setProfileMenu(false) : setProfileMenu(true);
    };

    const onRemove = (username: string) => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        setShowRemoveModal((prev) => !prev);
        setUserName(username);
    };

    const onMakeAdmin = (user: any) => {
        // console.log(user);

        setUserName(user);
        window.scrollTo({ top: 0, behavior: "smooth" });
        setShowAdminModal((prev) => !prev);
    };

    const onEdit = (user: object) => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        setUserName(user);
        setShowEditModal((prev) => !prev);
    };

    const onAdd = () => {
        setShowNewUsrModal((prev) => !prev);
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

    async function fetchUsers() {
        const response = await getAllUsers();

        if (response) {
            console.log(response);
            setUserArray(response);
        }
    }

    useEffect(() => {
        if (userArray?.length === 0) {
            fetchUsers();
        }

        if (statusMsg) {
            setTimeout(() => {
                setStatusMsg("");
            }, 4000);
        }

        if (!searchVal) {
            setFindings([]);
        }
    }, [searchVal, statusMsg, userArray?.length]);

    return (
        <div className="h-screen py-6 px-2 items-center flex flex-col bg-gray-100 relative">
            {/* Nav */}
            <nav className="flex flex-row gap-2 justify-center items-center">
                <Link to={"/"}>
                    <AiFillHome className="w-6 h-6 text-slate-800 hover:text-slate-600" />
                </Link>

                <div className="flex flex-row border border-gray-300 rounded-lg mx-3 w-min p-2 items-center bg-white">
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
                                to={`/user/${user}`}
                            >
                                <p className="font-medium py-2">{user}</p>
                            </Link>
                        ))}
                    </div>
                )}

                <div
                    onClick={onClickProfile}
                    className="rounded-full w-4 h-4 p-4 bg-slate-500 border border-gray-500 relative cursor-pointer"
                >
                    <div
                        className={
                            profileMenu
                                ? "absolute w-min h-min shadow-md rounded-lg py-4 z-20 bg-white -left-10 top-5 mt-6 flex flex-col items-center gap-4"
                                : "absolute w-60 h-min shadow-md rounded-lg py-2 z-20 bg-white left-0 top-0 mt-6 hidden aria-hidden"
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
                {statusMsg && <p className="text-green-500">{statusMsg}</p>}
                {userArray?.map((user, index) => (
                    <div
                        key={index}
                        className="flex bg-white border border-gray-200 rounded justify-between"
                    >
                        <div
                            className="flex items-start flex-col p-3 hover:text-sky-400 cursor-pointer"
                            onClick={() => navigate(`/user/${user.username}`)}
                        >
                            <p className="font-medium">{user.username}</p>
                            <p>{user.email}</p>
                            <p>
                                {user.isAdmin > 1
                                    ? "Superadmin"
                                    : user.isAdmin > 0
                                    ? "Admin"
                                    : "User"}
                            </p>
                        </div>

                        {(() => {
                            if (authRole && authRole > user.isAdmin)
                                return (
                                    <div className="flex justify-center border-l border-gray-200">
                                        {user.isAdmin !== 2 && (
                                            <div className="flex items-center border-r border-gray-200 px-4">
                                                <BsFillKeyFill
                                                    onClick={() =>
                                                        onMakeAdmin(user)
                                                    }
                                                    className="w-6 h-6 text-sky-900 cursor-pointer hover:text-slate-400"
                                                />
                                            </div>
                                        )}
                                        <div className="flex items-center border-r border-gray-200 px-4">
                                            <BsFillPencilFill
                                                className="w-6 h-6 text-sky-900 cursor-pointer hover:text-slate-400"
                                                onClick={() => onEdit(user)}
                                            />
                                        </div>

                                        <div className="flex items-center px-4">
                                            <BsTrashFill
                                                className="w-6 h-6 text-sky-900 hover:text-red-900 cursor-pointer"
                                                onClick={() =>
                                                    onRemove(user.username)
                                                }
                                            />
                                        </div>
                                    </div>
                                );
                        })()}
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

            <UpdateUsrModal
                showModal={showEditModal}
                setShowModal={setShowEditModal}
                userName={userName}
                setUserName={setUserName}
                setStatusMsg={setStatusMsg}
                statusMsg={statusMsg}
                userArray={userArray}
            />

            <AdminAssignModal
                userName={userName}
                setUserName={setUserName}
                showModal={showAdminModal}
                setShowModal={setShowAdminModal}
            />
        </div>
    );
};

export default Dashboard;
