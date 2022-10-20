import React, { FC, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getUser, getUserPhotos } from "../Services/user.service";
import RemoveImgModal from "./components/removeImgModal";
import UploadModal from "./components/uploadModal";

const UserPage: FC = () => {
    // STATES AND VARIABLES
    const [userEmail, setUserEmail] = useState("");
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [showRemove, setShowRemove] = useState<null | number>(null);
    const [showRemoveModal, setShowRemoveModal] = useState(false);
    const [imageId, setImageId] = useState("");
    const initialArray: any[] | (() => any[]) = [];
    const [photoArray, setPhotoArray]: any[] = useState(initialArray);
    const pageName = useParams().id;
    const authedUser = localStorage.getItem("username");

    // FUNCTION FOR OPEN-/CLOSING THE UPLOAD MODAL
    const openModal = () => {
        setShowUploadModal((prev) => !prev);
    };

    // FUNCTION FOR DELETING THE CLICKED IMAGE
    function onDeleteImg(id: string) {
        setImageId(id);
        setShowRemoveModal((prev) => !prev);
    }

    function onShowRemove(index: number) {
        if (pageName === authedUser) {
            setShowRemove(index);
        }
    }

    useEffect(() => {
        // FUNCTION FOR FETCHING THE DATA OF USER CORRESPONDING TO THE PAGE NAME
        async function fetchData() {
            const response = await getUser(pageName ?? "");

            if (response.email) {
                setUserEmail(response.email);
            }
        }

        // FUNCTION FOR FETCHING THE PHOTOS OF USER CORRESPONDING TO THE PAGE NAME
        async function fetchPhotos() {
            const response = await getUserPhotos(pageName ?? "");

            setPhotoArray(response);
        }

        if (!userEmail) {
            fetchData();
        }

        fetchPhotos();
    }, [pageName, photoArray.length, userEmail, userEmail.length]);

    return (
        <div className="flex flex-col">
            {/* -------------------------TOP/NAV SECTION */}
            <div className="md:px-24 lg:px-36 px-3 py-4">
                <Link className="flex flex-row hover:text-cyan-700" to="/">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 19.5L8.25 12l7.5-7.5"
                        />
                    </svg>
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

                {authedUser === pageName && (
                    <>
                        <button onClick={openModal}>Upload</button>

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
            <div className="flex flex-wrap">
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
                                        <p>{photoArray[index].title}</p>
                                        <img
                                            alt={photoArray[index].title}
                                            src={`data:image/jpeg;base64, ${photoArray[index].img.data}`}
                                            onMouseOver={() =>
                                                onShowRemove(index)
                                            }
                                        />

                                        {showRemove === index && (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                className="w-5 h-5 cursor-pointer self-start absolute top-10 right-11 m-3 bg-white border rounded"
                                                onClick={() =>
                                                    onDeleteImg(
                                                        photoArray[index]._id
                                                    )
                                                }
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M6 18L18 6M6 6l12 12"
                                                    className="text-red-700"
                                                />
                                            </svg>
                                        )}

                                        {imageId === photoArray[index]._id && (
                                            <RemoveImgModal
                                                id={imageId}
                                                showModal={showRemoveModal}
                                                setShowModal={
                                                    setShowRemoveModal
                                                }
                                            />
                                        )}
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
