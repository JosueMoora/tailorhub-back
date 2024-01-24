"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signup = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const getUsers_1 = require("../../helpers/users/getUsers");
const postUsers_1 = require("../../helpers/users/postUsers");
function signup(req, res) {
    const { name, username, password, favorite } = req.body;
    if (name.length === 0) {
        return res.status(400).json({
            msg: 'name is required'
        });
    }
    if (username.length < 4) {
        return res.status(400).json({
            msg: 'username must be 4 characters or more'
        });
    }
    if (password.length < 5) {
        return res.status(400).json({
            msg: 'password must be 5 characters or more'
        });
    }
    const users = (0, getUsers_1.readUsersFile)();
    if (users.some((user) => user.username === username)) {
        return res.status(400).json({ msg: 'The user already exists' });
    }
    else {
        const saltRounds = 10;
        const hashedPassword = bcrypt_1.default.hashSync(password, saltRounds);
        const newUser = { id: users.length + 1, name, username, password: hashedPassword, favorite };
        users.push(newUser);
        (0, postUsers_1.saveUsersFile)(users);
        return res.status(200).json('User successfully created');
    }
}
exports.signup = signup;
