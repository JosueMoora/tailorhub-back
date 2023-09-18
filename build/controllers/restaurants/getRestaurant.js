"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRestaurant = void 0;
const getRestaurants_1 = require("../../helpers/restaurants/getRestaurants");
const getRestaurant = (req, res) => {
    const restaurants = (0, getRestaurants_1.readRestaurantsFile)();
    const { id } = req.params;
    const restaurant = restaurants.find((restaurant) => restaurant.id === parseInt(id));
    return res.status(200).json(restaurant);
};
exports.getRestaurant = getRestaurant;
