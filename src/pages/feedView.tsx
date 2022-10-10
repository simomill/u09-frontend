import React, { FC } from "react";
import Post from "./components/post";
import Search from "../heroicons/search";

const FeedView: FC = () => {
    const posts:number = 9;

    return (
        <>
            <div className="sm:container py-6 flex flex-col">
                {/* Nav */}
                <nav className="flex flex-row justify-center items-center">
                    <div className="flex flex-row border border-gray-300 rounded-lg w-min p-2">
                        <input type="text" name="" id="" className="" />
                        <Search/>
                    </div>

                    <div className="rounded-full w-4 h-4 p-4 bg-slate-500 border border-gray-500 ml-5"></div>
                </nav>
                <span className="w-full h-px border-b border-gray-200 p-2"></span>

                {/* Content */}
                
                <Post />

            </div>
        </>
    );
};

export default FeedView;
