import React from 'react';
import { HiOutlineX } from 'react-icons/hi';
import { deleteComment } from '../../../Services/comment.service';
import { BiCommentX } from 'react-icons/bi';

const RemoveCmntModal = ({
    showModal,
    setShowModal,
    id,
    fetchComments,
}: any) => {
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
                <div className="modalQ">
                    <HiOutlineX className="closeWndw" onClick={closeHandler} />

                    <div className="flex flex-col items-center">
                        <BiCommentX className="w-8 h-8 mb-3" />

                        <div className="px-8">
                            <p>You are about to delete this comment.</p>
                            <p>Are you sure about this?</p>
                        </div>
                    </div>

                    <div className="yesNoGroup">
                        <button
                            onClick={onApprove}
                            className="bg-slate-50 yesNoBtn"
                        >
                            Yes
                        </button>
                        <button
                            onClick={onDeny}
                            className="bg-slate-50 yesNoBtn"
                        >
                            No
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default RemoveCmntModal;
