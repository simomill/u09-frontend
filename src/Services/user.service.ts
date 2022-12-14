import axios from "axios";
import { IRole, IUpdateData } from "../Models";

const API_URL =
    process.env.NODE_ENV === "production"
        ? `${process.env.REACT_APP_API_URL}/users`
        : `http://localhost:3000/users`;



// Get individual user
export const getUser = async (username: string) => {
    const response = await axios.get(`${API_URL}/${username}`);

    return response.data;
};

// Get all users
export const getAllUsers = async () => {
    const response = await axios.get(`${API_URL}/`);

    return response;
};

export const uploadImage = async (formData: any) => {
    const response = await axios.post(`${API_URL}/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });

    return response;
};

export const getPhotos = async () => {
    const response = await axios.get(`${API_URL}/photos`);

    return response;
};

export const getUserPhotos = async (username: string) => {
    const response = await axios.get(`${API_URL}/photos/${username}`);

    return response.data;
};

export const deleteUserPhoto = async (photoId: string) => {
    const response = await axios.delete(`${API_URL}/photos/${photoId}`);

    return response;
};

export const deleteUser = async (userName: string) => {
    const response = await axios.delete(`${API_URL}/${userName}`);

    return response;
};

export const updateUser = async (updateData: IUpdateData, userId: string) => {
    const response = await axios.put(`${API_URL}/${userId}`, updateData);

    return response;
};

export const changeUserRole = async (userId: string, currentRole: IRole) => {
    const response = await axios.put(`${API_URL}/${userId}/role`, currentRole);

    return response;
};
