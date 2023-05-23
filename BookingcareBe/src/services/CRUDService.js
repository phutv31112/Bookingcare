import bcrypt from 'bcryptjs';
import db from '../models/index';

const salt = bcrypt.genSaltSync(10);
let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
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
            resolve("OK create new user successfully")
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

let getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let userList = await db.User.findAll({
                raw: true
            });
            resolve(userList);
        } catch (error) {
            reject(error);
        }
    })
}

let getUserInfoById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: {
                    id: userId
                },
                raw: true
            })
            resolve(user)
        } catch (error) {
            reject(error)
        }
    })
}
let updateUserById = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log(data);
            await db.User.update({
                email: data.email,
                firstName: data.firstName,
                lastName: data.lastName
            }, {
                where: {
                    id: data.id
                }
            })
            let userList = await db.User.findAll({
                raw: true
            });
            resolve(userList);
        } catch (error) {
            reject(error)
        }
    })
}

let deleteUserById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.User.destroy({
                where: {
                    id: id
                }
            })
            let userList = await db.User.findAll({
                raw: true
            });
            resolve(userList);
        } catch (error) {
            reject(error);
        }
    })
}
module.exports = {
    createNewUser,
    getAllUser,
    getUserInfoById,
    updateUserById,
    deleteUserById,
}