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
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'jwt',
        Promise: bluebird
    });
    let user = [];
    // connection.query(
    //     `Select * from user `,
    //     function (err, results, fields) {
    //         if (err) {
    //             console.log(err)
    //             return user;
    //         }
    //         user = results
    //         return user;
    //     }
    // );
    try {
        const [rows, fields] = await connection.execute(`Select * from user `);
        return rows;
    } catch (error) {
        console.log('check err: ', error)
    }
}

const deleteUser = async (id) => {

    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'jwt',
        Promise: bluebird
    });
    let user = [];

    try {
        const [rows, fields] = await connection.execute(`DELETE FROM user WHERE id=?`, [id]);
        return rows;
    } catch (error) {
        console.log('check err: ', error)
    }
}

const getUserById = async (id) => {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'jwt',
        Promise: bluebird
    });
    let user = [];

    try {
        const [rows, fields] = await connection.execute(`SELECT * FROM user WHERE id=?`, [id]);
        return rows;
    } catch (error) {
        console.log('check err: ', error)
    }
}

const updateUserInfor = async (email, password, username, id) => {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'jwt',
        Promise: bluebird
    });
    let user = [];

    try {
        const [rows, fields] = await connection.execute(`UPDATE user SET email = ?, password = ?, username = ?
        WHERE id=?`, [email, password, username, id]);
        return rows;
    } catch (error) {
        console.log('check err: ', error)
    }
}

module.exports = {
    createNewUser,
    getListUser,
    deleteUser,
    getUserById,
    updateUserInfor
}