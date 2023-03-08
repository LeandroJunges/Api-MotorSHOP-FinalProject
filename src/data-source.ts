import "dotenv/config";
import path from "path";
import "reflect-metadata"
import { DataSource, DataSourceOptions } from "typeorm";
const dataSourceConfig = (): DataSourceOptions => {
  const entitiesPath: string = path.join(__dirname, "./entities/*.{js,ts}");
  const migrationsPath: string = path.join(__dirname, "./migrations/*.{js,ts}");
  const nodeEnv:string | undefined = process.env.NODE_ENV;

  if(nodeEnv === "production" ){
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
    port: parseInt(process.env.PGPORT!),
    username: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    logging: false,
    entities: [entitiesPath],
    migrations: [migrationsPath],
  };
};

export const AppDataSource = new DataSource(dataSourceConfig());

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
