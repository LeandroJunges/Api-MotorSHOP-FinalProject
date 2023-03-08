import {AppDataSource} from "../../../data-source";
import app from "../../../app";
import { DataSource } from "typeorm";
import { describe } from "node:test";
import request from "supertest";
import { advertiserUser, userAdvertiserLogin } from "../../mocks/users";
import { IUserResponse } from "../../../interfaces/users";

let userAdvertiserCreated: IUserResponse["user"];

describe("/login", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });
  });

  afterAll(async () => {
    await connection.destroy();
  });

  beforeAll(async () => {
    const responseUserCreated = await request(app)
      .post("/users")
      .send(advertiserUser);

    userAdvertiserCreated = responseUserCreated.body;
  });

  test("POST /login -  Must be able to login", async () => {
    const response = await request(app)
      .post("/login")
      .send(userAdvertiserLogin);

    expect(response.body).toHaveProperty("token");
    expect(response.status).toBe(200);
  });

  test("POST /login -  Must active an user after being soft delete", async () => {
    const response = await request(app)
      .post("/login")
      .send(userAdvertiserLogin);

    const responseDelete = await request(app)
      .delete(`/users/${userAdvertiserCreated.id}`)
      .set("Authorization", `Bearer ${response.body.token}`);

    const responseLogin = await request(app)
      .post("/login")
      .send(userAdvertiserLogin);

    expect(responseLogin.body.user.isActive).toEqual(true);
  });
});
