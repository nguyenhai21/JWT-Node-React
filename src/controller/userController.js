import userApiService from '../service/userApiService';

const readFunc = async (req, res) => {

    try {
        let data = await userApiService.getAllUser();

        return res.status(200).json({
            EM: data.EM,//error mesage
            EC: data.EC, //error code
            DT: data.DT, //data
        })
    } catch (error) {
        console.log('>>check err: ', error)
        return res.status(500).json({
            EM: 'Error from server',//error mesage
            EC: '-1', //error code
            DT: '', //data
        })
    }
}

const createFunc = (req, res) => {
    try {

    } catch (error) {
        console.log('>>check err: ', error)
        return res.status(500).json({
            EM: 'Error from server',//error mesage
            EC: '-1', //error code
            DT: '', //data
        })
    }
}

const updateFunc = (req, res) => {
    try {

    } catch (error) {
        console.log('>>check err: ', error)
        return res.status(500).json({
            EM: 'Error from server',//error mesage
            EC: '-1', //error code
            DT: '', //data
        })
    }
}

const deleteFunc = (req, res) => {
    try {

    } catch (error) {
        console.log('>>check err: ', error)
        return res.status(500).json({
            EM: 'Error from server',//error mesage
            EC: '-1', //error code
            DT: '', //data
        })
    }
}

module.exports = {
    readFunc, createFunc, updateFunc, deleteFunc
}