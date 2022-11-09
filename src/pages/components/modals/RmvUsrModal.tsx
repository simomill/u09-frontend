import React from 'react';
import { deleteUser } from '../../../Services/user.service';
import { HiOutlineX } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { AiOutlineUserDelete } from 'react-icons/ai';

const RemoveUsrModal = ({ showModal, setShowModal, userName }: any) => {
    const navigate = useNavigate();

    function closeHandler() {
        setShowModal((prev: any) => !prev);
    }

    function onApprove() {
        deleteUser(userName);

        window.location.reload();
        navigate('/dashboard', {
            state: 'User was successfully deleted!',
        });
    }

    function onDeny() {
        setShowModal((prev: any) => !prev);
    }

    return (
        <>
            {showModal && (
                <div className="modalQ">
                    <HiOutlineX
                        className="closeWndw"
                        onClick={closeHandler}
                    />

                    <div className="flex flex-col items-center">
                        <AiOutlineUserDelete className="w-8 h-8 mb-3" />

                        <div className="px-8">
                            <p>
                                You are about to delete{' '}
                                <span className="font-medium">
                                    {userName}
                                </span>
                                .
                            </p>
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

export default RemoveUsrModal;
