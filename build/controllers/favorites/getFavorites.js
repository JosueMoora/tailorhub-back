"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFavorites = void 0;
const getUsers_1 = require("../../helpers/users/getUsers");
function getFavorites(req, res) {
    const users = (0, getUsers_1.readUsersFile)();
    const user = users.find((u) => u.id === req.body.id);
    if (user == null)
        return res.status(404).json('Usuario no encontrado');
    return res.status(200).json({ favorite: user.favorite });
}
exports.getFavorites = getFavorites;
