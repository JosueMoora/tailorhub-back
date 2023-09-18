"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRestaurants = void 0;
const getRestaurants_1 = require("../../helpers/restaurants/getRestaurants");
const getRestaurants = (_req, res) => {
    const restaurants = (0, getRestaurants_1.readRestaurantsFile)();
    return res.status(200).send(restaurants);
};
exports.getRestaurants = getRestaurants;
