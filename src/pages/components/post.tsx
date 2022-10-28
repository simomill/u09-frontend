import React, { FC, FormEvent, useEffect, useRef, useState } from "react";
import {
    HiOutlineX,
    HiOutlineHashtag,
    HiOutlineInformationCircle,
    HiOutlineFilm,
} from "react-icons/hi";
import { HiOutlineCamera } from "react-icons/hi2";
import { RiCameraLensFill } from "react-icons/ri";
import { GoCommentDiscussion, GoSettings } from "react-icons/go";
import { Link, useParams } from "react-router-dom";
import RemoveImgModal from "./removeImgModal";
import { useForm } from "react-hook-form";
import ContentEditable from "react-contenteditable";
import { getComments, postComment } from "../../Services/comment.service";

interface IfirstChildProps {
    photo: any;
}

interface ICommentModel {
    photoId: string;
    username: string;
    message: string;
    _id: string
}

const Post: FC<IfirstChildProps> = ({ photo }) => {
    const [showInfo, setShowInfo] = useState("hidden");
    const [infoColor, setInfoColor] = useState("text-slate-300");
    const [showRemove, setShowRemove] = useState(false);
    const [showRemoveModal, setShowRemoveModal] = useState(false);
    const [hasAccess, setHasAccess] = useState(false);
    const [showComment, setShowComment] = useState(false);
    const [imageId, setImageId] = useState("");
    const msgRef = useRef<HTMLSpanElement | null>(null);
    const [msgValue, setMsgValue] = useState(msgRef.current?.innerText);
    const initialArray: any[] | (() => any[]) = [];
    const [commentArray, setCommentArray]: any[] = useState(initialArray);

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

    const onToggleComment = () => {
        setShowComment((prev) => !prev);

        if (!showComment) {
            fetchComments();
        }
    };

    // FUNCTION FOR DELETING THE CLICKED IMAGE
    function onDeleteImg(id: string) {
        setImageId(id);
        setShowRemoveModal((prev) => !prev);
    }

    const onRemoveComment = (id: string) => {
        console.log(id);
        
    }

    const onSubmitComment = (event: FormEvent, photoId: string) => {
        event.preventDefault();

        let message = msgRef.current?.innerText;

        if (message && authedUser) {
            const obj = {
                message: message,
                username: authedUser,
                photoId: photoId,
            };

            postComment(obj).then(() => {
                fetchComments();
            });
        }
    };

    async function fetchComments() {
        const response = await getComments();

        setCommentArray(response.data);
        setMsgValue("");

        if (msgRef.current?.innerText) {
            msgRef.current.innerText = "";
        }
    }

    useEffect(() => {
        if (pageName === authedUser) {
            setHasAccess(true);
        } else if (localStorage.getItem("isAdmin")) {
            setHasAccess(true);
        }

    }, [authedUser, commentArray, msgValue, pageName]);

    return (
        <div className="md:w-[50rem] w-full py-4 px-6 flex flex-col self-center items-center">
            {/* Top */}
            {!useParams().id ? (
                <div className="flex flex-row justify-start items-center self-start mb-2">
                    <div className="rounded-full w-4 h-4 p-4 bg-slate-500 mx-2 border border-gray-500"></div>
                    <Link
                        to={`/user/${photo.username}`}
                        className="font-medium text-lg font-md"
                    >
                        {photo.username}
                    </Link>
                </div>
            ) : (
                ""
            )}

            {/* Image */}
            {photo && (
                <div
                    className="flex relative"
                    onMouseLeave={() => setShowRemove(false)}
                >
                    <img
                        alt={photo.title}
                        src={`data:image/jpeg;base64, ${photo.img.data}`}
                        onMouseOver={() => setShowRemove(true)}
                    />

                    {(() => {
                        if (hasAccess && showRemove)
                            return (
                                <>
                                    <HiOutlineX
                                        className="w-5 h-5 cursor-pointer self-start absolute top-5 right-10 m-3 bg-white border rounded text-red-700"
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

            <div className="flex flex-col self-start w-full">
                <div className="flex flex-row py-1 gap-2">
                    <GoCommentDiscussion
                        className={
                            showComment
                                ? "w-6 h-6 cursor-pointer"
                                : "w-6 h-6 cursor-pointer text-slate-300"
                        }
                        onClick={onToggleComment}
                    />
                </div>

                <div
                    className={
                        showComment
                            ? "flex flex-col gap-3 items-start w-full"
                            : "hidden"
                    }
                >
                    <span className="w-full h-px border-b border-gray-200 pt-1"></span>

                    {commentArray.map(
                        (comment: ICommentModel, index: number) => (
                            <>
                                {comment.photoId === photo._id && (
                                    <div key={index} className="w-fit flex flex-row gap-2 items-start justify-start border-b">
                                        <Link to={`/users/${comment.username}`} className="font-medium">
                                            {comment.username}
                                        </Link>
                                        <p className="h-max w-60 text-left break-words border-l pl-2">
                                            {comment.message}
                                        </p>

                                        {(() => {
                                            if (hasAccess || authedUser === comment.username) {
                                                return (
                                                    <HiOutlineX
                                                        onClick={()=> onRemoveComment(comment._id)}
                                                        className="w-5 h-5 cursor-pointer top-5 right-10 text-red-700"
                                                        
                                                    />
                                                )
                                            }
                                        
                                        })()}
                                    </div>
                                )}
                            </>
                        )
                    )}

                    <form
                        className="flex self-center my-3 items-end"
                        action=""
                        onSubmit={(e) => onSubmitComment(e, photo._id)}
                    >
                        <span
                            className="text-left border h-fit w-52 rounded rounded-r-none py-2 px-3 empty:before:content-[attr(placeholder)] focus:before:content-[attr(ref)]"
                            
                            placeholder="Add a comment..."
                            id="message"
                            role={"textbox"}
                            contentEditable
                            ref={msgRef}
                            suppressContentEditableWarning={true}
                        >
                            {msgValue}
                        </span>
                        <input
                            className=" h-max py-2 border rounded px-5 bg-slate-50 cursor-pointer hover:border-sky-200 hover:bg-sky-50 rounded-l-none"
                            type="submit"
                            value={"Post"}
                        />
                    </form>

                    <span className="w-full h-px border-b border-gray-200 pt-1"></span>
                </div>

                <div className="flex flex-row py-2 gap-2">
                    <HiOutlineInformationCircle
                        className={`${infoColor} w-6 h-6 cursor-pointer`}
                        onClick={toggleInfo}
                    />
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
