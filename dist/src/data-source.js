"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("dotenv/config");
const path_1 = __importDefault(require("path"));
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const dataSourceConfig = () => {
    const entitiesPath = path_1.default.join(__dirname, "./entities/*.{js,ts}");
    const migrationsPath = path_1.default.join(__dirname, "./migrations/*.{js,ts}");
    const nodeEnv = process.env.NODE_ENV;
    if (nodeEnv === "production") {
        return {
            type: "postgres",
            url: process.env.DATABASE_URL,
            entities: [entitiesPath],
            migrations: [migrationsPath],
        };
    }
    return {
        type: "postgres",
        host: process.env.PGHOST,
        port: parseInt(process.env.PGPORT),
        username: process.env.PGUSER,
        password: process.env.PGPASSWORD,
        database: process.env.PGDATABASE,
        logging: false,
        entities: [entitiesPath],
        migrations: [migrationsPath],
    };
};
exports.AppDataSource = new typeorm_1.DataSource(dataSourceConfig());
// const AppDataSource = new DataSource(
//   process.env.NODE_ENV === "test"
//     ? {
//         type: "sqlite",
//         database: ":memory:",
//         synchronize: true,
//         entities: [User, Address, Announcement, Bid, Comment, Image],
//       }
//     : {
//         type: "postgres",
//         host: process.env.DB_HOST,
//         port: 5432,
//         username: process.env.DB_USER,
//         password: process.env.DB_PASSWORD,
//         database: process.env.DB,
//         logging: true,
//         synchronize: false,
//         // entities: ["src/entities/*.ts"],
//         entities: [User, Address, Announcement, Bid, Comment, Image],
//         // migrations: ["src/migrations/*.ts"],
//         migrations: [
//           initialTest1676496921661,
//           addActualBidAnnounc1676566012997,
//           addDelCascadeImgAnn1676573798163,
//           addDelCascadeCommAnn1676576083351,
//           addDelCascadeBidsAnn1676578918727,
//         ],
//       }
// );
// export default AppDataSource;
