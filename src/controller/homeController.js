import userService from '../service/userService'
const handleHome = (req, res) => {
    return res.render('home.ejs');
}

const handleUser = async (req, res) => {
    let userList = await userService.getListUser();
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
    return res.redirect('/user');
}

const handleDeleteUser = async (req, res) => {
    await userService.deleteUser(req.params.id);
    return res.redirect('/user');
}

const getUpdateUserPage = async (req, res) => {
    let id = req.params.id;
    let user = await userService.getUserById(id);
    let userData = {};
    if (user && user.length > 0) {
        userData = user[0];
    }
    return res.render('user-update.ejs', { userData });
}

const handleUpdateUser = async (req, res) => {
    let { email, password, username, id } = req.body;
    await userService.updateUserInfor(email, password, username, id);
    return res.redirect('/user');
}

module.exports = {
    handleHome,
    handleUser,
    handleNewCreateUser,
    handleDeleteUser,
    getUpdateUserPage,
    handleUpdateUser
}