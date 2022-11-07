import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { HiOutlineX } from "react-icons/hi";
import { registerUser } from "../../../Services/auth.service";
import { BiChevronDown, BiChevronRight } from "react-icons/bi";
import { useNavigate } from "react-router-dom";


const NewUsrModal = ({ showModal, setShowModal }: any) => {
    const [showPassNote, setShowPassNote] = useState(false);
    const navigate = useNavigate();

    function closeHandler() {
        setShowModal((prev: any) => !prev);
    }

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data: any) => {
        data.password = data.username;
        data.passconf = data.username;

        // console.log(data);

        const success = await registerUser(data);
        setShowModal((prev: any) => !prev);

        if (success) {
            navigate("/dashboard", { state: "User was successfully created!" });
            window.location.reload();
        } else {
            navigate("/dashboard", { state: "Failed to create user." });
            window.location.reload();
        }
    };

    return (
        <>
            {showModal && (
                <div className="inputModalBody">
                    {/* TOP */}
                    <HiOutlineX
                        className="closeWndw"
                        onClick={closeHandler}
                    />

                    {/* CONTENT */}
                    <div className="formContainer">
                        <form
                            className="formFlexbox"
                            action=""
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <input
                                className="inputField"
                                type="text"
                                id="name"
                                placeholder="name"
                                {...register("name", { required: true })}
                                aria-label={"name of user"}
                            />

                            <input
                                className="inputField"
                                type="email"
                                id="email"
                                placeholder="email"
                                {...register("email", {
                                    required: true,
                                    pattern:
                                    /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                                })}
                                aria-label={"user email"}
                            />

                            <input
                                className="inputField"
                                type="text"
                                id="username"
                                placeholder="username"
                                {...register("username", {
                                    required: true,
                                    maxLength: 10,
                                })}
                                aria-label={"username of user"}
                            />
                            {errors.username && (
                                <p className="msg warning">
                                    Please choose a username
                                </p>
                            )}

                            <input
                                className="btn"
                                type="submit"
                                value="create user"
                                aria-label={"submit"}
                            />
                        </form>
                        <div
                            className="note"
                            onClick={() => setShowPassNote((prev) => !prev)}
                        >
                            <div className="flex items-center">
                                {showPassNote ? (
                                    <BiChevronDown className="text-sky-700" />
                                ) : (
                                    <BiChevronRight className="text-sky-700" />
                                )}

                                <span className="">Where is the password?</span>
                            </div>

                            {showPassNote && (
                                <span className="text-slate-400">
                                    The Password will automatically be the same
                                    as the username, and the user will have to
                                    change it in their userpage on the first
                                    login.
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default NewUsrModal;
