import axios from '../axios';
// import axios from 'axios';
const handleLoginApi = (email, password) => {
    return axios.post("/api/login", { email, password });
}

const getAllUsers = (id) => {
    return axios.get(`/api/get-all-users?id=${id}`);
}

const createNewUserService = (data) => {
    return axios.post('/api/create-user', data)
}
const deleteUserService = (id) => {
    return axios.delete(`/api/delete-user?id=${id}`)
}

const updateUserService = (data) => {
    return axios.put('/api/edit-user', data);
}

export { handleLoginApi, getAllUsers, createNewUserService, deleteUserService, updateUserService }