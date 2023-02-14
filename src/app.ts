import "reflect-metadata";
import "express-async-errors";
import express from "express";
import { routes } from "./routes";
import errorMiddleWare from "./middlewares/error.middleware";

let cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

routes(app);
app.use(errorMiddleWare);

export default app;
