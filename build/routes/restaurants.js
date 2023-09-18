"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const getRestaurants_1 = require("../controllers/restaurants/getRestaurants");
const getRestaurant_1 = require("../controllers/restaurants/getRestaurant");
const postRestaurant_1 = require("../controllers/restaurants/postRestaurant");
const putRestaurant_1 = require("../controllers/restaurants/putRestaurant");
const deleteRestaurant_1 = require("../controllers/restaurants/deleteRestaurant");
const router = (0, express_1.Router)();
router.get('/', getRestaurants_1.getRestaurants);
router.get('/:id', getRestaurant_1.getRestaurant);
router.post('/', postRestaurant_1.postRestaurant);
router.put('/:id', putRestaurant_1.putRestaurant);
router.delete('/:id', deleteRestaurant_1.deleteRestaurant);
exports.default = router;