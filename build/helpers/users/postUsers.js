"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveUsersFile = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const usersFilePath = path_1.default.join(__dirname, '../../data/users.json');
function saveUsersFile(users) {
    try {
        fs_1.default.writeFileSync(usersFilePath, JSON.stringify(users, null, 2), 'utf8');
    }
    catch (error) {
        return console.error('Error al guardar en el archivo de usuarios:', error);
    }
}
exports.saveUsersFile = saveUsersFile;
