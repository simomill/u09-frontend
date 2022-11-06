import React from "react";
import { changeUserRole } from "../../../Services/user.service";
import { HiOutlineX } from "react-icons/hi";
import { GrUserAdmin } from "react-icons/gr";
import { useNavigate } from "react-router-dom";

const AdminAssignModal = ({ showModal, setShowModal, userName }: any) => {
    const navigate = useNavigate();

    function closeHandler() {
        setShowModal((prev: any) => !prev);
    }

    function onApprove() {

        const currentRole = {
            isAdmin: userName.isAdmin
        }

        changeUserRole(userName._id, currentRole);

        window.location.reload();
        navigate("/dashboard", {
            state: "User role was successfully updated!",
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
                        <GrUserAdmin className="w-8 h-8 mb-3" />

                        <div className="px-8">
                            <p>
                                You are about to {userName.isAdmin > 0 ? "downgrade" : "upgrade"}{" "}
                                <span className="font-medium">{userName.username}'s</span>{" "}
                                role.
                            </p>
                            <p>Are you sure about this?</p>
                        </div>
                    </div>

                    <div className="yesNoGroup">
                        <button
                            onClick={onApprove}
                            className="yesNoBtn"
                        >
                            Yes
                        </button>
                        <button
                            onClick={onDeny}
                            className="yesNoBtn"
                        >
                            No
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default AdminAssignModal;
