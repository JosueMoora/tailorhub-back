"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readUsersFile = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const usersFilePath = path_1.default.join(__dirname, '../../data/users.json');
function readUsersFile() {
    try {
        const data = fs_1.default.readFileSync(usersFilePath, 'utf8');
        return JSON.parse(data);
    }
    catch (error) {
        console.error('Error al leer el archivo de usuarios:', error);
        return [];
    }
}
exports.readUsersFile = readUsersFile;
