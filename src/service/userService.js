// get the client
import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';
import bluebird from 'bluebird';
import db from '../models/models/index';

// create the connection, specify bluebird as Promise
// const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'jwt', Promise: bluebird });

const salt = bcrypt.genSaltSync(10);

// create the connection to database
// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     database: 'jwt'
// });


const hashUserPassword = (userPassword) => {
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword;
}

const createNewUser = async (email, password, username) => {
    let hashPassword = hashUserPassword(password);

    try {
        await db.User.create({
            username: username,
            email: email,
            password: hashPassword
        })
    } catch (error) {
        console.log('check err: ', error)
    }
}

const getListUser = async () => {
    //test relationships
    let newUser = await db.User.findOne({
        where: { id: 1 },
        attributes: ['id', 'username', 'email'],
        include: { model: db.Group, attributes: ['name', 'description'] },
        raw: true,
        nest: true
    })

    let r = await db.Role.findAll({
        include: { model: db.Group, where: { id: 1 } },
        raw: true,
        nest: true
    })

    console.log('>>check newUser: ', newUser)
    console.log('>>check new g: ', r)

    let users = [];
    users = await db.User.findAll();
    return users;
}

const deleteUser = async (userID) => {
    await db.User.destroy({
        where: { id: userID }
    })

    // const connection = await mysql.createConnection({
    //     host: 'localhost',
    //     user: 'root',
    //     database: 'jwt',
    //     Promise: bluebird
    // });
    // let user = [];

    // try {
    //     const [rows, fields] = await connection.execute(`DELETE FROM user WHERE id=?`, [id]);
    //     return rows;
    // } catch (error) {
    //     console.log('check err: ', error)
    // }
}

const getUserById = async (id) => {
    let user = {};
    user = await db.User.findOne({
        where: { id: id }
    })
    return user.get({ plain: true });

    // const connection = await mysql.createConnection({
    //     host: 'localhost',
    //     user: 'root',
    //     database: 'jwt',
    //     Promise: bluebird
    // });
    // let user = [];

    // try {
    //     const [rows, fields] = await connection.execute(`SELECT * FROM user WHERE id=?`, [id]);
    //     return rows;
    // } catch (error) {
    //     console.log('check err: ', error)
    // }
}

const updateUserInfor = async (email, password, username, id) => {
    await db.User.update({ email: email, password: password, username: username }, {
        where: {
            id: id
        }
    });

    // const connection = await mysql.createConnection({
    //     host: 'localhost',
    //     user: 'root',
    //     database: 'jwt',
    //     Promise: bluebird
    // });
    // let user = [];

    // try {
    //     const [rows, fields] = await connection.execute(`UPDATE user SET email = ?, password = ?, username = ?
    //     WHERE id=?`, [email, password, username, id]);
    //     return rows;
    // } catch (error) {
    //     console.log('check err: ', error)
    // }
}

module.exports = {
    createNewUser,
    getListUser,
    deleteUser,
    getUserById,
    updateUserInfor
}