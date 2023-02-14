import "reflect-metadata";
import "express-async-errors";
import express from "express";
import { routes } from "./routes";
import errorMiddleWare from "./middlewares/error.middleware";

const app = express();
app.use(express.json());

routes(app);
app.use(errorMiddleWare);

export default app;
