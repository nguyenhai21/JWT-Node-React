// get the client
import mysql from 'mysql2';

import bcrypt from 'bcryptjs';
const salt = bcrypt.genSaltSync(10);

// create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'jwt'
});


const handleHome = (req, res) => {
    return res.render('home.ejs');
}

const handleUser = (req, res) => {
    return res.render('user.ejs');
}

const handleNewCreateUser = (req, res) => {
    // let email = req.body.email;
    // let password = req.body.password;
    // let username = req.body.username;
    let { email, password, username } = req.body;

    let hashPassword = bcrypt.hashSync(password, salt);
    console.log('>>>check hash password: ', hashPassword)

    let check = bcrypt.compareSync(password, hashPassword); // true
    console.log('>>>check password: ', check)

    connection.query(
        `INSERT INTO users (email, password, username)
        VALUES (?, ?, ?)`, [email, password, username],
        function (err, results, fields) {
            if (err) {
                console.log(err)
            }
            console.log('success')
        }
    );
    return res.send('handleNewCreateUser');
}

module.exports = {
    handleHome, handleUser, handleNewCreateUser
}