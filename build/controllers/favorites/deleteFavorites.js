"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFavorite = void 0;
const getUsers_1 = require("../../helpers/users/getUsers");
const postUsers_1 = require("../../helpers/users/postUsers");
const deleteFavorite = (req, res) => {
    const { id } = req.params;
    const userId = req.body.id;
    try {
        const users = (0, getUsers_1.readUsersFile)();
        const user = users.find((u) => u.id === userId);
        if (user == null) {
            return res.status(404).json('Usuario no encontrado');
        }
        user.favorite = user.favorite.filter(res => res.id !== Number(id));
        (0, postUsers_1.saveUsersFile)(users);
        return res.status(200).json(user === null || user === void 0 ? void 0 : user.favorite);
    }
    catch (error) {
        console.log(error);
        return res.status(400).json(error);
    }
};
exports.deleteFavorite = deleteFavorite;
