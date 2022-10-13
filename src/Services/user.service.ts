import axios from "axios";

const API_URL = 'http://localhost:8000/users';

// Get individual user 
export const getUser = async (username: string) => {
    const response = await axios.get(`${API_URL}/${username}`);
    
    return response.data;
}

// Get all users 
export const getAllUsers = async () => {
    const response = await axios.get(`${API_URL}/`);
    
    return response.data;
}