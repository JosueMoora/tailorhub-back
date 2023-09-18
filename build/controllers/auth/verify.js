"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verify = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const getUsers_1 = require("../../helpers/users/getUsers");
const verify = (req, res) => {
    var _a;
    const { token } = req.cookies;
    if (token == null) {
        return res.status(401).json({ msg: 'The token is required' });
    }
    try {
        const { id } = jsonwebtoken_1.default.verify(token, (_a = process.env.TOKEN_SECRET) !== null && _a !== void 0 ? _a : 'tokentest');
        const users = (0, getUsers_1.readUsersFile)();
        const user = users.find((u) => u.id === id);
        if (user === undefined) {
            return res.status(401).json({ msg: 'Token is not valid - user does not exist' });
        }
        return res.status(200).json({ name: user.name, username: user.username });
    }
    catch (error) {
        return res.json(error);
    }
};
exports.verify = verify;
