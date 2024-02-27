// import { where } from "sequelize"
import db from "../models/models/index"
import bcrypt from 'bcryptjs';
import { raw } from "body-parser";
import { Op } from "sequelize";

const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (userPassword) => {
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword;
}

const checkEmailExist = async (userEmail) => {
    let user = await db.User.findOne({
        where: { email: userEmail }
    })
    if (user) {
        return true;
    }
    return false;
};

const checkPhoneExist = async (userPhone) => {
    let user = await db.User.findOne({
        where: { phone: userPhone }
    })
    if (user) {
        return true;
    }
    return false;
};

const registerNewUser = async (rawUserData) => {
    try {
        //check email and phonenumber are exist
        let isEmailExist = await checkEmailExist(rawUserData.email);
        if (isEmailExist === true) {
            return {
                EM: 'The email is already exist',
                EC: 1
            }
        }
        let isPhoneExist = await checkPhoneExist(rawUserData.phone);
        if (isPhoneExist === true) {
            return {
                EM: 'The phone number is already exist',
                EC: 1
            }
        }
        //hash user password
        let hashPassword = hashUserPassword(rawUserData.password)

        //create new user
        await db.User.create({
            email: rawUserData.email,
            username: rawUserData.username,
            password: hashPassword,
            phone: rawUserData.phone
        })
        console.log('>>>rawUserData: ', rawUserData)

        return {
            EM: 'A user is create succesfully',
            EC: '0'
        }

    } catch (error) {
        console.log('check error', error)
        return {
            EM: 'Somethong wrongs in service...',
            EC: -2
        }
    }
}

const checkPassword = (inputPassword, hashPassword) => {
    return bcrypt.compareSync(inputPassword, hashPassword); // true or false
}

const handleUserLogin = async (rawData) => {
    try {
        let user = await db.User.findOne({
            where: {
                [Op.or]: [
                    { email: rawData.valueLogin },
                    { phone: rawData.valueLogin }
                ]
            }
        })
        if (user) {
            console.log('>>>found user with email/phone')
            let isCorrectPassword = checkPassword(rawData.password, user.password)
            if (isCorrectPassword === true) {
                return {
                    EM: 'OK',
                    EC: 0,
                    DT: ''
                }
            }
        }
        console.log('>>Input user with email/phone', rawData.valueLogin, `passsword: `, rawData.password);
        return {
            EM: 'Your email/phone number or password  is incorrect! ',
            EC: 1,
            DT: ''
        }


        // let isPhoneExist = await checkPhoneExist(rawUserData.phone);
        // if (isPhoneExist === true) {
        //     return {
        //         EM: 'The phone number is already exist',
        //         EC: 1,
        //         DT: ''
        //     }
        // }
    } catch (error) {
        console.log('>>check error:', error)
        return {
            EM: 'Somethong wrongs in service...',
            EC: -2
        }
    }

}

module.exports = {
    registerNewUser,
    handleUserLogin,
    hashUserPassword,
    checkEmailExist,
    checkPhoneExist
}