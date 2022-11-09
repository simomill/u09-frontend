import React, { FormEvent, useEffect, useRef, useState } from 'react';
import {
    HiOutlineX,
    HiOutlineInformationCircle,
    HiOutlineFilm,
} from 'react-icons/hi';
import { RiCameraLensFill } from 'react-icons/ri';
import { GoCommentDiscussion, GoSettings } from 'react-icons/go';
import { Link, useParams } from 'react-router-dom';
import RemoveImgModal from './modals/RmvImgModal';
import { getComments, postComment } from '../../Services/comment.service';
import RemoveCmntModal from './modals/RmvCmntModal';
import { IoCameraOutline } from 'react-icons/io5';
import { encode, decode } from 'html-entities';
import { ICommentModel } from '../../Models';

const Post = ({ photo, changeState }: any) => {
    // ------------------STATES AND VARIABLES
    const [showInfo, setShowInfo] = useState(false);
    const [showRemove, setShowRemove] = useState(false);
    const [showRemoveModal, setShowRemoveModal] = useState(false);
    const [showRemoveCmntModal, setShowRemoveCmntModal] = useState(false);
    const [hasAccess, setHasAccess] = useState(false);
    const [showComment, setShowComment] = useState(false);
    const [imageId, setImageId] = useState('');
    const msgRef = useRef<HTMLSpanElement | null>(null);
    const [msgValue, setMsgValue] = useState(msgRef.current?.innerText);
    const initialArray: any[] | (() => any[]) = [];
    const [commentArray, setCommentArray]: any[] = useState(initialArray);
    const [commentId, setCommentId] = useState('');
    const pageName = useParams().id;
    const authedUser = localStorage.getItem('username');

    const onToggleInfo = () => {
        setShowInfo((prev) => !prev);
    };

    const onToggleComment = () => {
        setShowComment((prev) => !prev);

        if (!showComment) {
            fetchComments();
        }
    };

    function onDeleteImg(id: string) {
        setImageId(id);
        setShowRemoveModal((prev) => !prev);
    }

    const onRemoveComment = (id: string) => {
        setCommentId(id);
        setShowRemoveCmntModal((prev) => !prev);
    };

    // When the comment is submitted, it should be sanitized
    // by swapping out special characters for their html-character.
    const onSubmitComment = (event: FormEvent, photoId: string) => {
        event.preventDefault();

        let message = msgRef.current?.innerText;

        const safeMsg = encode(message, { mode: 'nonAsciiPrintable' });

        if (message && authedUser) {
            const obj = {
                message: safeMsg,
                username: authedUser,
                photoId: photoId,
            };

            postComment(obj).then(() => {
                fetchComments();
            });
        }
    };

    // When comments are being fetched,
    // the commentfield should be emptied.
    async function fetchComments() {
        const response = await getComments();

        setCommentArray(response.data);
        setMsgValue('');

        if (msgRef.current?.innerText) {
            msgRef.current.innerText = '';
        }
    }

    useEffect(() => {
        if (pageName === authedUser) {
            setHasAccess(true);
        } else if (localStorage.getItem('isAdmin')) {
            setHasAccess(true);
        }
    }, [authedUser, commentArray, pageName]);

    return (
        <>
            <div className="postContainer">
                {/* 
                    Show the Byline only on the homepage 
                */}
                {!useParams().id && (
                    <div className="byline">
                        <div className="avatar"></div>
                        <Link
                            to={`/user/${photo.username}`}
                            className="font-medium text-lg font-md"
                        >
                            {photo.username}
                        </Link>
                    </div>
                )}

                {/* 

                */}
                {photo && (
                    <div
                        className="flex relative max-h-screen p-2"
                        onMouseLeave={() => setShowRemove(false)}
                    >
                        <img
                            alt={photo.title}
                            src={`data:image/jpeg;base64, ${photo.img.data}`}
                            onMouseOver={() => setShowRemove(true)}
                            onClick={() => changeState(photo)}
                            className="cursor-nesw-resize h-full w-auto"
                        />

                        {/* 
                            It should only be possible to remove an image
                            if it's the users' own image, or if the user is admin.
                        */}
                        {(() => {
                            if (hasAccess && showRemove)
                                return (
                                    <>
                                        <HiOutlineX
                                            className="removeBtn"
                                            onClick={() =>
                                                onDeleteImg(photo._id)
                                            }
                                        />
                                    </>
                                );
                        })()}
                    </div>
                )}

                {/* 
                    When the image clicked, to be removed is the same
                    as the image in this post instance, 
                    open the modal to confirm the removal.
                */}
                {imageId === photo._id && (
                    <RemoveImgModal
                        id={imageId}
                        showModal={showRemoveModal}
                        setShowModal={setShowRemoveModal}
                    />
                )}

                {photo && <p>{photo.title}</p>}

                <div className="flex flex-col self-start w-full">
                    <div className="infoIcon">
                        <GoCommentDiscussion
                            className={
                                showComment
                                    ? 'toggleIcon'
                                    : 'toggleIcon text-slate-300'
                            }
                            onClick={onToggleComment}
                        />
                    </div>

                    {showComment && (
                        <div className={'toggleSection'}>
                            <span className="divider"></span>

                            {/* 
                            Comments related to the image should be shown under it.
                            Users should be able to remove their own comments,
                            and admins should be able to remove all comments.
                        */}
                            {commentArray.map(
                                (comment: ICommentModel, index: number) => (
                                    <>
                                        {comment.photoId === photo._id && (
                                            <div
                                                key={index}
                                                className="comment"
                                            >
                                                <Link
                                                    to={`/users/${comment.username}`}
                                                    className="font-medium"
                                                >
                                                    {comment.username}
                                                </Link>
                                                <p className="commentMsg">
                                                    {decode(comment.message, {
                                                        level: 'html5',
                                                    })}
                                                </p>

                                                {(() => {
                                                    if (
                                                        hasAccess ||
                                                        authedUser ===
                                                            comment.username
                                                    ) {
                                                        return (
                                                            <HiOutlineX
                                                                onClick={() =>
                                                                    onRemoveComment(
                                                                        comment._id
                                                                    )
                                                                }
                                                                className="redCross"
                                                            />
                                                        );
                                                    }
                                                })()}
                                            </div>
                                        )}
                                    </>
                                )
                            )}
                            {showRemoveCmntModal && (
                                <RemoveCmntModal
                                    id={commentId}
                                    showModal={showRemoveCmntModal}
                                    setShowModal={setShowRemoveCmntModal}
                                    fetchComments={fetchComments}
                                />
                            )}

                            <form
                                className="flex self-center mt-3"
                                action=""
                                onSubmit={(e) => onSubmitComment(e, photo._id)}
                            >
                                <span
                                    className="textArea"
                                    placeholder="Add a comment..."
                                    id="message"
                                    role={'textbox'}
                                    contentEditable
                                    ref={msgRef}
                                    suppressContentEditableWarning={true}
                                >
                                    {msgValue}
                                </span>
                                <input
                                    className="postComment"
                                    type="submit"
                                    value={'Post'}
                                    aria-label={'submit'}
                                />
                            </form>

                            <span className="divider"></span>
                        </div>
                    )}

                    <div className="flex flex-row py-2 gap-2">
                        <HiOutlineInformationCircle
                            className={
                                showInfo
                                    ? 'toggleIcon'
                                    : 'toggleIcon text-slate-300'
                            }
                            onClick={onToggleInfo}
                        />
                    </div>

                    {showInfo && (
                        <div className="toggleSection">
                            <div className="infoIcon">
                                <IoCameraOutline className="w-6 h-6" />
                                <p>Camera</p>
                            </div>

                            <div className="infoIcon">
                                <RiCameraLensFill className="w-6 h-6" />
                                <p>Lens</p>
                            </div>

                            <div className="infoIcon">
                                <GoSettings className="w-5 h-5" />
                                <p>Settings</p>
                            </div>

                            <div className="infoIcon">
                                <HiOutlineFilm className="w-6 h-6" />

                                <p>Film</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Post;
