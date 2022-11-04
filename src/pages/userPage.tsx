import React, { FC, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getUser, getUserPhotos } from "../Services/user.service";
import { FaChevronLeft } from "react-icons/fa";
import { AiOutlinePlusSquare } from "react-icons/ai";
import Post from "./components/post";
import UploadModal from "./components/uploadModal";
import Loader from "./Loader";
import { setLocale } from "yup";

const UserPage: FC = () => {
    // STATES AND VARIABLES
    const [userEmail, setUserEmail] = useState("");
    const [showUploadModal, setShowUploadModal] = useState(false);
    const initialArray: any[] | (() => any[]) = [];
    const [photoArray, setPhotoArray]: any[] = useState(initialArray);
    const [hasAccess, setHasAccess] = useState(false);
    const pageName = useParams().id;
    const authedUser = localStorage.getItem("username");
    const [isLoading, setIsLoading] = useState(false);

    // FUNCTION FOR OPEN-/CLOSING THE UPLOAD MODAL
    const openModal = () => {
        setShowUploadModal((prev) => !prev);
    };

    useEffect(() => {
        if (pageName === authedUser) {
            setHasAccess(true);
        }

        // FUNCTION FOR FETCHING THE DATA OF USER CORRESPONDING TO THE PAGE NAME
        async function fetchData() {
            const response = await getUser(pageName ?? "");

            if (response.email) {
                setUserEmail(response.email);
            }
        }

        // FUNCTION FOR FETCHING THE PHOTOS OF USER CORRESPONDING TO THE PAGE NAME
        async function fetchPhotos() {
            setIsLoading(true);
            const response = await getUserPhotos(pageName ?? "");

            setPhotoArray(response);
        }

        if (!userEmail) {
            fetchData();
        }

        if (photoArray.length === 0) {
            setIsLoading(true);
            fetchPhotos();
        } else {
            setIsLoading(false);
        }
    }, [authedUser, pageName, userEmail, photoArray.length]);

    return (
        <div className="flex flex-col">
            {/* -------------------------TOP/NAV SECTION */}
            <div className="md:px-24 lg:px-36 px-3 py-4">
                <Link
                    className="flex flex-row items-center hover:text-cyan-700"
                    to="/"
                >
                    <FaChevronLeft />
                    <span>Back</span>
                </Link>
            </div>

            <span className="w-full h-px border-b border-gray-200"></span>

            {/* ----------------------------BIO SECTION */}
            <div className="md:px-24 lg:px-36 px-3 py-4 flex flex-row gap-6 items-center justify-around">
                <div className="rounded-full w-6 h-6 p-6 bg-slate-500 border border-gray-500 ml-5 relative cursor-pointer"></div>

                <div className="flex flex-col items-start">
                    <p>{pageName}</p>
                    <p>{userEmail}</p>
                </div>

                {/* ENABLE PHOTO UPLOAD IFF IT IS YOUR OWN PAGE */}

                {hasAccess && (
                    <>
                        <AiOutlinePlusSquare
                            className="w-6 h-6 cursor-pointer"
                            onClick={openModal}
                        />

                        {/* ----------------------------MODAL COMPONENT */}
                        {showUploadModal && (
                            <UploadModal
                                showModal={showUploadModal}
                                setShowModal={setShowUploadModal}
                            />
                        )}
                    </>
                )}
            </div>

            <span className="w-full h-px border-b border-gray-200"></span>
            
            
            {/* --------------------------------GALLERY SECTION */}
            <div className={photoArray.length ? "flex flex-wrap" : "flex flex-col justify-center items-center h-screen "}>
                
            {isLoading && <Loader />}
                {/* IF THERE ARE PHOTOS, THEN LOOP OVER THEM */}
                {(() => {
                    if (photoArray.length > 0) {
                        return (
                            <>
                                {photoArray.map((item: any, index: number) => (
                                    <div
                                        className="w-full flex flex-col items-center relative"
                                        key={index}
                                    >
                                        <Post photo={photoArray[index]} />
                                        <span className="w-full h-px border-b border-gray-200"></span>
                                    </div>
                                ))}
                            </>
                        );
                    }
                })()}
            </div>
        </div>
    );
};

export default UserPage;
