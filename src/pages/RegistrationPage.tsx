import React, { useState, FC, useEffect } from "react";
import { Link } from "react-router-dom";
import Loader from "./components/LoaderComponent";
import RegisterForm from "./components/RegisterFormComponent";

const RegisterPage: FC = () => {
    // STATES AND NAVIGATION
    const [loading, setLoading] = useState(false);
    const [statusMsg, setStatusMsg] = useState<any>("");

    useEffect(() => {
        if (statusMsg) {
            setTimeout(() => {
                setStatusMsg("");
            }, 2000);
        }
    }, [statusMsg]);

    return (
        <div className="formGroup">
            <h1 className="logo">DSPLAY</h1>

            <RegisterForm
                statusMsg={statusMsg}
                setStatusMsg={setStatusMsg}
                loading={loading}
                setLoading={setLoading}
            />

            {statusMsg && <p className="text-red-700">{statusMsg}</p>}

            <Link to={"/login"} className="textLink">
                Already a user?
            </Link>

            {loading && <Loader />}
        </div>
    );
};

export default RegisterPage;
