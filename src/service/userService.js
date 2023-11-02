// get the client
import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';
import bluebird from 'bluebird';

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

const createNewUser = (email, password, username) => {
    let hashPassword = hashUserPassword(password);

    connection.query(
        `INSERT INTO users (email, password, username)
        VALUES (?, ?, ?)`, [email, hashPassword, username],
        function (err, results, fields) {
            if (err) {
                console.log(err)
            }
            console.log('success create')
        }
    );
}

const getListUser = async () => {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'jwt',
        Promise: bluebird
    });
    let users = [];
    // connection.query(
    //     `Select * from users `,
    //     function (err, results, fields) {
    //         if (err) {
    //             console.log(err)
    //             return users;
    //         }
    //         users = results
    //         return users;
    //     }
    // );
    try {
        const [rows, fields] = await connection.execute(`Select * from users `);
        return rows;
    } catch (error) {
        console.log('check err: ', error)
    }
}

module.exports = {
    createNewUser,
    getListUser
}