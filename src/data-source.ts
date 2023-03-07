import { DataSource } from "typeorm";
import "dotenv/config";
import { User } from "./entities/User.entity";
import { Address } from "./entities/Address.entity";
import { Announcement } from "./entities/Announcement.entity";
import { Bid } from "./entities/Bid.entity";
import { Comment } from "./entities/Comments.entity";
import { Image } from "./entities/Image.entity";
import { initialCreateTables1678211190914 } from "./migrations/1678211190914-initialCreateTables";

const AppDataSource = new DataSource(
  process.env.NODE_ENV === "test"
    ? {
        type: "sqlite",
        database: ":memory:",
        synchronize: true,
        entities: [User, Address, Announcement, Bid, Comment, Image],
      }
    : {
        type: "postgres",
        host: process.env.DB_HOST,
        port: 5432,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB,
        logging: true,
        synchronize: false,
        // entities: ["src/entities/*.ts"],
        entities: [User, Address, Announcement, Bid, Comment, Image],
        // migrations: ["src/migrations/*.ts"],
        migrations: [initialCreateTables1678211190914],
      }
);

export default AppDataSource;
