import React from "react";
import { FaChevronLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

const Unauth = () => {
    return (
        <div className="flex flex-col justify-center items-center">
            <h1 className="text-4xl">401</h1>
            <p>You are not allowed on this location!</p>
            <Link
                className="flex flex-row items-center hover:text-cyan-700"
                to="/"
            >
                <FaChevronLeft />
                <span>Back</span>
            </Link>
        </div>
    );
};

export default Unauth;
