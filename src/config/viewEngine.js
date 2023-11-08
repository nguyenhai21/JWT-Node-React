import express from "express";

/**
 * 
 * @param {*} app -express app
 */

const confingViewEngine = (app) => {
    app.use(express.static('./src/public'));
    app.set("view engine", "ejs");
    app.set("views", "./src/views");
}

export default confingViewEngine;