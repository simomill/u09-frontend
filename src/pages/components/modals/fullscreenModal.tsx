import React from "react";
import { HiOutlineX } from "react-icons/hi";

const FullscreenModal = ({ showModal, setShowModal, data }: any) => {
    function closeHandler() {
        setShowModal((prev: any) => !prev);
    }
    return (
        <>
            {showModal && (
                <div className="absolute overflow-hidden sticky bottom-0 bg-white z-50 h-screen w-screen flex flex-col items-center justify-center">
                    <HiOutlineX
                        className="w-6 h-6 self-start cursor-pointer hover:text-red-700"
                        onClick={closeHandler}
                    />
                    <div className="w-full flex flex-row justify-center overflow-hidden ">
                        <img
                            alt={data.title}
                            src={`data:image/jpeg;base64, ${data.img.data}`}
                            className="h-full w-auto"
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default FullscreenModal;
