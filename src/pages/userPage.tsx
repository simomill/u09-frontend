import React, { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUser } from "../Services/user.service";

const UserPage: FC = () => {
    const [userEmail, setUserEmail] = useState("")

    useEffect(() => {

        async function fetchData() {
            const response = await getUser(localStorage.getItem("username") ?? "");
            
            setUserEmail(response.email);
            
            
        }

        if (!userEmail) {
            fetchData();
        }

    }, [userEmail, userEmail.length]);


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
            <div className="md:px-24 lg:px-36 px-3 py-4 flex flex-row gap-6 items-center">
                <div
                    className="rounded-full w-6 h-6 p-6 bg-slate-500 border border-gray-500 ml-5 relative cursor-pointer"
                ></div>

                <div className="flex flex-col items-start">
                    <p>{localStorage.getItem("username")}</p>
                    <p>{userEmail}</p>
                </div>
            </div>

            <span className="w-full h-px border-b border-gray-200"></span>
            {/* Gallery-part */}
            <div className="flex flex-wrap">

            </div>


        </div>
    );
};

export default UserPage;
