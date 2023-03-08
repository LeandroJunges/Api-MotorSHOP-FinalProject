"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../../../data-source");
const app_1 = __importDefault(require("../../../app"));
const node_test_1 = require("node:test");
const supertest_1 = __importDefault(require("supertest"));
const users_1 = require("../../mocks/users");
let userAdvertiserCreated;
let userNonAdvertiserCreated;
let userNonAdvertiserCreated1;
(0, node_test_1.describe)("/users", () => {
    let connection;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield data_source_1.AppDataSource.initialize()
            .then((res) => {
            connection = res;
        })
            .catch((err) => {
            console.error("Error during Data Source initialization", err);
        });
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield connection.destroy();
    }));
    test("POST /users -  Must be able to create a advertiser user", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).post("/users/").send(users_1.advertiserUser);
        expect(response.status).toBe(201);
        expect(response.body.isAdvertiser).toEqual(true);
        expect(response.body.isActive).toEqual(true);
        expect(response.body.password).toBeUndefined();
        expect(response.body.email).toEqual(users_1.advertiserUser.email);
        userAdvertiserCreated = response.body;
    }));
    test("POST /users -  Must be able to create a non advertiser user", () => __awaiter(void 0, void 0, void 0, function* () {
        const responsePost = yield (0, supertest_1.default)(app_1.default)
            .post("/users/")
            .send(users_1.nonAdvertiserUser);
        expect(responsePost.status).toBe(201);
        expect(responsePost.body.isAdvertiser).toEqual(false);
        expect(responsePost.body.isActive).toEqual(true);
        expect(responsePost.body.password).toBeUndefined();
        expect(responsePost.body.email).toEqual(users_1.nonAdvertiserUser.email);
        const response1 = yield (0, supertest_1.default)(app_1.default)
            .post("/users/")
            .send(users_1.nonAdvertiserUser1);
        userNonAdvertiserCreated = responsePost.body;
        userNonAdvertiserCreated1 = response1.body;
    }));
    test("GET /users/:userId - Must be able to list one user", () => __awaiter(void 0, void 0, void 0, function* () {
        const responseGet = yield (0, supertest_1.default)(app_1.default).get(`/users/${userAdvertiserCreated.id}/`);
        expect(responseGet.status).toBe(200);
        expect(responseGet.body.email).toEqual(userAdvertiserCreated.email);
        expect(responseGet.body.password).toBeUndefined();
    }));
    test("DELETE /users/:userId -  Must not be able to soft delete a user being other user", () => __awaiter(void 0, void 0, void 0, function* () {
        const userAdvertiserLoginResponse = yield (0, supertest_1.default)(app_1.default)
            .post("/login")
            .send(users_1.userAdvertiserLogin);
        const responseWrongDelete = yield (0, supertest_1.default)(app_1.default)
            .delete(`/users/${userNonAdvertiserCreated1.id}/`)
            .set("Authorization", `Bearer ${userAdvertiserLoginResponse.body.token}`);
        expect(responseWrongDelete.status).toBe(403);
        expect(responseWrongDelete.body).toHaveProperty("message");
    }));
    test("DELETE /users/:userId -  Must be able to soft delete a user", () => __awaiter(void 0, void 0, void 0, function* () {
        const userAdvertiserLoginResp = yield (0, supertest_1.default)(app_1.default)
            .post("/login/")
            .send(users_1.userAdvertiserLogin);
        console.log(userAdvertiserLoginResp.body);
        const responseDelete = yield (0, supertest_1.default)(app_1.default)
            .delete(`/users/${userAdvertiserCreated.id}/`)
            .set("Authorization", `Bearer ${userAdvertiserLoginResp.body.token}`);
        expect(responseDelete.status).toBe(204);
        const responseDeleteagain = yield (0, supertest_1.default)(app_1.default)
            .delete(`/users/${userNonAdvertiserCreated1.id}/`)
            .set("Authorization", `Bearer ${userAdvertiserLoginResp.body.token}`);
        expect(responseDeleteagain.status).toBe(403);
        expect(responseDeleteagain.body).toHaveProperty("message");
        const nonAdvertiserListResponse = yield (0, supertest_1.default)(app_1.default).get(`/users/${userAdvertiserCreated.id}/`);
        expect(nonAdvertiserListResponse.body.isActive).toEqual(false);
    }));
    test("PATCH /users/:userId -  Must be able to patch a user", () => __awaiter(void 0, void 0, void 0, function* () {
        const userAdvertiserLoginResponse = yield (0, supertest_1.default)(app_1.default)
            .post("/login")
            .send(users_1.userAdvertiserLogin);
        const responsePatch = yield (0, supertest_1.default)(app_1.default)
            .patch(`/users/${userAdvertiserCreated.id}`)
            .send(users_1.advertiserUserEdit)
            .set("Authorization", `Bearer ${userAdvertiserLoginResponse.body.token}`);
        console.log(responsePatch.body);
        expect(responsePatch.status).toBe(200);
        expect(responsePatch.body.name).toEqual(users_1.advertiserUserEdit.name);
        expect(responsePatch.body.cpf).toEqual(users_1.advertiserUserEdit.cpf);
        expect(responsePatch.body.cellphone).toEqual(users_1.advertiserUserEdit.cellphone);
        expect(responsePatch.body.description).toEqual(users_1.advertiserUserEdit.description);
    }));
    test("PATCH /users/:userId -  Must not be able to patch a user being other user", () => __awaiter(void 0, void 0, void 0, function* () {
        const userNonAdvertiserLoginResponse = yield (0, supertest_1.default)(app_1.default)
            .post("/login")
            .send(users_1.userAdvertiserLogin);
        const response = yield (0, supertest_1.default)(app_1.default)
            .patch(`/users/${userNonAdvertiserCreated.id}`)
            .send(users_1.advertiserUserEdit)
            .set("Authorization", `Bearer ${userNonAdvertiserLoginResponse.body.token}`);
        expect(response.status).toBe(403);
        expect(response.body).toHaveProperty("message");
    }));
});
