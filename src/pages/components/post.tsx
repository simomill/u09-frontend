import React, { FC, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import f from ".././../assets/f-stop.svg";

const Post: FC = () => {
    const [showInfo, setShowInfo] = useState("hidden");
    const [infoColor, setInfoColor] = useState("text-slate-600");
    const [direction, setDirection] = useState("rotate-0");

    const toggleInfo = () => {
        if (showInfo === "hidden") {
            setShowInfo("flex flex-col gap-1");
            setInfoColor("text-slate-800");
            setDirection("rotate-90");
        } else {
            setShowInfo("hidden");
            setInfoColor("text-slate-300");
            setDirection("-rotate-90");
        }
    };

    return (
        <div className="py-2 px-6 flex flex-col border-b border-gray-200">
            {/* Top */}
            <div className="flex flex-row justify-start items-center">
                <div className="rounded-full w-4 h-4 p-4 bg-slate-500 mx-2 border border-gray-500"></div>
                <p>Username</p>
            </div>

            {/* Image */}
            <div className="container w-full h-96 p-2 bg-slate-200 my-3">
                {/* <img src="#" alt="Doesn't exist" /> */}
            </div>

            <p>Text</p>

            <div className="flex flex-row gap-2">
                <svg
                    onClick={toggleInfo}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 cursor-pointer"
                >
                    <path
                        className={infoColor}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                    />
                </svg>
            </div>

            <div className="flex flex-row gap-2">
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
                            d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5l-3.9 19.5m-2.1-19.5l-3.9 19.5"
                        />
                    </svg>
                    <p>Hashtags</p>
                </div>
                
                <div className="flex flex-row gap-2">
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
                            d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
                        />
                    </svg>

                    <p>Comments</p>
                </div>

            

            {/* info section */}
            <div className={showInfo}>
                <div className="flex flex-row gap-2">
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
                            d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
                        />
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"
                        />
                    </svg>
                    <p>Camera</p>
                </div>

                <div className="flex flex-row gap-2">
                    <svg
                        className="w-5 h-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 64 64"
                    >
                        <g id="Layer_2" data-name="Layer 2">
                            <path
                                className="w-2 h-2"
                                d="M18.84 25.2a1.89 1.89 0 0 0 3.28 0l2.33-4a2 2 0 0 1 .16-.37L33.16 6A1.33 1.33 0 0 0 32 4a27.87 27.87 0 0 0-16 5 6.15 6.15 0 0 0-1.82 8.12zM10.22 40h9.28a1.89 1.89 0 0 0 1.64-2.84L18.72 33l-.11-.16L10.06 18a1.33 1.33 0 0 0-2.3 0A27.86 27.86 0 0 0 4 32q0 1.2.1 2.37A6.14 6.14 0 0 0 10.22 40zM32.94 20.05h4.61A2 2 0 0 1 38 20h17.11a1.33 1.33 0 0 0 1.15-2 28.12 28.12 0 0 0-12.4-11.37A6.13 6.13 0 0 0 36 9.13l-4.7 8.08a1.89 1.89 0 0 0 1.64 2.84zM53.78 24h-9.31a1.89 1.89 0 0 0-1.64 2.84l2.33 4a2 2 0 0 1 .23.33L53.94 46a1.33 1.33 0 0 0 2.3 0A27.86 27.86 0 0 0 60 32q0-1.2-.1-2.37A6.14 6.14 0 0 0 53.78 24zM31 44H8.89a1.33 1.33 0 0 0-1.15 2 28.12 28.12 0 0 0 12.4 11.37 6.13 6.13 0 0 0 7.86-2.5l4.63-8A1.89 1.89 0 0 0 31 44zM45.18 38.83a1.89 1.89 0 0 0-3.28 0L39.49 43a2 2 0 0 1-.1.2L30.84 58A1.33 1.33 0 0 0 32 60a27.87 27.87 0 0 0 16-5 6.15 6.15 0 0 0 1.82-8.12z"
                            />
                        </g>
                    </svg>
                    <p>Lens</p>
                </div>

                <div className="flex flex-row gap-2">
                    <img className="w-5 h-5" src={f} alt="" />
                    <p>F-Stop</p>
                </div>

                <div className="flex flerx-row gap-2">
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
                            d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-3.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-1.5A1.125 1.125 0 0118 18.375M20.625 4.5H3.375m17.25 0c.621 0 1.125.504 1.125 1.125M20.625 4.5h-1.5C18.504 4.5 18 5.004 18 5.625m3.75 0v1.5c0 .621-.504 1.125-1.125 1.125M3.375 4.5c-.621 0-1.125.504-1.125 1.125M3.375 4.5h1.5C5.496 4.5 6 5.004 6 5.625m-3.75 0v1.5c0 .621.504 1.125 1.125 1.125m0 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m1.5-3.75C5.496 8.25 6 7.746 6 7.125v-1.5M4.875 8.25C5.496 8.25 6 8.754 6 9.375v1.5m0-5.25v5.25m0-5.25C6 5.004 6.504 4.5 7.125 4.5h9.75c.621 0 1.125.504 1.125 1.125m1.125 2.625h1.5m-1.5 0A1.125 1.125 0 0118 7.125v-1.5m1.125 2.625c-.621 0-1.125.504-1.125 1.125v1.5m2.625-2.625c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125M18 5.625v5.25M7.125 12h9.75m-9.75 0A1.125 1.125 0 016 10.875M7.125 12C6.504 12 6 12.504 6 13.125m0-2.25C6 11.496 5.496 12 4.875 12M18 10.875c0 .621-.504 1.125-1.125 1.125M18 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m-12 5.25v-5.25m0 5.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125m-12 0v-1.5c0-.621-.504-1.125-1.125-1.125M18 18.375v-5.25m0 5.25v-1.5c0-.621.504-1.125 1.125-1.125M18 13.125v1.5c0 .621.504 1.125 1.125 1.125M18 13.125c0-.621.504-1.125 1.125-1.125M6 13.125v1.5c0 .621-.504 1.125-1.125 1.125M6 13.125C6 12.504 5.496 12 4.875 12m-1.5 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M19.125 12h1.5m0 0c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h1.5m14.25 0h1.5"
                        />
                    </svg>

                    <p>Film</p>
                </div>

                
            </div>
        </div>
    );
};

export default Post;
