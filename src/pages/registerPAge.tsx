import React, { useState, FC, ChangeEvent, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register, RegisterModel } from "../Services/auth.service";

const RegisterPage: FC = () => {
    // states and navigation
    const navigate = useNavigate();
    const [registerData, setRegisterData] = useState<RegisterModel>({
        username: "",
        password: "",
        name: "",
        email: "",
        passconf: "",
    });
    const [loading, setLoading] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);
    const [disabledStyle, setDisabledStyle] = useState("opacity-100");

    // Change username state from input
    function handleChangeUsername(e: ChangeEvent<HTMLInputElement>) {
        setRegisterData({
            username: e.target.value,
            password: registerData.password,
            name: registerData.name,
            email: registerData.email,
            passconf: registerData.passconf,
        });
    }
    // Change name state from input
    function handleChangeName(e: ChangeEvent<HTMLInputElement>) {
        setRegisterData({
            username: registerData.username,
            password: registerData.password,
            name: e.target.value,
            email: registerData.email,
            passconf: registerData.passconf,
        });
    }
    // Change username state from input
    function handleChangeEmail(e: ChangeEvent<HTMLInputElement>) {
        setRegisterData({
            username: registerData.username,
            password: registerData.password,
            name: registerData.name,
            email: e.target.value,
            passconf: registerData.passconf,
        });
    }

    // Change password state from input
    function handleChangePassword(e: ChangeEvent<HTMLInputElement>) {
        setRegisterData({
            username: registerData.username,
            password: e.target.value,
            name: registerData.name,
            email: registerData.email,
            passconf: registerData.passconf,
        });
    }

    // Change password state from input
    function handleChangePassConf(e: ChangeEvent<HTMLInputElement>) {
        setRegisterData({
            username: registerData.username,
            password: registerData.password,
            name: registerData.name,
            email: registerData.email,
            passconf: e.target.value,
        });
    }

    useEffect(() => {
        if (registerData.password !== registerData.passconf) {
            setIsDisabled(true);
        } else {
            setIsDisabled(false);
        }
    }, [registerData.passconf, registerData.password]);

    async function handleClickRegister() {
        setLoading(true);

        try {
            const success = await register(registerData);

            // Navigate if successful
            if (success) {
                navigate("/login");
            } else {
                alert("Error registering user");
            }
        } catch (error) {
            alert(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex flex-col justify-center items-center h-screen gap-4">
            <h1 className="font-bold text-3xl mb-6 text-cyan-900">DSPLAY</h1>

            <input
                className="border rounded py-2 px-3 mb-3"
                type="text"
                name="name"
                id="name"
                placeholder="name"
                value={registerData.name}
                onChange={handleChangeName}
            />

            <input
                className="border rounded py-2 px-3 mb-3"
                type="email"
                name="email"
                id="email"
                placeholder="email"
                value={registerData.email}
                onChange={handleChangeEmail}
            />

            <input
                className="border rounded py-2 px-3 mb-3"
                type="text"
                name="username"
                id="username"
                placeholder="username"
                value={registerData.username}
                onChange={handleChangeUsername}
            />

            <input
                className="border rounded py-2 px-3 mb-3"
                type="password"
                name="pass"
                id="pass"
                placeholder="password"
                value={registerData.password}
                onChange={handleChangePassword}
            />

            <input
                className="border rounded py-2 px-3 mb-3"
                type="password"
                name="passconf"
                id="passconf"
                placeholder="repeat password"
                value={registerData.passconf}
                onChange={handleChangePassConf}
            />

            {!isDisabled && (
                <input
                    className="border rounded py-2 px-3 bg-slate-50 cursor-pointer"
                    type="submit"
                    value="register"
                    disabled={isDisabled}
                    onClick={handleClickRegister}
                />
            )}

            {isDisabled && <p className="text-red-700">Passwords must match</p>}

            <Link to={"/login"} className="text-cyan-900 hover:text-cyan-600">
                Already a user?
            </Link>
        </div>
    );
};

export default RegisterPage;
