const express = require("express");
const UserController = require("./controllers/UserController");
const ProductController = require("./controllers/ProductController");
const MakeRelation = require("./controllers/MakeRelation");
const AdmUserController = require("./controllers/AdmUserController");
const jwt = require("jsonwebtoken");

const routes = express.Router();

function verifyJWT(req, res, next) {
  const auth = req.headers.authorization;
  const [, token] = auth.split(" ");
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.status(401).end();
    req.userId = decoded.userId;
    next();
  });
}

routes.get("/users", verifyJWT, UserController.index);
routes.post("/users",verifyJWT, UserController.store);
routes.delete("/users", UserController.delete);

routes.get("/products", verifyJWT, ProductController.index);
routes.post("/products", verifyJWT, ProductController.store);
routes.delete("/products", verifyJWT, ProductController.delete);

routes.post("/makerelation", verifyJWT, MakeRelation.store);
routes.get("/makerelation", verifyJWT, MakeRelation.index);
routes.delete("/makerelation", verifyJWT, MakeRelation.delete);

routes.post("/register", AdmUserController.store);
routes.post("/login", AdmUserController.logon);
routes.get("/admusers", verifyJWT, AdmUserController.index);

module.exports = routes;
