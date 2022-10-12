import axios from 'axios';

const API_URL = 'http://localhost:8000/auth';

export interface LoginModel {
    username: string
    password: string
};

export interface RegisterModel {
    username: string
    password: string
    name: string
    email: string
    passconf: string
}
// Post register user
export const register = async (registerData: RegisterModel) => {
    const response = await axios.post(`${API_URL}/register`, registerData);
    return response.status === 200;
}

// Post login user and save token 
export const login = async (loginData: LoginModel) => {
    const response = await axios.post(`${API_URL}/login`, loginData);

    const success = (response.status === 200);

    if (success) {
        localStorage.setItem("accesstoken", response.data);
    }

    return success;
}

// Logout by clearing token
export const logout = async () => {
    localStorage.removeItem("accesstoken");
}

// Get accesstoken from localStorage
export const getAuthJWT = () => {
    const token = localStorage.getItem("accesstoken");

    if (token) {
        return token;
    } else {
        return false;
    }
}

// Get auth header with token
export const getAuthHeader = () => {
    const token = getAuthJWT();

    if (token) {
        return { Authorization: token };
    } else {
        return { Authorization: '' };
    }
}

// Returns true if token exists
export const checkIsLoggedIn = () => {
    const token = getAuthJWT();
    return Boolean(token);
}

// Get auth/test from API
export const getAuthTest = async () => {
    const response = await axios.get(`${API_URL}/test`, { headers: getAuthHeader() });
    return response.data;
}