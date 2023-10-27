import userService from '../service/userService'
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

    // let hashPassword = bcrypt.hashSync(password, salt);
    // console.log('>>>check hash password: ', hashPassword)

    // let check = bcrypt.compareSync(password, hashPassword); // true
    // console.log('>>>check password: ', check)
    userService.createNewUser(email, password, username);
    userService.listUser();


    return res.send('handleNewCreateUser');
}

module.exports = {
    handleHome, handleUser, handleNewCreateUser
}