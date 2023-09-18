"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateUser = void 0;
const generateJWT_1 = require("../../helpers/jwt/generateJWT");
const getUsers_1 = require("../../helpers/users/getUsers");
const bcrypt_1 = __importDefault(require("bcrypt"));
function authenticateUser(req, res) {
    const { username, password } = req.body;
    const users = (0, getUsers_1.readUsersFile)();
    const user = users.find((u) => u.username === username);
    if ((user == null)) {
        return res.status(400).json({
            msg: 'Usuario no registrado'
        });
    }
    const validate = bcrypt_1.default.compareSync(password, user.password);
    if (!validate) {
        return res.status(401).json({
            msg: 'Contraseña incorrecta'
        });
    }
    const token = (0, generateJWT_1.generateJWT)(user.id);
    res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'none', maxAge: 1000 * 60 * 60 });
    return res.status(200).json('acceso exitoso');
}
exports.authenticateUser = authenticateUser;
