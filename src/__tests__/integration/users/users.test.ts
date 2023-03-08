import {AppDataSource} from "../../../data-source";
import app from "../../../app";
import { DataSource } from "typeorm";
import { describe } from "node:test";
import request from "supertest";
import {
  advertiserUser,
  advertiserUserEdit,
  nonAdvertiserUser,
  nonAdvertiserUser1,
  userAdvertiserLogin,
  userNonAdvertiserLogin,
  userNonAdvertiserLogin1,
  userWrongCreate,
} from "../../mocks/users";
import { IUserResponse } from "../../../interfaces/users";
import { response } from "express";

let userAdvertiserCreated: IUserResponse["user"];
let userNonAdvertiserCreated: IUserResponse["user"];
let userNonAdvertiserCreated1: IUserResponse["user"];

describe("/users", () => {
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

  test("POST /users -  Must be able to create a advertiser user", async () => {
    const response = await request(app).post("/users/").send(advertiserUser);

    expect(response.status).toBe(201);
    expect(response.body.isAdvertiser).toEqual(true);
    expect(response.body.isActive).toEqual(true);
    expect(response.body.password).toBeUndefined();
    expect(response.body.email).toEqual(advertiserUser.email);

    userAdvertiserCreated = response.body;
  });

  test("POST /users -  Must be able to create a non advertiser user", async () => {
    const responsePost = await request(app)
      .post("/users/")
      .send(nonAdvertiserUser);

    expect(responsePost.status).toBe(201);
    expect(responsePost.body.isAdvertiser).toEqual(false);
    expect(responsePost.body.isActive).toEqual(true);
    expect(responsePost.body.password).toBeUndefined();
    expect(responsePost.body.email).toEqual(nonAdvertiserUser.email);

    const response1 = await request(app)
      .post("/users/")
      .send(nonAdvertiserUser1);

    userNonAdvertiserCreated = responsePost.body;
    userNonAdvertiserCreated1 = response1.body;
  });

  test("GET /users/:userId - Must be able to list one user", async () => {
    const responseGet = await request(app).get(
      `/users/${userAdvertiserCreated.id}/`
    );

    expect(responseGet.status).toBe(200);
    expect(responseGet.body.email).toEqual(userAdvertiserCreated.email);
    expect(responseGet.body.password).toBeUndefined();
  });

  test("DELETE /users/:userId -  Must not be able to soft delete a user being other user", async () => {
    const userAdvertiserLoginResponse = await request(app)
      .post("/login")
      .send(userAdvertiserLogin);

    const responseWrongDelete = await request(app)
      .delete(`/users/${userNonAdvertiserCreated1.id}/`)
      .set("Authorization", `Bearer ${userAdvertiserLoginResponse.body.token}`);

    expect(responseWrongDelete.status).toBe(403);
    expect(responseWrongDelete.body).toHaveProperty("message");
  });

  test("DELETE /users/:userId -  Must be able to soft delete a user", async () => {
    const userAdvertiserLoginResp = await request(app)
      .post("/login/")
      .send(userAdvertiserLogin);

    console.log(userAdvertiserLoginResp.body);

    const responseDelete = await request(app)
      .delete(`/users/${userAdvertiserCreated.id}/`)
      .set("Authorization", `Bearer ${userAdvertiserLoginResp.body.token}`);

    expect(responseDelete.status).toBe(204);

    const responseDeleteagain = await request(app)
      .delete(`/users/${userNonAdvertiserCreated1.id}/`)
      .set("Authorization", `Bearer ${userAdvertiserLoginResp.body.token}`);

    expect(responseDeleteagain.status).toBe(403);
    expect(responseDeleteagain.body).toHaveProperty("message");

    const nonAdvertiserListResponse = await request(app).get(
      `/users/${userAdvertiserCreated.id}/`
    );

    expect(nonAdvertiserListResponse.body.isActive).toEqual(false);
  });

  test("PATCH /users/:userId -  Must be able to patch a user", async () => {
    const userAdvertiserLoginResponse = await request(app)
      .post("/login")
      .send(userAdvertiserLogin);

    const responsePatch = await request(app)
      .patch(`/users/${userAdvertiserCreated.id}`)
      .send(advertiserUserEdit)
      .set("Authorization", `Bearer ${userAdvertiserLoginResponse.body.token}`);

    console.log(responsePatch.body);

    expect(responsePatch.status).toBe(200);
    expect(responsePatch.body.name).toEqual(advertiserUserEdit.name);
    expect(responsePatch.body.cpf).toEqual(advertiserUserEdit.cpf);
    expect(responsePatch.body.cellphone).toEqual(advertiserUserEdit.cellphone);
    expect(responsePatch.body.description).toEqual(
      advertiserUserEdit.description
    );
  });

  test("PATCH /users/:userId -  Must not be able to patch a user being other user", async () => {
    const userNonAdvertiserLoginResponse = await request(app)
      .post("/login")
      .send(userAdvertiserLogin);

    const response = await request(app)
      .patch(`/users/${userNonAdvertiserCreated.id}`)
      .send(advertiserUserEdit)
      .set(
        "Authorization",
        `Bearer ${userNonAdvertiserLoginResponse.body.token}`
      );

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty("message");
  });
});
