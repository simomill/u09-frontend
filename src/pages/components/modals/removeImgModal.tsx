import React from "react";
import { deleteUserPhoto } from "../../../Services/user.service";
import { HiOutlineX } from "react-icons/hi";
import { IoWarningOutline } from "react-icons/io5";

const RemoveImgModal = ({ showModal, setShowModal, id }: any) => {
    function closeHandler() {
        setShowModal((prev: any) => !prev);
    }

    function onApprove() {
        deleteUserPhoto(id);
        window.location.reload();
    }

    function onDeny() {
        setShowModal((prev: any) => !prev);
    }

    return (
        <>
            {showModal && (
                <div className="absolute h-full w-full flex items-center justify-center">
                    <div className=" w-96 h-56 bg-white border rounded-lg flex flex-col justify-between p-2">
                        <HiOutlineX
                            className="w-6 h-6 cursor-pointer hover:text-red-700"
                            onClick={closeHandler}
                        />

                        <div className="flex flex-col items-center">
                            <IoWarningOutline className="w-6 h-6 mb-3 text-red-700" />

                            <p>You are about to delete this image.</p>
                            <p>Are you sure about this?</p>
                        </div>

                        <div className="flex flex-row w-full gap-2 justify-center">
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
                </div>
            )}
        </>
    );
};

export default RemoveImgModal;
