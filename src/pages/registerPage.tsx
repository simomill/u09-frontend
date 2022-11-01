import React, { useState, FC, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../Services/auth.service";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const RegisterPage: FC = () => {
    // states and navigation
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [statusMsg, setStatusMsg] = useState("");

    // Change username state from input

    const formSchema = Yup.object().shape({
        password: Yup.string()
            .required("Password is required")
            .min(4, "Password length should be at least 4 characters"),
        passconf: Yup.string()
            .required("Confirm Password is required")
            .oneOf([Yup.ref("password")], "Passwords must and should match"),
    });

    const validationOpt = { resolver: yupResolver(formSchema) };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm(validationOpt);

    const onSubmit = async (data: any) => {
        setLoading(true);

        try {
            const success = await registerUser(data);

            // Navigate if successful
            if (success) {
                navigate("/login", { state: "User successfully created!" });
            } else {
                setStatusMsg("User already exists");
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (statusMsg) {
            setTimeout(() => {
                setStatusMsg("");
            }, 2000);
        }
    }, [statusMsg]);

    return (
        <div className="flex flex-col justify-center items-center h-screen gap-4">
            <h1 className="font-bold text-3xl mb-6 text-cyan-900">DSPLAY</h1>

            <form
                className="flex flex-col"
                action=""
                onSubmit={handleSubmit(onSubmit)}
            >
                <input
                    className="border rounded py-2 px-3 mb-3"
                    type="text"
                    id="name"
                    placeholder="name"
                    {...register("name", { required: true })}
                />

                <input
                    className="border rounded py-2 px-3 mb-3"
                    type="email"
                    id="email"
                    placeholder="email"
                    {...register("email", {
                        required: true,
                        pattern:
                            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    })}
                />

                <input
                    className="border rounded py-2 px-3 mb-3"
                    type="text"
                    id="username"
                    placeholder="username"
                    {...register("username", { required: true, maxLength: 10 })}
                />
                {errors.username && (
                    <p className="text-red-700">Please choose a username</p>
                )}

                <input
                    className="border rounded py-2 px-3 mb-3"
                    type="password"
                    id="pass"
                    placeholder="password"
                    {...register("password", { required: true })}
                />
                {errors.password && (
                    <p className="text-red-700">Please choose a password</p>
                )}

                <input
                    className="border rounded py-2 px-3 mb-3"
                    type="password"
                    id="passconf"
                    placeholder="repeat password"
                    {...register("passconf")}
                />
                {errors.passconf && (
                    <p className="text-red-700">Passwords do not match</p>
                )}

                <input
                    className="border rounded py-2 px-3 bg-slate-50 cursor-pointer "
                    type="submit"
                    value="register"
                />
            </form>

            {statusMsg && <p className="text-red-700">{statusMsg}</p>}

            <Link to={"/login"} className="text-cyan-900 hover:text-cyan-600">
                Already a user?
            </Link>
        </div>
    );
};

export default RegisterPage;
