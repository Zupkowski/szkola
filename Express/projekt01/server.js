const express = require("express");
const app = express();
const PORT = 4000;

const path = require("path");
const { create } = require("express-handlebars");

const hbs = create({
  defaultLayout: "main.hbs", // Domyślny layout: views/layouts/main.hbs
  extname: ".hbs", // rozszerzenie plików szablonów
});

const cars = ["Astra", ""];

app.use(express.static(path.join(__dirname, "static")));

app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.engine(".hbs", hbs.engine); // określenie silnika szablonów
app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, "views")); // ustalamy katalog views

app.get("/", function (req, res) {
  res.render("index.hbs"); // nie podajemy ścieżki tylko nazwę pliku
});

app.get("/add", function (req, res) {
  res.render("add.hbs"); // nie podajemy ścieżki tylko nazwę pliku
});

app.get("/list", function (req, res) {
  res.render("add.hbs"); // nie podajemy ścieżki tylko nazwę pliku
});

app.get("/delete", function (req, res) {
  res.render("add.hbs"); // nie podajemy ścieżki tylko nazwę pliku
});

app.get("/edit", function (req, res) {
  res.render("add.hbs"); // nie podajemy ścieżki tylko nazwę pliku
});

app.post("/add", (req, res) => {
  console.log(req.body);
});
app.listen(PORT, function () {
  console.log("port " + PORT);
});
