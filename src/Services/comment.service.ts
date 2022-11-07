import axios from "axios";
import { ICommentData } from "../Models";

const API_URL =
    process.env.NODE_ENV === "production"
        ? `${process.env.REACT_APP_API_URL}/comments`
        : "http://localhost:3000/comments";

// GET ALL COMMENTS
export const getComments = async () => {
    const response = await axios.get(`${API_URL}/`);

    return response;
};

// POST NEW COMMENT
export const postComment = async (data: ICommentData) => {
    const response = await axios.post(`${API_URL}`, data);

    return response;
};

// DELETE COMMENT
export const deleteComment = async (commentId: string) => {
    const response = await axios.delete(`${API_URL}/${commentId}`);

    return response;
};
