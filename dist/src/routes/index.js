"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const announcements_routes_1 = __importDefault(require("./announcements.routes"));
const address_routes_1 = __importDefault(require("./address.routes"));
const users_routes_1 = __importDefault(require("./users.routes"));
const comments_routes_1 = __importDefault(require("./comments.routes"));
const bids_routes_1 = __importDefault(require("./bids.routes"));
const routes = (app) => {
    (0, users_routes_1.default)(app);
    (0, announcements_routes_1.default)(app);
    (0, address_routes_1.default)(app);
    (0, comments_routes_1.default)(app);
    (0, bids_routes_1.default)(app);
};
exports.routes = routes;
