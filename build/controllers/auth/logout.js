"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = void 0;
function logout(req, res) {
    const token = req.cookies.token;
    try {
        if (token === undefined) {
            return res.send('no token');
        }
        else {
            res.cookie('token', null, { httpOnly: true, secure: true, sameSite: 'none', maxAge: 0 });
            return res.status(200).json('Sesion cerrada exitosamente');
        }
    }
    catch (error) {
        return res.status(400).json('Invalid Token');
    }
}
exports.logout = logout;
