import React from "react";
import { deleteUser } from "../../../Services/user.service";
import { HiOutlineX } from "react-icons/hi";
import { IoWarningOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { AiOutlineUserDelete } from "react-icons/ai";
import { deleteComment } from "../../../Services/comment.service";
import { BiCommentX } from "react-icons/bi";

const RemoveCmntModal = ({ showModal, setShowModal, id, fetchComments }: any) => {
    const navigate = useNavigate();

    function closeHandler() {
        setShowModal((prev: any) => !prev);
    }

    function onApprove() {
        deleteComment(id).then(() => {
            fetchComments();
        });
        setShowModal((prev: any) => !prev);
    }

    function onDeny() {
        setShowModal((prev: any) => !prev);
    }

    return (
        <>
            {showModal && (
                <div className="absolute h-full w-full flex items-center">
                    <div className="bg-white border rounded-lg flex flex-col justify-between p-2 drop-shadow-md z-10">
                        <HiOutlineX
                            className="w-6 h-6 cursor-pointer hover:text-red-700"
                            onClick={closeHandler}
                        />

                        <div className="flex flex-col items-center">
                            <BiCommentX className="w-8 h-8 mb-3" />

                            <div className="px-8">
                                <p>You are about to delete this comment.</p>
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
                </div>
            )}
        </>
    );
};

export default RemoveCmntModal;
