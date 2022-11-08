import React, { useState } from "react";
import { registerUser } from "../../Services/auth.service";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

const RegisterForm = ({ statusMsg, setStatusMsg, loading, setLoading }: any) => {
    const navigate = useNavigate();

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

            // If the registration was successful
            // the user should be riedirected to the login page,
            // with feedback.
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

    return (
        <form
            className="flex flex-col"
            action=""
            onSubmit={handleSubmit(onSubmit)}
        >
            <input
                className="inputField"
                type="text"
                id="name"
                placeholder="name"
                {...register("name", { required: true })}
                aria-label={"your name"}
            />

            <input
                className="inputField"
                type="email"
                id="email"
                placeholder="email"
                {...register("email", {
                    required: true,
                    pattern:
                        /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                })}
                aria-label={"your email"}
            />

            <input
                className="inputField"
                type="text"
                id="username"
                placeholder="username"
                {...register("username", { required: true, maxLength: 10 })}
                aria-label={"your username"}
            />
            {errors.username && (
                <p className="text-red-700">Please choose a username</p>
            )}

            <input
                className="inputField"
                type="password"
                id="pass"
                placeholder="password"
                {...register("password", { required: true })}
                aria-label={"your password"}
            />
            {errors.password && (
                <p className="text-red-700">Please choose a password</p>
            )}

            <input
                className="inputField"
                type="password"
                id="passconf"
                placeholder="repeat password"
                {...register("passconf")}
                aria-label={"confirm password"}
            />
            {errors.passconf && (
                <p className="text-red-700">Passwords do not match</p>
            )}

            <input
                className="bg-slate-50 btn"
                type="submit"
                value="register"
                aria-label={"submit"}
            />
        </form>
    );
};

export default RegisterForm;
