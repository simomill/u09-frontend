import axios from "axios";
import { ILoginModel, IRegisterModel } from "../Models";

const API_URL =
    process.env.NODE_ENV === "production"
        ? `${process.env.REACT_APP_API_URL}/auth`
        : `http://localhost:3000/auth`;


// Post register user
export const registerUser = async (registerData: IRegisterModel) => {
        const response = await axios
            .post(`${API_URL}/register`, registerData)
            .then((data) => {
                console.log(data);
                return data;
            });

        console.log(response);

    return response.status === 200; 
  
};

// Post login user and save token
export const login = async (loginData: ILoginModel) => {
    try {
        const response = await axios
            .post(`${API_URL}/login`, loginData)
            .then((data) => {
                console.log(data);
                return data;
            });

        console.log(response);

        if (
            response.data !== "Wrong Password" &&
            response.data !== "User don't exist"
        ) {
            localStorage.setItem("accesstoken", response.data.token);
            localStorage.setItem("username", response.data.username);

            if (response.data.isAdmin !== 0) {
                localStorage.setItem("isAdmin", response.data.isAdmin);
            }
        }

        return response;
    } catch (error) {
        console.log(error);
    }
};

// Logout by clearing token
export const logout = async () => {
    localStorage.clear();
    localStorage.removeItem("accesstoken");
    localStorage.removeItem("username");
};

// Get accesstoken from localStorage
export const getAuthJWT = () => {
    const token = localStorage.getItem("accesstoken");

    if (token) {
        return token;
    } else {
        return false;
    }
};

export const getIsAdmin = () => {
    return localStorage.getItem("isAdmin");
};

// Get auth header with token
export const getAuthHeader = () => {
    const token = getAuthJWT();

    if (token) {
        return { Authorization: token };
    } else {
        return { Authorization: "" };
    }
};

// Returns true if token exists
export const checkIsLoggedIn = () => {
    const token = getAuthJWT();
    const isAdmin = getIsAdmin();
    return { token: Boolean(token), isAdmin: Boolean(isAdmin) };
};

// Get auth/test from API
export const getAuthTest = async () => {
    const response = await axios.get(`${API_URL}/test`, {
        headers: getAuthHeader(),
    });
    return response.data;
};
