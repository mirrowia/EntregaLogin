const express = require("express");
const router = express.Router();
const { userModel } = require("../models/user.model");
const { cartModel } = require("../models/cart.model");
const e = require("express");

router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (username == "adminCoder@coder.com" && password == "adminCod3r123") {
    req.session.user = {
      username,
      name: "Admin",
      lastname: "Coder",
      email: username,
      age: 25,
      rol: "Admin",
    };
    res.redirect("/api/sessions/");
  } else {
    const user = await userModel.findOne({ username });

    if (user != null) {
      if (user.password === password) {
        const cart = await cartModel.findById(user.cart);
        req.session.user = {
          username: user.username,
          name: user.name,
          lastname: user.lastname,
          email: user.email,
          age: user.age,
          cart: cart._id.toString(),
          rol: user.rol,
        };
        res.redirect("/api/sessions/");
      } else {
        res
          .status(400)
          .json({ status: "error", message: "Credenciales erroneas" });
      }
    } else {
      res
        .status(400)
        .json({ status: "error", message: "Credenciales erroneas" });
    }
  }
});

router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", async (req, res) => {
  try {
    const { username, name, lastname, email, age, password } = req.body;

    // const userList = userModel.find();
    // console.log(userList);

    const newUser = new userModel({
      username,
      name,
      lastname,
      email,
      age,
      password,
    });

    await newUser.save();

    res.redirect("./login");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error al registrar el usuario");
  }
});

router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error al cerrar la sesión:", err);
      return res.status(500).json({ message: "Error al cerrar la sesión" });
    }
    return res.status(200).json({ message: "Bye" });
  });
});

router.get("/", (req, res) => {
  if (!req.session.user) return res.redirect("./login");

  const { username, name, lastname, email, age, cart, rol } = req.session.user;
  res.render("profile", { username, name, lastname, email, age, cart, rol });
});

module.exports = router;
