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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = __importDefault(require("../../data-source"));
const Bid_entity_1 = require("../../entities/Bid.entity");
const listUserBidsService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const bidsRepository = data_source_1.default.getRepository(Bid_entity_1.Bid);
    const bids = yield bidsRepository.find({
        where: {
            user: {
                id: id,
            },
        },
    });
    let bidsReturn = [];
    const refAnn = (ann) => {
        const { id, title, actualBid } = ann, rest = __rest(ann, ["id", "title", "actualBid"]);
        return { id, title, actualBid };
    };
    bids.forEach((bid) => {
        const { id, value, createdAt, announcement } = bid, rest = __rest(bid, ["id", "value", "createdAt", "announcement"]);
        bidsReturn.push({
            id,
            value,
            createdAt,
            announcement: refAnn(announcement),
        });
    });
    return bidsReturn;
});
exports.default = listUserBidsService;
