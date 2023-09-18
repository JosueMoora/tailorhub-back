"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.putRestaurant = void 0;
const getRestaurants_1 = require("../../helpers/restaurants/getRestaurants");
const postRestaurants_1 = require("../../helpers/restaurants/postRestaurants");
const putRestaurant = (req, res) => {
    const { id } = req.params;
    const { name, neighborhood, address, image, cuisineType } = req.body;
    const restaurants = (0, getRestaurants_1.readRestaurantsFile)();
    const restaurantToUpdate = restaurants.find((restaurant) => restaurant.id === parseInt(id));
    if (restaurantToUpdate != null) {
        restaurantToUpdate.name = name;
        restaurantToUpdate.neighborhood = neighborhood;
        restaurantToUpdate.address = address;
        restaurantToUpdate.image = image;
        restaurantToUpdate.cuisineType = cuisineType;
        (0, postRestaurants_1.saveRestaurantsFile)(restaurants);
        return res.json(restaurantToUpdate);
    }
    else {
        return res.status(404).json({ message: 'Restaurante no encontrado' });
    }
};
exports.putRestaurant = putRestaurant;
