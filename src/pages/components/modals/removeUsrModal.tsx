import React from "react";
import { deleteUser } from "../../Services/user.service";
import { HiOutlineX } from "react-icons/hi";
import { IoWarningOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { AiOutlineUserDelete } from "react-icons/ai";

const RemoveUsrModal = ({ showModal, setShowModal, userName }: any) => {
    const navigate = useNavigate();

    function closeHandler() {
        setShowModal((prev: any) => !prev);
    }

    function onApprove() {
        deleteUser(userName);

        window.location.reload();
        navigate("/dashboard", { state: "User was successfully deleted!" });
    }

    function onDeny() {
        setShowModal((prev: any) => !prev);
    }

    return (
        <>
            {showModal && (
                <div className="top-60 h-56 bg-white border rounded-lg flex flex-col justify-between p-2 absolute drop-shadow-md">
                    <HiOutlineX
                        className="w-6 h-6 cursor-pointer hover:text-red-700"
                        onClick={closeHandler}
                    />

                    <div className="flex flex-col items-center">
                        <AiOutlineUserDelete className="w-8 h-8 mb-3" />

                        <div className="px-8">
                            <p>
                                You are about to delete{" "}
                                <span className="font-medium">{userName}</span>.
                            </p>
                            <p>Are you sure about this?</p>
                        </div>
                    </div>

                    <div className="flex flex-row w-full gap-2 justify-center py-2 px-6">
                        <button
                            onClick={onApprove}
                            className="border rounded w-max px-5 bg-slate-50 cursor-pointer hover:border-sky-200 hover:bg-sky-50 w-1/2"
                        >
                            Yes
                        </button>
                        <button
                            onClick={onDeny}
                            className="border rounded w-max px-5 bg-slate-50 cursor-pointer hover:border-sky-200 hover:bg-sky-50 w-1/2"
                        >
                            No
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default RemoveUsrModal;
