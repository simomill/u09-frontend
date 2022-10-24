import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { HiOutlineX } from "react-icons/hi";
import { IoWarningOutline } from "react-icons/io5";
import * as Yup from "yup";
import { registerUser } from "../../Services/auth.service";
import { BiChevronDown, BiChevronRight } from "react-icons/bi";

const NewUsrModal = ({ showModal, setShowModal }: any) => {
    const [statusMsg, setStatusMsg] = useState("");
    const [showPassNote, setShowPassNote] = useState(false);

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
            setStatusMsg("User successfully created");
            window.location.reload();
        } else {
            setStatusMsg("Failed to create user");
        }
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
                        <form
                            className="flex flex-col py-3"
                            action=""
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <input
                                className="border rounded py-2 px-3 mb-3"
                                type="text"
                                id="name"
                                placeholder="name"
                                {...register("name", { required: true })}
                            />

                            <input
                                className="border rounded py-2 px-3 mb-3"
                                type="email"
                                id="email"
                                placeholder="email"
                                {...register("email", {
                                    required: true,
                                    pattern:
                                        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                })}
                            />

                            <input
                                className="border rounded py-2 px-3 mb-3"
                                type="text"
                                id="username"
                                placeholder="username"
                                {...register("username", {
                                    required: true,
                                    maxLength: 10,
                                })}
                            />
                            {errors.username && (
                                <p className="text-red-700">
                                    Please choose a username
                                </p>
                            )}

                            <input
                                className="border rounded py-2 px-3 bg-slate-50 cursor-pointer "
                                type="submit"
                                value="create user"
                            />
                        </form>
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
