"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRestaurant = void 0;
const getRestaurants_1 = require("../../helpers/restaurants/getRestaurants");
const postRestaurants_1 = require("../../helpers/restaurants/postRestaurants");
const postRestaurant = (req, res) => {
    const { name, neighborhood, address, image, cuisineType } = req.body;
    const restaurants = (0, getRestaurants_1.readRestaurantsFile)();
    const newRestaurant = { id: restaurants.length + 1, name, neighborhood, address, image, cuisineType };
    restaurants.push(newRestaurant);
    (0, postRestaurants_1.saveRestaurantsFile)(restaurants);
    return res.status(201).json(newRestaurant);
};
exports.postRestaurant = postRestaurant;
