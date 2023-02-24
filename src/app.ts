import "reflect-metadata";
import "express-async-errors";
import express from "express";
import { routes } from "./routes";
import errorMiddleWare from "./middlewares/error.middleware";
import swaggerUi from "swagger-ui-express";
import bodyParser = require("body-parser");
import swaggerFile = require("./swagger/swagger_output.json");

let cors = require("cors");

const app = express();

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

routes(app);
app.use(errorMiddleWare);

export default app;
