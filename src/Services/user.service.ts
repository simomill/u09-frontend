import axios from "axios";


const API_URL = "http://localhost:8000/users";

// Get individual user
export const getUser = async (username: string) => {
    const response = await axios.get(`${API_URL}/${username}`);

    return response.data;
};

// Get all users
export const getAllUsers = async () => {
    const response = await axios.get(`${API_URL}/`);

    return response.data;
};

export const uploadImage = async (formData: any) => {
    const response = await axios.post(`${API_URL}/upload`, formData, { headers: { "Content-Type": "multipart/form-data" } });
    
    return response;
};

export const getUserPhotos = async (username: string) => {
    const response = await axios.get(`${API_URL}/photos/${username}`);

    return response.data;
};

export const deleteUserPhoto = async (photoId: string) => {
    const response = await axios.delete(`${API_URL}/photos/${photoId}`);

    return response;
}
