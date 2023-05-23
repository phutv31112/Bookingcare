import db from '../models/index';
import bcrypt from 'bcryptjs';

let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let isExist = await checkEmail(email);
            if (isExist) {
                let user = await db.User.findOne({
                    attributes: ['email', 'roleId', 'password'],
                    where: {
                        email
                    },
                    raw: true
                })
                if (user) {
                    let check = await bcrypt.compareSync(password, user.password);
                    if (check) {
                        userData.errCode = 0;
                        userData.message = "oke"
                        delete user.password;
                        userData.user = user;
                    } else {
                        userData.errCode = 2;
                        userData.message = 'wrong password';

                    }
                } else {
                    userData.errCode = 3;
                    userData.message = "user not found";

                }
            } else {
                userData.errCode = 1;
                userData.message = "Email is not exist in system";
            }
            resolve(userData)
        } catch (error) {
            reject(error)
        }
    })
}

let checkEmail = (email) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: {
                    email: email
                }
            })
            if (user) {
                resolve(true);
            } else {
                resolve(false)
            }
        } catch (error) {
            reject(error)
        }

    })
}

let getAllUsers = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = '';
            if (id === "all") {
                users = await db.User.findAll({
                    attributes: {
                        exclude: ["password"]
                    }
                });
            }
            if (id && id !== 'all') {
                users = await db.User.findOne({
                    where: {
                        id
                    },
                    attributes: {
                        exclude: ['password']
                    }
                })
            }
            resolve(users)
        } catch (error) {
            reject(error)
        }
    })
}

const salt = bcrypt.genSaltSync(10);
let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let check = await checkEmail(data.email);
            if (check) {
                resolve({
                    errCode: 1,
                    message: "Email is already exist!"
                })
            } else {
                let hashPassword = await hashUserPassword(data.password);
                let role = "";
                if (data.roleId === '1') {
                    role = "Admin"
                } else if (data.roleId === '2') {
                    role = "Doctor"
                } else {
                    role = "Patient"
                }
                await db.User.create({
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                    password: hashPassword,
                    address: data.address,
                    gender: data.gender === '1' ? true : false,
                    roleId: role,
                    phonenumber: data.phonenumber,
                })
                resolve({
                    errCode: 0,
                    message: "Oke"
                })
            }

        } catch (error) {
            reject(error)
        }
    })
}

let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (error) {
            reject(error)
        }
    })
}

let deleteUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: {
                    id
                }
            })
            if (user) {
                await db.User.destroy({
                    where: {
                        id
                    }
                })
                resolve({
                    errCode: 0,
                    message: "Delete user successfully!"
                })
            } else {
                resolve({
                    errCode: 2,
                    message: "User is not exist!"
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

let updateUserById = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 2,
                    message: "Missing require parameter!"
                })
            } else {
                let user = await db.User.findOne({
                    where: {
                        id: data.id
                    }
                })
                if (user) {
                    await db.User.update({
                        firstName: data.firstName,
                        lastName: data.lastName,
                        address: data.address
                    }, {
                        where: {
                            id: data.id
                        }
                    })
                    resolve({
                        errCode: 0,
                        message: "update user successfully!"
                    })
                } else {
                    resolve({
                        errCode: 1,
                        message: "User is not exist!"
                    })
                }
            }
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    handleUserLogin,
    getAllUsers,
    createNewUser,
    deleteUser,
    updateUserById,
}