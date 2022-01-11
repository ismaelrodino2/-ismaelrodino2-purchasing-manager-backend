const Product = require("../models/Product");
const User = require("../models/User");

module.exports = {
  async index(req, res) {
    const users = await User.findAll({
      include: [
        {
          association: "products",
        },
      ],
    });
    return res.json(users);
  },

  async store(req, res) {
    const { user_id, product_id, qnt } = req.body;

    const user = await User.findByPk(user_id);

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const product = await Product.findByPk(product_id);

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
    } else{
      return res.send("Acabaram os produtos")
    }

  },
};
