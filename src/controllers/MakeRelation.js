const Product = require("../models/Product");
const User = require("../models/User");

const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");

module.exports = {
  async index(req, res) {
    const TokenArray = req.headers.authorization.split(" ");
    const auth = jwt.decode(TokenArray[1], process.env.ACCESS_TOKEN_SECRET);

    const users = await User.findAll({
      where: { owner: auth.userId },
      include: [
        {
          association: "products",
          where: {
            id: { [Op.gt]: 0 },
          },
        },
      ],
    });
    return res.json(users);
  },

  async store(req, res) {
    const { user_id, product_id, qnt } = req.body;

    const user = await User.findOne({ where: { id: user_id } });
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const product = await Product.findOne({ where: { id: product_id } });

    const atual = product.number - qnt;
    if (!product) {
      return res.status(400).json({ error: "Product not found" });
    }
    if (atual >= 0) {
      await user.addProduct(product);

      await Product.update(
        {
          number: atual,
        },
        {
          where: { id: product_id },
        }
      );
      return res.json(product);
    } else {
      return res.send("Acabaram os produtos");
    }
  },
  async delete(req, res) {
    const { user_id, product_id } = req.body;

    const product = await Product.findOne({ where: { id: product_id } });
    const user = await User.findOne({ where: { id: user_id } });

    await user.removeProduct(product);

    return res.json(product);
  },
};
