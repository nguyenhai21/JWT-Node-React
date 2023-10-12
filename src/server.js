import express from "express";
import confingViewEngine from './configs/viewEngine';
import initWebRoutes from "./routes/web";
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8080;

//config view engine
confingViewEngine(app);

// init web route
initWebRoutes(app);


app.listen(PORT, () => {
    console.log('JWT Backend running', PORT)
})
