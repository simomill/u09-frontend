import React, { useEffect, useState } from "react";
import { HiOutlineX } from "react-icons/hi";
import { BiChevronDown, BiChevronRight } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { updateUser } from "../../../Services/user.service";
import { IUserModel } from "../../../Models";

function UpdateUsrModal({
    showModal,
    setShowModal,
    userName,
    setUserName,
    userArray,
}: any) {
    // STATES AND VARIABLES
    const [showPassNote, setShowPassNote] = useState(false);
    const [user, setUser] = useState<IUserModel>(userName ?? null);
    const { username } = user;
    const [newName, setNewName] = useState("");
    const [newUsername, setNewUsername] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [notAvailable, setNotAvailable] = useState("");
    const navigate = useNavigate();

    // When closing the window, 
    // all the changed values should be forgotten.
    function closeHandler() {
        setNewName("");
        setNewUsername("");
        setNewEmail("");
        setNotAvailable("");

        setShowModal((prev: any) => !prev);
    }

    // When submitting the form, only the edited fields should be updated.
    // The window should then closed, and there should be feedback about the
    // requested update.
    const onSubmit = async (event: any) => {
        event.preventDefault();

        const obj: any = {};
        const userId = userName._id;

        newName ? (obj.name = newName) : (obj.name = userName.name);

        newUsername
            ? (obj.username = newUsername)
            : (obj.username = userName.username);

        newEmail ? (obj.email = newEmail) : (obj.email = userName.email);

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

    useEffect(() => {
        if (userName) {
            setUser(userName);
        }

        // If someone else has the chosen new username,
        // it should be unavailable.
        if (userArray && newUsername) {
            if (
                userArray.every((user: any) => {
                    return user.username !== newUsername;
                })
            ) {
                setNotAvailable("");
            } else if (username === newUsername) {
                setNotAvailable("");
            } else {
                setNotAvailable("Username is occupied!");
            }
        }
    }, [newUsername, userArray, userName, username]);

    

    return (
        <>
            {showModal && (
                <div className="inputModalBody">
                    <HiOutlineX
                        className="w-6 h-6 self-start cursor-pointer hover:text-red-700"
                        onClick={closeHandler}
                    />

                    <div className="formContainer">
                        {userName && (
                            <form
                                className="formFlexbox"
                                action=""
                                onSubmit={onSubmit}
                            >
                                <input
                                    className="inputField"
                                    type="text"
                                    id="name"
                                    placeholder="name"
                                    defaultValue={userName.name}
                                    onChange={(e) => setNewName(e.target.value)}
                                    aria-label="name of user"
                                />

                                <input
                                    className="inputField"
                                    type="email"
                                    id="email"
                                    placeholder="email"
                                    defaultValue={userName.email}
                                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                                    onChange={(e) =>
                                        setNewEmail(e.target.value)
                                    }
                                    aria-label="user email"
                                />

                                <input
                                    className="inputField"
                                    type="text"
                                    id="username"
                                    placeholder="username"
                                    defaultValue={userName.username}
                                    onChange={(e) =>
                                        setNewUsername(e.target.value)
                                    }
                                    aria-label="username of user"
                                />

                                <input
                                    className={
                                        notAvailable
                                            ? " disabled"
                                            : "bg-slate-50 btn"
                                    }
                                    type="submit"
                                    value="update user"
                                    disabled={!!notAvailable}
                                    aria-label="submit"
                                />

                                {notAvailable && (
                                    <p className="msg warning">
                                        {notAvailable}
                                    </p>
                                )}
                            </form>
                        )}

                        <div
                            className="note"
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
}

export default UpdateUsrModal;
