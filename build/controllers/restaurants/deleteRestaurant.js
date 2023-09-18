"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRestaurant = void 0;
const getRestaurants_1 = require("../../helpers/restaurants/getRestaurants");
const postRestaurants_1 = require("../../helpers/restaurants/postRestaurants");
const deleteRestaurant = (req, res) => {
    const { id } = req.params;
    const restaurants = (0, getRestaurants_1.readRestaurantsFile)();
    const index = restaurants.findIndex((restaurant) => restaurant.id === parseInt(id));
    if (index !== -1) {
        restaurants.splice(index, 1);
        (0, postRestaurants_1.saveRestaurantsFile)(restaurants);
        return res.json({ message: 'Restaurante eliminado correctamente' });
    }
    else {
        return res.status(404).json({ message: 'Restaurante no encontrado' });
    }
};
exports.deleteRestaurant = deleteRestaurant;
