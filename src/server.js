import express from "express";
import confingViewEngine from './config/viewEngine';
import initWebRoutes from "./routes/web";
import initApiRoutes from "./routes/api"
import configCors from "./config/cors"
require("dotenv").config();
import bodyParser from "body-parser";
import connection from "./config/connectDB";

const app = express();
const PORT = process.env.PORT || 8080;


//config view engine
confingViewEngine(app);

//config Cors 
configCors(app);

//config body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//test connection db
connection();

// init web route
initWebRoutes(app);

//init Api route
initApiRoutes(app);


app.listen(PORT, () => {
    console.log('JWT Backend running', PORT)
})
