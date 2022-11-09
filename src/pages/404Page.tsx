import React from 'react';
import { FaChevronLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="centerColumn">
            <h1 className="text-4xl">404</h1>
            <p>The page you tried to visit does not exist.</p>

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

export default NotFound;
