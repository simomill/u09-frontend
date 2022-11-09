import React from 'react';
import { deleteUserPhoto } from '../../../Services/user.service';
import { HiOutlineX } from 'react-icons/hi';
import { IoWarningOutline } from 'react-icons/io5';

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
                <div className="modalQ">
                    <HiOutlineX className="closeWndw" onClick={closeHandler} />

                    <div className="centerColumn">
                        <IoWarningOutline className="w-6 h-6 mb-3 text-red-700" />

                        <p>You are about to delete this image.</p>
                        <p>Are you sure about this?</p>
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

export default RemoveImgModal;
