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
Object.defineProperty(exports, "__esModule", { value: true });
const editComment_service_1 = require("../../services/comments/editComment.service");
const editCommentController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.user;
    const { commentId } = req.params;
    const { description } = req.body;
    const editedComment = yield (0, editComment_service_1.editCommentService)(id, description, commentId);
    return res.status(200).json(editedComment);
});
exports.default = editCommentController;
