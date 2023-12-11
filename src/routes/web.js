import express from "express";
import homeController from "../controller/homeController";
import apiController from '../controller/apiController';

const router = express.Router();

/**
 * 
 * @param {*} app -express app
 */

const initWebRoutes = (app) => {
    router.get("/", homeController.handleHome);
    router.get('/user', homeController.handleUser);
    router.post('/users/create-user', homeController.handleNewCreateUser);
    router.post('/delete-user/:id', homeController.handleDeleteUser);
    router.get('/update-user/:id', homeController.getUpdateUserPage);
    router.post('/user/update-user', homeController.handleUpdateUser);

    router.get('/api/test-api', apiController.testApi)

    return app.use("/", router);
}

export default initWebRoutes;