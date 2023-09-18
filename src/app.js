const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const productRouter = require("./routes/products.router");
const cartRouter = require("./routes/carts.router");
const loginRouter = require("./routes/sessions.router");
const handlebars = require("express-handlebars");
const MongoStore = require("connect-mongo");
const bodyParser = require("body-parser");

var path = require("path");
const app = express();
const PORT = 8080;

// Configución de Handlebars
app.engine(
  "handlebars",
  handlebars.engine({
    extname: "hbs",
    defaultLayout: false,
    layoutsDir: "views/",
  })
);
app.set("views", path.join(__dirname + "/views"));
app.set("view engine", "handlebars");

// Middleware para analizar el cuerpo de la solicitud
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose
  .connect(
    "mongodb+srv://lestian:9YTv2ykS57hAUrxa2Yh5@e-commerce.d6j4ttl.mongodb.net/e-commerce?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to Mongo Atlas DB");
  })
  .catch((error) => {
    console.log("Error!", error);
  });

const mongoStore = MongoStore.create({
  mongoUrl:
    "mongodb+srv://lestian:9YTv2ykS57hAUrxa2Yh5@e-commerce.d6j4ttl.mongodb.net/e-commerce?retryWrites=true&w=majority",
  mongoOptions: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
});

app.use(
  session({
    secret: "mirrow",
    resave: false,
    saveUninitialized: false,
    store: mongoStore,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // Tiempo de vida de la cookie de sesión 1 día
    },
  })
);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use(express.json());
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
app.use("/api/sessions/", loginRouter);
