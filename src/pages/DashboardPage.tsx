import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getAllUsers } from "../Services/user.service";
import { BsFillPencilFill, BsTrashFill } from "react-icons/bs";
import { ImPlus } from "react-icons/im";
import { BsFillKeyFill } from "react-icons/bs";
import RemoveUsrModal from "./components/modals/RmvUsrModal";
import NewUsrModal from "./components/modals/NewUsrModal";
import UpdateUsrModal from "./components/modals/UpdateUsrModal";
import AdminAssignModal from "./components/modals/AdminAssignModal";
import Loader from "./components/LoaderComponent";
import Nav from "./components/NavigationComponent";

const Dashboard = () => {
    // --------------------STATES AND NAVIGATION
    const navigate = useNavigate();
    const pageId = useLocation().pathname;
    const initialArray: any[] | (() => any[]) = [];
    const [userArray, setUserArray] = useState<any[] | null>(null);
    const [userName, setUserName] = useState<object | string>("");
    const [showRemoveModal, setShowRemoveModal] = useState(false);
    const [showNewUsrModal, setShowNewUsrModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showAdminModal, setShowAdminModal] = useState(false);
    const [findings, setFindings] = useState(initialArray);
    const [searchVal, setSearchVal] = useState("");
    const { state } = useLocation();
    const [statusMsg, setStatusMsg] = useState(state ?? "");
    const authRole = localStorage.getItem("isAdmin");
    const [isLoading, setIsLoading] = useState(false);

    // --------OPEN MODAL HANDLERS
    const onRemove = (username: string) => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        setShowRemoveModal((prev) => !prev);
        setUserName(username);
    };

    const onMakeAdmin = (user: any) => {
        setUserName(user);
        window.scrollTo({ top: 0, behavior: "smooth" });
        setShowAdminModal((prev) => !prev);
    };

    const onEdit = (user: object) => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        setUserName(user);
        setShowEditModal((prev) => !prev);
    };

    const onAdd = () => {
        setShowNewUsrModal((prev) => !prev);
    };


    // -------------------FUNCTIONS
    async function fetchUsers() {
        const response = await getAllUsers();

        if (response) {
            setUserArray(response.data);
        }
    }

    useEffect(() => {
        // Users should be fetched from the database,
        // if they havent already been so
        if (userArray === null) {
            setIsLoading(true);
            fetchUsers();
        } else {
            setIsLoading(false);
        }

        if (statusMsg) {
            setTimeout(() => {
                setStatusMsg("");
            }, 4000);
        }

    }, [statusMsg, userArray]);

    return (
        <div className="dashContainer">
            <Nav userArray={userArray} isAdmin={authRole} pageId={pageId} />

            <div className="usersFlexbox">
                {isLoading && <Loader />}

                <h1 className="h1">Users</h1>

                {statusMsg && <p className="msg success">{statusMsg}</p>}

                {/* 
                    If there are users, they should be displayed.
                */}

                {userArray?.map((user, index) => (
                    <div key={index} className="card">
                        <div
                            className="userInfo"
                            onClick={() => navigate(`/user/${user.username}`)}
                        >
                            <p className="font-medium">{user.username}</p>
                            <p>{user.email}</p>
                            <p>
                                {user.isAdmin > 1
                                    ? "Superadmin"
                                    : user.isAdmin > 0
                                    ? "Admin"
                                    : "User"}
                            </p>
                        </div>

                        {/* 
                            Admins should only be able to crud users 
                            with a lower "rank" than themselves.
                        */}

                        {(() => {
                            if (authRole && authRole > user.isAdmin)
                                return (
                                    <div className="actionButtons">
                                        <div className="action rBorder">
                                            <BsFillKeyFill
                                                onClick={() =>
                                                    onMakeAdmin(user)
                                                }
                                                className="actionIcon"
                                            />
                                        </div>

                                        <div className="action rBorder">
                                            <BsFillPencilFill
                                                className="actionIcon"
                                                onClick={() => onEdit(user)}
                                            />
                                        </div>

                                        <div className="action">
                                            <BsTrashFill
                                                className="actionIcon"
                                                onClick={() =>
                                                    onRemove(user.username)
                                                }
                                            />
                                        </div>
                                    </div>
                                );
                        })()}
                    </div>
                ))}
                <ImPlus
                    className={
                        showNewUsrModal
                            ? "plusIcon plusActive"
                            : "plusIcon"
                    }
                    onClick={onAdd}
                />
            </div>

            <RemoveUsrModal
                userName={userName}
                showModal={showRemoveModal}
                setShowModal={setShowRemoveModal}
            />

            <NewUsrModal
                showModal={showNewUsrModal}
                setShowModal={setShowNewUsrModal}
            />

            <UpdateUsrModal
                showModal={showEditModal}
                setShowModal={setShowEditModal}
                userName={userName}
                setUserName={setUserName}
                setStatusMsg={setStatusMsg}
                statusMsg={statusMsg}
                userArray={userArray}
            />

            <AdminAssignModal
                userName={userName}
                setUserName={setUserName}
                showModal={showAdminModal}
                setShowModal={setShowAdminModal}
            />
        </div>
    );
};

export default Dashboard;
