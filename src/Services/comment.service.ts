import axios from "axios";

const API_URL = "https://dsplay-backend.onrender.com/comments";


export interface commentData {
    username: string;
    photoId: string;
    message: string;
};


// GET ALL COMMENTS
export const getComments = async () => {
    const response = await axios.get(`${API_URL}/`);

    return response;
}

// POST NEW COMMENT
export const postComment = async (data: commentData) => {
    const response = await axios.post(`${API_URL}`, data);

    return response;
}

// DELETE COMMENT
export const deleteComment = async (commentId: string) => {
    const response = await axios.delete(`${API_URL}/${commentId}`);

    return response;
}