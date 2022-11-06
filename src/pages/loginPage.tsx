import { FC, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { login } from "../Services/auth.service";
import { useForm } from "react-hook-form";
import Loader from "./components/Loader";
import LoginForm from "./components/LoginForm";

const LoginPage: FC = () => {
    // states and navigation
    const navigate = useNavigate();
    const { state } = useLocation();
    const [loading, setLoading] = useState(false);
    const [statusMsg, setStatusMsg] = useState(state ?? "");    

    const { register, handleSubmit } = useForm();

    useEffect(() => {
        if (statusMsg) {
            setTimeout(() => {
                setStatusMsg("");
            }, 4000);
        }
    }, [statusMsg]);

    // Login on button click
    async function onSubmit(data: any) {
        setLoading(true);

        const response = await login(data);

        if (response?.status === 200) {
            // Navigate and reload if successful
            if (response.data.isAdmin !== 0) {
                navigate("/dashboard");
                window.location.reload();
            } else {
                navigate("/");
                window.location.reload();
            }
        } else {
            setStatusMsg(response?.data);
        }

        // Reset loading state
        setLoading(false);
    }

    return (
        <div className="flex flex-col justify-center items-center h-screen gap-4">
            <h1 className="font-bold text-3xl mb-6 text-cyan-900">DSPLAY</h1>

            <LoginForm state={state} />

            {loading && <Loader />}
        </div>
    );
};

export default LoginPage;
