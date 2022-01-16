const express = require("express");
require("dotenv").config();
const routes = require("./routes");
var cors = require('cors')

require("./database");

const app = express();

app.use(express.json());

app.use(cors())

app.use(routes);

app.listen(process.env.PORT || 3333);
