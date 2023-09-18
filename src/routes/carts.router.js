const { Router } = require("express");
const { cartModel } = require("../models/cart.model");
const { productModel } = require("../models/product.model");
const { userModel } = require("../models/user.model");
const router = Router();

//GET
router.get("/", async (req, res) => {
  if (!req.session.user) return res.redirect("/api/sessions/login");
  try {
    const carts = await cartModel.find();
    res.json({ status: "success", payload: carts });
  } catch (error) {
    res
      .status(500)
      .json({ status: "error", message: "Error al obtener los carritos" });
  }
});

router.get("/:cid", async (req, res) => {
  if (!req.session.user) return res.redirect("/api/sessions/login");
  const id = req.params.cid;
  try {
    const cart = await cartModel.findById(id);
    const user = await userModel.findById(cart.user);
    const promise = cart.products.map(async (product) => {
      const p = {};
      const details = await productModel.findById(product.product);
      p.details = details;
      p.quantity = product.quantity;
      p.total = details.price * product.quantity;
      return p;
    });
    const products = await Promise.all(promise);

    let total = 0;
    products.map((product) => {
      total += product.total;
    });

    total = total.toFixed(2);

    res.render("cart", {
      status: "success",
      cartId: id,
      user: user.name,
      products,
      total,
    });
  } catch (error) {}
});

//PUT
router.put("/:cid", async (req, res) => {
  if (!req.session.user) return res.redirect("/api/sessions/login");
  const cartId = req.params.cid;
  const productId = req.body.productId;

  try {
    const product = await productModel.findById(productId);

    if (!product) res.status(404).json({ error: "No se encontro el producto" });

    if (!product.stock > 0)
      res.status(404).json({ error: "No hay stock disponible del producto" });

    const cart = await cartModel.findById(cartId);
    if (!cart) res.status(404).json({ error: "No se encontro el carrito" });

    const cartProduct = cart.products.find(
      (product) => product.product.toString() === productId
    );

    if (cartProduct) {
      cartProduct.quantity += 1;
    } else {
      cart.products.push({ product: product._id });
    }

    product.stock -= 1;
    await productModel.updateOne({ _id: productId }, product);

    await cartModel.updateOne({ _id: cartId }, cart);

    res.status(200).json({ ok: "Producto agregado correctamente" });
  } catch (error) {
    console.log(error);
  }
});

//PUT
router.put("/:cid/products/:pid", async (req, res) => {
  if (!req.session.user) return res.redirect("/api/sessions/login");
  const { cid, pid } = req.params;
  let quantity = req.body.quantity;

  try {
    //Check if stock was passed as parameter
    if (!quantity) res.status(404).json({ error: "Cantidad no indicado" });

    if (quantity < 0)
      res.status(404).json({ error: "Cantidad no puede ser negativo" });

    //Search for cart by ID
    const cart = await cartModel.findById(cid);

    if (!cart) {
      return res.status(404).json({ error: "Cantidad no encontrado" });
    }
    //If cart exist search if the product exist in the cart
    const productIndex = cart.products.findIndex(
      (product) => product.product.toString() === pid
    );

    if (productIndex === -1) {
      return res
        .status(404)
        .json({ error: "Producto no encontrado en el carrito" });
    }

    //Update product quantity
    cart.products[productIndex].quantity = quantity;

    //Save new cart
    await cart.save();

    res.json({ message: "La cantidad del producto fue actualizada con exito" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

//DELETE
router.delete("/:cid/products/:pid", async (req, res) => {
  if (!req.session.user) return res.redirect("/api/sessions/login");
  const { cid, pid } = req.params;
  const quantity = req.body.quantity;

  try {
    //Search for cart by ID
    const cart = await cartModel.findById(cid);

    if (!cart) {
      return res.status(404).json({ error: "Carrito no encontrado" });
    }

    //If cart exist search if the product exist in the cart
    const productIndex = cart.products.findIndex(
      (product) => product.product.toString() === pid
    );

    if (productIndex === -1) {
      return res
        .status(404)
        .json({ error: "Producto no encontrado en el carrito" });
    }
    //Delete product
    cart.products.splice(productIndex, 1);
    //Save new cart
    await cart.save();

    const product = await productModel.findById(pid);
    product.stock += parseInt(quantity);

    await product.save();

    res.json({ message: "Producto eliminado del carrito con éxito" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.delete("/:cid/", async (req, res) => {
  if (!req.session.user) return res.redirect("/api/sessions/login");
  const { cid } = req.params;

  try {
    const cart = await cartModel.findById(cid);
    const products = cart.products;

    products.map(async (product) => {
      const p = await productModel.findById(product.product._id);
      p.stock += product.quantity;
      p.save();
    });

    cart.products = [];

    cart.save();
    res.json({ message: "Productos eliminados del carrito con éxito" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

module.exports = router;
