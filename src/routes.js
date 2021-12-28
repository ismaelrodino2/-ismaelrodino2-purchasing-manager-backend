const express = require("express");
const UserController = require("./controllers/UserController");
const ProductController = require("./controllers/ProductController");
const MakeRelation = require("./controllers/MakeRelation");

const routes = express.Router();

routes.get("/users", UserController.index);
routes.post("/users", UserController.store);

routes.get("/products", ProductController.index);
routes.post("/products", ProductController.store);

routes.post("/makerelation/", MakeRelation.store);
routes.get("/makerelation/:user_id/:product_id", MakeRelation.index);

module.exports = routes;
