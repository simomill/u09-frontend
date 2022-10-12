import React, { ChangeEvent, FC, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login, LoginModel } from "../Services/auth.service";

const LoginPage: FC = () => {
    // states and navigation
    const navigate = useNavigate();
    const [loginData, setLoginData] = useState<LoginModel>({
        username: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);

    // Change username state from input
    function handleChangeUsername(e: ChangeEvent<HTMLInputElement>) {
        setLoginData({
            username: e.target.value,
            password: loginData.password,
        });
    }

    // Change password state from input
    function handleChangePassword(e: ChangeEvent<HTMLInputElement>) {
        setLoginData({
            username: loginData.username,
            password: e.target.value,
        });
    }

    // Login on button click
    async function handleClickLogin() {
        setLoading(true);

        try {
            const success = await login(loginData);

            if (success) {
                // Navigate and reload if successful
                navigate("/");
                window.location.reload();
            } else {
                alert("Error logging in");
            }
        } catch (error) {
            alert(error);
        } finally {
            // Reset loading state
            setLoading(false);
        }
    }

    return (
        <div className="flex flex-col justify-center items-center h-screen gap-4">
            <h1 className="font-bold text-3xl mb-6 text-cyan-900">DSPLAY</h1>

            <input
                className="border rounded py-2 px-3 mb-3"
                type="text"
                name="username"
                id="username"
                placeholder="username"
                value={loginData.username}
                onChange={handleChangeUsername}
            />
            <input
                className="border rounded py-2 px-3 mb-3"
                type="password"
                name="pass"
                id="pass"
                placeholder="password"
                value={loginData.password}
                onChange={handleChangePassword}
            />
            <input
                className="border rounded py-2 px-3 bg-slate-50"
                type="submit"
                value="login"
                onClick={handleClickLogin}
            />

            <Link to={"/register"} className="text-cyan-900">
                register
            </Link>
        </div>
    );
};

export default LoginPage;
