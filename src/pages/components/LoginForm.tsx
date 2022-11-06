import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../Services/auth.service";

const LoginForm = ({ state }: any) => {
    const [loading, setLoading] = useState(false);
    const [statusMsg, setStatusMsg] = useState(state);
    const { register, handleSubmit } = useForm();

    const navigate = useNavigate();

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

    useEffect(() => {
        if (statusMsg) {
            setTimeout(() => {
                setStatusMsg("");
            }, 4000);
        }

    }, [statusMsg]);

    return (
        <div>
            <form
                className="flex flex-col"
                action=""
                onSubmit={handleSubmit(onSubmit)}
            >
                <input
                    className="border rounded py-2 px-3 mb-3"
                    type="text"
                    id="username"
                    placeholder="username"
                    {...register("username", { required: true })}
                    aria-label={"your username"}
                />

                <input
                    className="border rounded py-2 px-3 mb-3"
                    type="password"
                    id="pass"
                    placeholder="password"
                    {...register("password", { required: true })}
                    aria-label={"your password"}
                />

                <input
                    className="border rounded py-2 px-3 bg-slate-50 cursor-pointer"
                    type="submit"
                    value="login"
                    aria-label={"submit"}
                />

                <Link
                    to={"/register"}
                    className="text-cyan-900 hover:text-cyan-600"
                >
                    Not a user yet?
                </Link>

                {(() => {
                    if (statusMsg) {
                        return statusMsg.includes("success") ? (
                            <p className="text-green-700 bg-green-50 border border-green-700 rounded mt-3">
                                {statusMsg}
                            </p>
                        ) : (
                            <p className="text-red-700 bg-red-50 border border-red-700 rounded mt-3">
                                {statusMsg}
                            </p>
                        );
                    }
                })()}
            </form>
        </div>
    );
};

export default LoginForm;
