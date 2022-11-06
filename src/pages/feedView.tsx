import React, { FC, useEffect, useState } from "react";
import Post from "./components/post";
import { checkIsLoggedIn } from "../Services/auth.service";
import { getAllUsers, getPhotos } from "../Services/user.service";
import FullscreenModal from "./components/modals/fullscreenModal";
import Loader from "./components/Loader";
import Nav from "./components/Nav";
import { IUserModel } from "../Models";

const FeedView: FC = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [photoArray, setPhotoArray] = useState<any[] | null>(null);
    const [userArray, setUserArray] = useState<IUserModel[] | null>(null);
    const [chosenPhoto, setChosenPhoto] = useState<string | null>(null);
    const [showFullscreenModal, setShowFullscreenModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);


    

    const changeState = (data: any) => {
        console.log({ data });

        if (!chosenPhoto) {
            setChosenPhoto(data);
            setShowFullscreenModal((prev) => !prev);
        }
    };

    async function fetchUsers() {
        const response = await getAllUsers();
        
        setUserArray(response.data);
    }

    async function fetchPhotos() {
        const response = await getPhotos();

        setPhotoArray(response.data);
    }

    useEffect(() => {
        const isLoggedIn = checkIsLoggedIn();
        setIsLoggedIn(isLoggedIn.token);
        setIsAdmin(isLoggedIn.isAdmin ?? "");

        if (userArray === null) {
            setIsLoading(true);
            fetchUsers();
        } else {
            setIsLoading(false);
        }

        if (photoArray === null) {
            setIsLoading(true);
            fetchPhotos();
        } else {
            setIsLoading(false)
        }

        

        if (!showFullscreenModal) {
            setChosenPhoto(null);
        }
    }, [photoArray, showFullscreenModal, userArray]);

    return (
        <>
            <div className="w-full py-6 flex flex-col">

                <Nav userArray={userArray} isAdmin={isAdmin} />
                
                <div className="flex flex-wrap items-center justify-center">

                    {isLoading && <Loader />}
                    
                    {/* IF THERE ARE PHOTOS, THEN LOOP OVER THEM */}
                    {(() => {
                        if (photoArray && photoArray.length > 0) {
                            return (
                                <>
                                    {photoArray.map(
                                        (item: any, index: number) => (
                                            <div
                                                className="w-full flex flex-col items-center relative"
                                                key={index}
                                            >
                                                <Post
                                                    photo={photoArray[index]}
                                                    changeState={changeState}
                                                />
                                                <span className="w-full h-px border-b border-gray-200"></span>
                                            </div>
                                        )
                                    )}
                                </>
                            );
                        }
                    })()}
                </div>

                <FullscreenModal
                    showModal={showFullscreenModal}
                    setShowModal={setShowFullscreenModal}
                    data={chosenPhoto}
                />
            </div>
        </>
    );
};

export default FeedView;
