import { useEffect, useRef, useState } from 'react';
import { HiOutlineX } from 'react-icons/hi';
import { useParams } from 'react-router-dom';
import { uploadImage } from '../../../Services/user.service';

const UploadModal = ({ showModal, setShowModal }: any) => {
    // STATES AND VARIABLES
    const [selectedImg, setSelectedImg] = useState<any>(null);
    const [selectImgText, setSelectImgText] = useState('Select');
    const [imageUrl, setImageUrl] = useState<any>('');
    const [showRemove, setShowRemove] = useState(false);
    const ref = useRef<any>();
    const userName = useParams().id;

    function closeHandler() {
        setShowModal((prev: any) => !prev);
    }

    // When clicking the "x"-button next to the selected image,
    // it should be removed/unselected
    function removeHandler() {
        setSelectedImg('');
        setShowRemove(false);

        if (ref.current.files.length !== 0) {
            ref.current.value = null;
            setImageUrl('');
        }
    }

    // When submiting the form the image should be uploaded,
    // and the modal should be closed.
    async function handleSubmit(event: any) {
        event.preventDefault();

        const formData = {
            title: event.target.title.value,
            image: event.target.file.files[0],
            username: event.target.username.value,
        };

        try {
            await uploadImage(formData);

            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    }

    // If a file has been selected,
    // one should be able to change or remove the selection.
    // And the selection should be shown as a thumbnail.
    useEffect(() => {
        if (ref.current.files.length !== 0) {
            setSelectImgText('Change');
            setShowRemove(true);

            if (imageUrl === '') {
                setImageUrl(URL.createObjectURL(selectedImg));
            }
        } else {
            setSelectImgText('Select');
        }
    }, [imageUrl, selectedImg, ref]);

    return (
        <>
            {showModal && (
                <>
                    <div className="modalQ">
                        <form
                            onSubmit={handleSubmit}
                            action=""
                            className="flex h-full flex-col justify-between"
                        >
                            <HiOutlineX
                                className="closeWndw"
                                onClick={closeHandler}
                            />

                            <div className="flex flex-col items-center gap-5">
                                <label
                                    className="text-center bg-slate-50 yesNoBtn py-2"
                                    htmlFor="fileUpload"
                                >
                                    {selectImgText} image
                                </label>

                                <input
                                    type="hidden"
                                    name="username"
                                    value={userName}
                                    aria-label={
                                        'your username is chosen automatically'
                                    }
                                />

                                <div className="flex flex-row justify-center items-center">
                                    {imageUrl && (
                                        <div className="w-1/3">
                                            <img
                                                src={imageUrl}
                                                alt={selectedImg.name}
                                                className="w-full h-auto"
                                            />
                                        </div>
                                    )}

                                    {showRemove && (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="w-5 h-5 cursor-pointer self-start"
                                            onClick={removeHandler}
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M6 18L18 6M6 6l12 12"
                                                className="text-red-700"
                                            />
                                        </svg>
                                    )}
                                </div>

                                {selectedImg && (
                                    <>
                                        <input
                                            className="inputField"
                                            type="text"
                                            id="imgTitle"
                                            placeholder="title"
                                            name="title"
                                            accept="image/*"
                                            aria-label={'Image title'}
                                        />
                                    </>
                                )}

                                <input
                                    onChange={(e) => {
                                        if (e.target.files) {
                                            setImageUrl('');
                                            setSelectedImg(e.target.files[0]);
                                        }
                                    }}
                                    type="file"
                                    ref={ref}
                                    hidden={true}
                                    name="file"
                                    id="fileUpload"
                                    aria-label={'Upload image'}
                                />
                            </div>

                            <button
                                className={
                                    selectedImg
                                        ? 'bg-slate-50 yesNoBtn self-center'
                                        : 'disabled w-1/2 self-center'
                                }
                                type="submit"
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </>
            )}
        </>
    );
};

export default UploadModal;
