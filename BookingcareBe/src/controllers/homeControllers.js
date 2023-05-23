import db from '../models/index';

import { createNewUser, getAllUser, getUserInfoById, updateUserById, deleteUserById } from '../services/CRUDService';

let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();
        return res.render("homepage.ejs", {
            data: JSON.stringify(data)
        });
    } catch (error) {
        console.log(error);
    }
}

let getCRUD = (req, res) => {
    res.render('crud.ejs');
}

let postCRUD = async (req, res) => {
    let message = await createNewUser(req.body);
    res.send("create new user success");
    console.log(message)
}

let getListUser = async (req, res) => {
    let users = await getAllUser();
    console.log(users);
    return res.render('displayCRUD.ejs', {
        dataTable: users
    });
}

let getUserEdit = async (req, res) => {
    let userId = req.query.id;
    console.log(userId);
    if (userId) {
        let userData = await getUserInfoById(userId);
        console.log(userData);
        res.render("editCRUD.ejs", {
            user: userData
        })
    } else {
        res.status(404).send("User not found");
    }

}
let updateUser = async (req, res) => {
    let dataUser = req.body;
    let users = await updateUserById(dataUser);
    return res.render('displayCRUD.ejs', {
        dataTable: users
    });
}
let deleteCRUD = async (req, res) => {
    let userId = req.query.id;
    if (userId) {
        let users = await deleteUserById(userId);
        return res.render('displayCRUD.ejs', {
            dataTable: users
        });

    } else {
        res.send("User not found")
    }
}

module.exports = {
    getHomePage,
    getCRUD,
    postCRUD,
    getListUser,
    getUserEdit,
    updateUser,
    deleteCRUD,
}