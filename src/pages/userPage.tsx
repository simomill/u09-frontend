import axios from "axios";
import React, { FC, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getUser, getUserPhotos } from "../Services/user.service";
import UploadModal from "./components/uploadModal";

const UserPage: FC = () => {
    const [userEmail, setUserEmail] = useState("");
    const [showModal, setShowModal] = useState(false);
    const initialArray: any[] | (() => any[]) = [];
    const [photoArray, setPhotoArray]: any[] = useState(initialArray);

    function setFromModal(value: any) {
        setShowModal(value);
    }

    const pageName = useParams().id;

    useEffect(() => {
        async function fetchData() {
            const response = await getUser(pageName ?? "");

            if (response.email) {
                setUserEmail(response.email);
            }
        }

        async function fetchPhotos() {
            const response = await getUserPhotos(pageName ?? "");

            setPhotoArray(response);
        }

        if (!userEmail) {
            fetchData();
        }

        if (photoArray.length === 0) {
            fetchPhotos();
        }
    }, [pageName, photoArray.length, userEmail, userEmail.length]);

    const openModal = () => {
        setShowModal((prev) => !prev);
    };

    return (
        <div className="flex flex-col">
            {/* Top-part */}
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

            {/* Bio-part */}
            <div className="md:px-24 lg:px-36 px-3 py-4 flex flex-row gap-6 items-center justify-around">
                <div className="rounded-full w-6 h-6 p-6 bg-slate-500 border border-gray-500 ml-5 relative cursor-pointer"></div>

                <div className="flex flex-col items-start">
                    <p>{pageName}</p>
                    <p>{userEmail}</p>
                </div>

                {localStorage.getItem("username") === pageName && (
                    <>
                        <button onClick={openModal}>Upload</button>

                        {showModal && (
                            <UploadModal
                                showModal={showModal}
                                setShowModal={setShowModal}
                            />
                        )}
                    </>
                )}
            </div>

            <span className="w-full h-px border-b border-gray-200"></span>
            {/* Gallery-part */}
            <div className="flex flex-wrap">
                {(() => {
                    if (photoArray.length > 0) {

                        return (
                            <>
                                {photoArray.map((item: any, index: number) => (
                                    <div
                                        className="w-full flex flex-col"
                                        key={index}
                                    >
                                        <p>{photoArray[index].title}</p>
                                        <img
                                            alt={photoArray[index].title}
                                            src={`data:image/jpeg;base64, ${photoArray[index].img.data}`}
                                        />
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
