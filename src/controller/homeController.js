import userService from '../service/userService'
const handleHome = (req, res) => {
    return res.render('home.ejs');
}

const handleUser = async (req, res) => {
    let userList = await userService.getListUser();
    console.log('check user list: ', userList)
    return res.render('user.ejs', { userList });
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



    return res.send('handleNewCreateUser');
}

module.exports = {
    handleHome, handleUser, handleNewCreateUser
}