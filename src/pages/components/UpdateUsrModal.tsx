import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { HiOutlineX } from "react-icons/hi";
import { IoWarningOutline } from "react-icons/io5";
import * as Yup from "yup";
import { registerUser } from "../../Services/auth.service";
import { BiChevronDown, BiChevronRight } from "react-icons/bi";
import { UserInfo } from "os";
import { EventEmitter } from "stream";
import { updateUser } from "../../Services/user.service";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

interface IUserModel {
    name: string | null;
    username: string | null;
    email: string | null;
}

const UpdateUsrModal = ({
    showModal,
    setShowModal,
    userName,
    setUserName,
    userArray,
}: any) => {
    const [statusMsg, setStatusMsg] = useState("");
    const [showPassNote, setShowPassNote] = useState(false);
    const [user, setUser] = useState<IUserModel>(userName ?? null);
    const { username, name, email } = user;
    const [newName, setNewName] = useState("");
    const [newUsername, setNewUsername] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [notAvailable, setNotAvailable] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (userName) {
            setUser(userName);
        }

        if (userArray && newUsername) {
            if (
                userArray.every((user: any) => {
                    return user.username !== newUsername;
                })
            ) {
                setNotAvailable("");
            } else {
                if (username === newUsername) {
                    setNotAvailable("");
                } else {
                    setNotAvailable("Username is occupied!");
                }    
            }
        }
    }, [newUsername, userArray, userName, username]);

    function closeHandler() {
        setNewName("");
        setNewUsername("");
        setNewEmail("");
        setNotAvailable("");

        setShowModal((prev: any) => !prev);
    }

    const onSubmit = async (event: any) => {
        event.preventDefault();

        let obj: any = {};
        const userId = userName._id;

        newName ? (obj.name = newName) : (obj.name = userName.name);

        newUsername
            ? (obj.username = newUsername)
            : (obj.username = userName.username);

        newEmail ? (obj.email = newEmail) : (obj.email = userName.email);

        console.log(obj);

        const success = await updateUser(obj, userId);

        if (success) {
            window.location.reload();
            navigate("/dashboard", { state: "User was successfully updated!" });
        } else {
            window.location.reload();
            navigate("/dashboard", { state: "Failed to update user." });
        }

        setNewName("");
        setNewUsername("");
        setNewEmail("");
        setNotAvailable("");

        setShowModal((prev: any) => !prev);
    };

    return (
        <>
            {showModal && (
                <div className="m-3 top-60 bg-white border rounded-lg flex flex-col justify-between p-2 absolute drop-shadow-md">
                    {/* TOP */}
                    <HiOutlineX
                        className="w-6 h-6 self-start cursor-pointer hover:text-red-700"
                        onClick={closeHandler}
                    />

                    {/* CONTENT */}
                    <div className="flex flex-col items-center px-5 pt-4">
                        {userName && (
                            <form
                                className="flex flex-col py-3"
                                action=""
                                onSubmit={onSubmit}
                            >
                                <input
                                    className="border rounded py-2 px-3 mb-3"
                                    type="text"
                                    id="name"
                                    placeholder="name"
                                    defaultValue={userName.name}
                                    onChange={(e) => setNewName(e.target.value)}
                                />

                                <input
                                    className="border rounded py-2 px-3 mb-3"
                                    type="email"
                                    id="email"
                                    placeholder="email"
                                    defaultValue={userName.email}
                                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                                    onChange={(e) =>
                                        setNewEmail(e.target.value)
                                    }
                                />

                                <input
                                    className="border rounded py-2 px-3 mb-3"
                                    type="text"
                                    id="username"
                                    placeholder="username"
                                    defaultValue={userName.username}
                                    onChange={(e) =>
                                        setNewUsername(e.target.value)
                                    }
                                />

                                <input
                                    className={
                                        notAvailable
                                            ? "border rounded py-2 px-3 bg-slate-50 opacity-60"
                                            : "border rounded py-2 px-3 bg-slate-50 cursor-pointer "
                                    }
                                    type="submit"
                                    value="update user"
                                    disabled={notAvailable ? true : false}
                                />

                                {notAvailable && (
                                    <p className="text-red-700 pt-3">
                                        {notAvailable}
                                    </p>
                                )}
                            </form>
                        )}

                        <div
                            className="flex flex-col gap-2 mx-6 p-3 items-center justify-center my-4 italic text-left text-sky-700"
                            onClick={() => setShowPassNote((prev) => !prev)}
                        >
                            <div className="flex items-center">
                                {showPassNote ? (
                                    <BiChevronDown className="inline text-sky-700" />
                                ) : (
                                    <BiChevronRight className="text-sky-700" />
                                )}

                                <span className="">Where is the password?</span>
                            </div>

                            {showPassNote && (
                                <span className="text-slate-400">
                                    You cannot change users passwords. They have
                                    to change it themselves in their userpage
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default UpdateUsrModal;
