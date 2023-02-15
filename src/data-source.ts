import { DataSource } from "typeorm";
import "dotenv/config";
import { User } from "./entities/User.entity";
import { Address } from "./entities/Address.entity";
import { Announcement } from "./entities/Announcement.entity";
import { Bid } from "./entities/Bid.entity";
import { Comment } from "./entities/Comments.entity";
import { initial1676387974969 } from "./migrations/1676387974969-initial";
import { addImgEntity1676468524148 } from "./migrations/1676468524148-addImgEntity";
import { Image } from "./entities/Image.entity";

const AppDataSource = new DataSource(
  process.env.NODE_ENV === "test"
    ? {
        type: "sqlite",
        database: ":memory:",
        synchronize: true,
        entities: ["src/entities/**.{js, ts}"],
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
        migrations: [initial1676387974969, addImgEntity1676468524148],
      }
);

export default AppDataSource;
