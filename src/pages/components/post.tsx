import React, { FC, useState } from "react";
import {
    HiOutlineX,
    HiOutlineHashtag,
    HiOutlineInformationCircle,
    HiOutlineFilm,
} from "react-icons/hi";
import { HiOutlineCamera } from "react-icons/hi2";
import { RiCameraLensFill } from "react-icons/ri";
import { GoCommentDiscussion, GoSettings } from "react-icons/go";
import { useParams } from "react-router-dom";
import RemoveImgModal from "./removeImgModal";

interface IfirstChildProps {
    photo: any;
}

const Post: FC<IfirstChildProps> = ({ photo }) => {
    const [showInfo, setShowInfo] = useState("hidden");
    const [infoColor, setInfoColor] = useState("text-slate-300");
    const [showRemove, setShowRemove] = useState(false);
    const [showRemoveModal, setShowRemoveModal] = useState(false);
    const [imageId, setImageId] = useState("");

    const pageName = useParams().id;
    const authedUser = localStorage.getItem("username");

    const toggleInfo = () => {
        if (showInfo === "hidden") {
            setShowInfo("flex flex-col gap-1");
            setInfoColor("text-slate-800");
        } else {
            setShowInfo("hidden");
            setInfoColor("text-slate-300");
        }
    };

    // FUNCTION FOR DELETING THE CLICKED IMAGE
    function onDeleteImg(id: string) {
        setImageId(id);
        setShowRemoveModal((prev) => !prev);
    }

    return (
        <div className="md:w-[50rem] w-full py-4 px-6 flex flex-col self-center items-center">
            {/* Top */}
            {!useParams().id ? (
                <div className="flex flex-row justify-start items-center">
                    <div className="rounded-full w-4 h-4 p-4 bg-slate-500 mx-2 border border-gray-500"></div>
                    <p>Username</p>
                </div>
            ) : (
                ""
            )}

            {/* Image */}
            {photo && (
                <div
                    className="flex relative "
                    onMouseLeave={() => setShowRemove(false)}
                >
                    <img
                        alt={photo.title}
                        src={`data:image/jpeg;base64, ${photo.img.data}`}
                        onMouseOver={() => setShowRemove(true)}
                    />

                    {(() => {
                        if (authedUser === pageName && showRemove)
                            return (
                                <>
                                    <HiOutlineX
                                        className="w-5 h-5 cursor-pointer self-start absolute top-10 right-20 m-3 bg-white border rounded text-red-700"
                                        onClick={() => onDeleteImg(photo._id)}
                                    />
                                </>
                            );
                    })()}
                </div>
            )}

            {imageId === photo._id && (
                <RemoveImgModal
                    id={imageId}
                    showModal={showRemoveModal}
                    setShowModal={setShowRemoveModal}
                />
            )}

            {photo && <p>{photo.title}</p>}

            <div className="flex flex-col self-start">
                <div className="flex flex-row pb-1 gap-2">
                    <HiOutlineInformationCircle
                        className={`${infoColor} w-6 h-6 cursor-pointer`}
                        onClick={toggleInfo}
                    />
                </div>

                <div className="flex flex-row py-1 gap-2">
                    <HiOutlineHashtag className="w-6 h-6" />
                    <p>Hashtags</p>
                </div>

                <div className="flex flex-row py-1 gap-2">
                    <GoCommentDiscussion className="w-6 h-6" />
                    <p>Comments</p>
                </div>

                {/* info section */}
                <div className={showInfo}>
                    <div className="flex flex-row py-1 gap-2">
                        <HiOutlineCamera className="w-6 h-6" />
                        <p>Camera</p>
                    </div>

                    <div className="flex flex-row py-1 gap-2">
                        <RiCameraLensFill className="w-6 h-6" />
                        <p>Lens</p>
                    </div>

                    <div className="flex flex-row py-1 gap-2">
                        <GoSettings className="w-5 h-5" />
                        <p>Settings</p>
                    </div>

                    <div className="flex flex-row py-1 gap-2">
                        <HiOutlineFilm className="w-6 h-6" />

                        <p>Film</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Post;
