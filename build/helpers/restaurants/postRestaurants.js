"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveRestaurantsFile = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const restaurantsFilePath = path_1.default.join(__dirname, '../../data/restaurants.json');
function saveRestaurantsFile(data) {
    try {
        fs_1.default.writeFileSync(restaurantsFilePath, JSON.stringify(data, null, 2), 'utf8');
    }
    catch (error) {
        console.error('Error al guardar en el archivo de restaurantes:', error);
    }
}
exports.saveRestaurantsFile = saveRestaurantsFile;
