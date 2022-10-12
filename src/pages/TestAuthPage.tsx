import React, { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkIsLoggedIn, getAuthTest, logout } from "../Services/auth.service";

const TestAuthPage: FC = () => {
    // states &navigation
    const navigate = useNavigate();
    const [message, setMessage] = useState("Loading");

    // Run async function on load with useEffect
    useEffect(() => {
        loadpageAsync();
    });

    async function loadpageAsync() {
        const isLoggedIn = checkIsLoggedIn();

        if (isLoggedIn) {
            try {
                const message = await getAuthTest();
                setMessage(message);
            } catch (error) {
                logout();
                navigate("/");
                window.location.reload();
            }
        } else {
            logout();
            navigate("/");
            window.location.reload();
        }
    }

    return (
        <>
            <div>TestAuthPage</div>
            <p>{message}</p>
        </>
    );
};

export default TestAuthPage;
