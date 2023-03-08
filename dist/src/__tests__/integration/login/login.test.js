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
const data_source_1 = __importDefault(require("../../../data-source"));
const app_1 = __importDefault(require("../../../app"));
const node_test_1 = require("node:test");
const supertest_1 = __importDefault(require("supertest"));
const users_1 = require("../../mocks/users");
let userAdvertiserCreated;
(0, node_test_1.describe)("/login", () => {
    let connection;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield data_source_1.default.initialize()
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
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const responseUserCreated = yield (0, supertest_1.default)(app_1.default)
            .post("/users")
            .send(users_1.advertiserUser);
        userAdvertiserCreated = responseUserCreated.body;
    }));
    test("POST /login -  Must be able to login", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post("/login")
            .send(users_1.userAdvertiserLogin);
        expect(response.body).toHaveProperty("token");
        expect(response.status).toBe(200);
    }));
    test("POST /login -  Must active an user after being soft delete", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post("/login")
            .send(users_1.userAdvertiserLogin);
        const responseDelete = yield (0, supertest_1.default)(app_1.default)
            .delete(`/users/${userAdvertiserCreated.id}`)
            .set("Authorization", `Bearer ${response.body.token}`);
        const responseLogin = yield (0, supertest_1.default)(app_1.default)
            .post("/login")
            .send(users_1.userAdvertiserLogin);
        expect(responseLogin.body.user.isActive).toEqual(true);
    }));
});
