"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFavorites = void 0;
const getUsers_1 = require("../../helpers/users/getUsers");
function getFavorites(req, res) {
    const users = (0, getUsers_1.readUsersFile)();
    const user = users.find((u) => u.id === req.body.id);
    if (user == null)
        return res.status(404).json('Usuario no encontrado');
    if (user.favorite == null) {
        return res.status(400).json({
            msg: 'you do not have favorites'
        });
    }
    return res.status(200).json({ favorite: user.favorite });
}
exports.getFavorites = getFavorites;
