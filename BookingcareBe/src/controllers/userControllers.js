
import userServices from '../services/userServices';

let handleLogin = async (req, res) => {
    let { email, password } = req.body;
    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: "Missing input parameter"
        })
    }
    let userData = await userServices.handleUserLogin(email, password);
    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.message,
        user: userData.user ? userData.user : {}
    })

}
let handleGetAllUser = async (req, res) => {
    let id = req.query.id;
    if (!id) {
        return res.status(500).json({
            errCode: 1,
            errMessage: "Missing require parameter!",
            user: {}
        })
    } else {
        let users = await userServices.getAllUsers(id);
        return res.status(200).json({
            errCode: 0,
            errMessage: "Oke",
            users
        })
    }
}

let handleCreateUser = async (req, res) => {
    let message = await userServices.createNewUser(req.body);
    return res.status(200).json(message)
}
let handleEditUser = async (req, res) => {
    let data = req.body;
    let message = await userServices.updateUserById(data);
    return res.status(200).json(message);
}

let handleDeleteUser = async (req, res) => {
    let id = req.query.id;
    if (!id) {
        return res.status(500).json({
            errCode: 1,
            message: 'Missing require parameters!'
        })
    }
    let message = await userServices.deleteUser(id)
    return res.status(200).json(message);
}

module.exports = {
    handleLogin,
    handleGetAllUser,
    handleCreateUser,
    handleDeleteUser,
    handleEditUser,
}