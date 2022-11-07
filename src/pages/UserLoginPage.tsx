import { FC, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { login } from "../Services/auth.service";
import { useForm } from "react-hook-form";
import Loader from "./components/LoaderComponent";
import LoginForm from "./components/LoginFormComponent";

const LoginPage: FC = () => {
    // STATES AND NAVIGATION
    const { state } = useLocation();
    const [loading, setLoading] = useState(false);
    const [statusMsg, setStatusMsg] = useState(state ?? "");    

    useEffect(() => {

        // Make any statsus message be vissible 
        // only for a short amount of time
        if (statusMsg) {
            setTimeout(() => {
                setStatusMsg("");
            }, 4000);
        }

    }, [statusMsg]);

    return (
        <>
        <div className="formGroup">
            <h1 className="logo">DSPLAY</h1>

            <LoginForm state={state} setLoading={setLoading} loading={loading} />

            {loading && <Loader />}
        </div>
        </>
    );
};

export default LoginPage;