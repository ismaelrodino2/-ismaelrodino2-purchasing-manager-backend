const express = require("express");
const UserController = require("./controllers/UserController");
const ProductController = require("./controllers/ProductController");
const MakeRelation = require("./controllers/MakeRelation");
const AdmUserController = require("./controllers/AdmUserController");

const routes = express.Router();

routes.get("/users", UserController.index);
routes.post("/users", UserController.store);

routes.get("/products", ProductController.index);
routes.post("/products", ProductController.store);

routes.post("/makerelation/", MakeRelation.store);
routes.get("/makerelation/:user_id/:product_id", MakeRelation.index);

routes.post("/register", AdmUserController.store);
routes.post("/login", AdmUserController.logon);
routes.get("/admusers", AdmUserController.index);


module.exports = routes;
