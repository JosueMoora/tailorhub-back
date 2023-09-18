"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokentValidation = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const getUsers_1 = require("../users/getUsers");
const TokentValidation = (req, res, next) => {
    var _a;
    const token = req.cookies.token;
    if (token == null) {
        return res.status(401).json({
            msg: 'The token is required'
        });
    }
    try {
        const { id } = jsonwebtoken_1.default.verify(token, (_a = process.env.TOKEN_SECRET) !== null && _a !== void 0 ? _a : 'tokentest');
        const users = (0, getUsers_1.readUsersFile)();
        const user = users.find((u) => u.id === id);
        if (user == null) {
            return res.status(401).json({
                msg: 'Token is not valid - user does not exist'
            });
        }
        req.body.id = id;
        next();
    }
    catch (error) {
        return res.status(401).json({
            msg: 'Token is not valid'
        });
    }
};
exports.TokentValidation = TokentValidation;
