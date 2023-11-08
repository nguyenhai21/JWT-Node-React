import express from "express";
import confingViewEngine from './config/viewEngine';
import initWebRoutes from "./routes/web";
require("dotenv").config();
import bodyParser from "body-parser";

const app = express();
const PORT = process.env.PORT || 8080;

//config view engine
confingViewEngine(app);

//config body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// init web route
initWebRoutes(app);


app.listen(PORT, () => {
    console.log('JWT Backend running', PORT)
})
