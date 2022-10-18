import React, { useEffect, useRef, useState } from "react";

const UploadModal = ({ showModal, setShowModal }: any) => {
    const [selectedImg, setSelectedImg] = useState("");
    const [selectImgText, setSelectImgText] = useState("Select");
    const [showRemove, setShowRemove] = useState(false);
    const ref = useRef<any>();

    function closeHandler() {
        setShowModal((prev: any) => !prev);
    }

    function removeHandler() {
        setSelectedImg("");
        setShowRemove(false);

        if (ref.current.value) {
            ref.current.value = "";
        }
    }

    function handleSubmit() {
        
    } 

    useEffect(() => {
        if (selectedImg) {
            setSelectImgText("Change");
            setShowRemove(true);
        } else {
            setSelectImgText("Select");
        }
    }, [selectedImg]);

    return (
        <>
            {showModal && (
                <>
                    <div className="absolute bottom-1/2 w-96 h-96 bg-white border rounded-lg flex flex-col justify-between p-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6 cursor-pointer"
                            onClick={closeHandler}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                                className=""
                            />
                        </svg>

                        <div className="flex flex-col items-center gap-5">
                            <label
                                className="border rounded py-2 px-3 bg-slate-50 cursor-pointer hover:border-sky-200 hover:bg-sky-50 w-1/2"
                                htmlFor="fileUpload"
                            >
                                {selectImgText} image
                            </label>

                            <div className="flex flex-row items-center">
                                <span>{selectedImg}</span>

                                {showRemove && (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-5 h-5 cursor-pointer"
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

                            <input
                                onChange={(e) => setSelectedImg(e.target.value)}
                                type="file"
                                ref={ref}
                                hidden
                                id="fileUpload"
                            />
                        </div>

                        <label
                            className="border rounded py-2 px-3 bg-slate-50 cursor-pointer hover:border-sky-200 hover:bg-sky-50 w-1/3 self-center"
                            htmlFor="fileUpload"
                            onClick={handleSubmit}
                        >
                            Submit
                        </label>
                    </div>
                </>
            )}
        </>
    );
};

export default UploadModal;
