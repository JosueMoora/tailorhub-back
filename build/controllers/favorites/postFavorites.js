"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postFavorites = void 0;
const getUsers_1 = require("../../helpers/users/getUsers");
const postUsers_1 = require("../../helpers/users/postUsers");
function postFavorites(req, res) {
    try {
        const users = (0, getUsers_1.readUsersFile)();
        const favorite = req.body.favorite;
        const userId = req.body.id;
        if (favorite == null || typeof favorite !== 'object' || userId == null || typeof userId !== 'number') {
            return res.status(400).json('Entrada no válida');
        }
        const user = users.find((u) => u.id === userId);
        if (user == null) {
            return res.status(404).json('Usuario no encontrado');
        }
        const isRestaurantInFavorites = user.favorite.some((restaurant) => restaurant.id === favorite.id);
        if (isRestaurantInFavorites) {
            return res.status(400).json('El restaurante ya está en la lista de favoritos');
        }
        user.favorite.push(favorite);
        (0, postUsers_1.saveUsersFile)(users);
        return res.json(user === null || user === void 0 ? void 0 : user.favorite);
    }
    catch (error) {
        console.error('Error al agregar restaurante favorito:', error);
        return res.status(500).json('Error interno del servidor');
    }
}
exports.postFavorites = postFavorites;
