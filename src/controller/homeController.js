const handleHome = (req, res) => {
    return res.render('home.ejs');
}

const handleUser = (req, res) => {
    return res.render('user.ejs');
}

module.exports = {
    handleHome, handleUser
}