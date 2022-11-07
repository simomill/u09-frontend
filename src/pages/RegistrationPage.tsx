import React, { useState, FC, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../Services/auth.service";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Loader from "./components/LoaderComponent";
import RegisterForm from "./components/RegisterFormComponent";

const RegisterPage: FC = () => {
    // states and navigation
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [statusMsg, setStatusMsg] = useState<any>("");

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
        <div className="formGroup">
            <h1 className="logo">DSPLAY</h1>

            <RegisterForm
                statusMsg={statusMsg}
                setStatusMsg={setStatusMsg}
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
