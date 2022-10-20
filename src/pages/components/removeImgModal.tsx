import React from "react";
import { deleteUserPhoto } from "../../Services/user.service";

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
                <div className=" bottom-1/2 w-96 h-56 bg-white border rounded-lg flex flex-col justify-between center p-2 sticky">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 cursor-pointer hover:text-red-700"
                        onClick={closeHandler}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                            className=""
                        />
                    </svg>

                    <div className="flex flex-col items-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6 mb-3 text-red-700"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                            />
                        </svg>

                        <p>You are about to delete this image.</p>
                        <p>Are you sure about this?</p>
                    </div>

                    <div className="flex flex-row w-full gap-2 justify-center">
                        <button
                            onClick={onApprove}
                            className="border rounded w-max px-5 bg-slate-50 cursor-pointer hover:border-sky-200 hover:bg-sky-50 w-1/2">
                            Yes
                        </button>
                        <button
                            onClick={onDeny}
                            className="border rounded w-max px-5 bg-slate-50 cursor-pointer hover:border-sky-200 hover:bg-sky-50 w-1/2">
                            No
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default RemoveImgModal;
