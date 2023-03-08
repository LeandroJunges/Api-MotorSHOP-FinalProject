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
exports.User = void 0;
const typeorm_1 = require("typeorm");
const uuid_1 = require("uuid");
const class_transformer_1 = require("class-transformer");
const Address_entity_1 = require("./Address.entity");
const Bid_entity_1 = require("./Bid.entity");
const Comments_entity_1 = require("./Comments.entity");
const Announcement_entity_1 = require("./Announcement.entity");
let User = class User {
    constructor() {
        if (!this.id) {
            this.id = (0, uuid_1.v4)();
        }
    }
};
__decorate([
    (0, typeorm_1.PrimaryColumn)("uuid"),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], User.prototype, "cpf", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], User.prototype, "cellphone", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, type: "varchar" }),
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar" }),
    __metadata("design:type", String)
], User.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamptz" }),
    __metadata("design:type", Date)
], User.prototype, "dateOfBirth", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "boolean", nullable: false }),
    __metadata("design:type", Boolean)
], User.prototype, "isAdvertiser", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar" }),
    __metadata("design:type", String)
], User.prototype, "img", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "boolean", default: true }),
    __metadata("design:type", Boolean)
], User.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Address_entity_1.Address, {
        eager: true,
        cascade: true,
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Address_entity_1.Address)
], User.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Bid_entity_1.Bid, (bid) => bid.user, {
        cascade: true,
    }),
    __metadata("design:type", Array)
], User.prototype, "bids", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Comments_entity_1.Comment, (comment) => comment.user, {
        cascade: true,
    }),
    __metadata("design:type", Array)
], User.prototype, "comments", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Announcement_entity_1.Announcement, (announcement) => announcement.user, {
        cascade: true,
    }),
    __metadata("design:type", Array)
], User.prototype, "announcements", void 0);
User = __decorate([
    (0, typeorm_1.Entity)("users"),
    __metadata("design:paramtypes", [])
], User);
exports.User = User;
