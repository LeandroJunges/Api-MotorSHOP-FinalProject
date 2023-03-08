"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Announcement = void 0;
const typeorm_1 = require("typeorm");
const User_entity_1 = require("./User.entity");
const uuid_1 = require("uuid");
const Image_entity_1 = require("./Image.entity");
const Comments_entity_1 = require("./Comments.entity");
const Bid_entity_1 = require("./Bid.entity");
let Announcement = class Announcement {
    constructor() {
        if (!this.id) {
            this.id = (0, uuid_1.v4)();
        }
    }
};
__decorate([
    (0, typeorm_1.PrimaryColumn)("uuid"),
    __metadata("design:type", String)
], Announcement.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "boolean", nullable: false }),
    __metadata("design:type", Boolean)
], Announcement.prototype, "isAuction", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], Announcement.prototype, "vehicleType", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], Announcement.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", Number)
], Announcement.prototype, "mileage", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], Announcement.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", precision: 10, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], Announcement.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "boolean", nullable: false, default: false }),
    __metadata("design:type", Boolean)
], Announcement.prototype, "isSold", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", precision: 10, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], Announcement.prototype, "initialBid", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", precision: 10, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], Announcement.prototype, "actualBid", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Announcement.prototype, "imgMain", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_entity_1.User, { eager: true }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", User_entity_1.User)
], Announcement.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar" }),
    __metadata("design:type", String)
], Announcement.prototype, "year", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Image_entity_1.Image, (image) => image.announcement, {
        eager: true,
        cascade: true,
    }),
    __metadata("design:type", Array)
], Announcement.prototype, "imgs", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Bid_entity_1.Bid, (bid) => bid.announcement, {
        cascade: true,
    }),
    __metadata("design:type", Array)
], Announcement.prototype, "bids", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Comments_entity_1.Comment, (comment) => comment.announcement, {
        eager: true,
        cascade: true,
    }),
    __metadata("design:type", Array)
], Announcement.prototype, "comments", void 0);
Announcement = __decorate([
    (0, typeorm_1.Entity)("announcements"),
    __metadata("design:paramtypes", [])
], Announcement);
exports.Announcement = Announcement;
