"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateJWT = (id) => {
    var _a;
    const payload = { id };
    const token = jsonwebtoken_1.default.sign(payload, (_a = process.env.TOKEN_SECRET) !== null && _a !== void 0 ? _a : 'tokentest', { expiresIn: '4h' });
    return token;
};
exports.generateJWT = generateJWT;
