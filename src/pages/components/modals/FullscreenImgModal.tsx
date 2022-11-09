import React from 'react';
import { HiOutlineX } from 'react-icons/hi';

const FullscreenModal = ({ showModal, setShowModal, data }: any) => {
    function closeHandler() {
        setShowModal((prev: any) => !prev);
    }
    return (
        <>
            {showModal && (
                <div className="fullImgWndw">
                    <HiOutlineX
                        className="closeWndw"
                        onClick={closeHandler}
                    />
                    <div className="fullImgContainer">
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
