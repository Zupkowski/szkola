const express = require("express");
const app = express();
const PORT = 4000;

const path = require("path");
const { create } = require("express-handlebars");

const hbs = create({
  defaultLayout: "main.hbs", // Domyślny layout: views/layouts/main.hbs
  extname: ".hbs", // rozszerzenie plików szablonów
});

const Datastore = require("@seald-io/nedb");

const db = new Datastore({
  filename: "db/cars.db",
  autoload: true,
});

const cars = ["Astra", "Golf", "Prius", "Jeep"];

app.use(express.static(path.join(__dirname, "static")));

app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.engine(".hbs", hbs.engine); // określenie silnika szablonów
app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, "views"));

//obsluga strony index
app.get("/", function (req, res) {
  res.render("index.hbs");
});

//obsluga strony add
app.get("/add", function (req, res) {
  res.render("add.hbs");
});

app.post("/add", (req, res) => {
  const carObj = {
    model: cars[Math.floor(Math.random() * 4)],
    ubezpieczony: req.body.ubezpieczony == "on" ? "TAK" : "NIE",
    benzyna: req.body.benzyna == "on" ? "TAK" : "NIE",
    uszkodzony: req.body.uszkodzony == "on" ? "TAK" : "NIE",
    naped4x4: req.body.naped4x4 == "on" ? "TAK" : "NIE",
  };
  db.insert(carObj, function (err, car) {
    const context = {
      message: `new car (Model: ${car.model} with id = ${car._id} added to database`,
    };
    res.render("add.hbs", context);
  });
});

app.get("/list", function (req, res) {
  db.find({}, function (err, query) {
    res.render("list.hbs", { cars: query });
  });
});

app.get("/delete", function (req, res) {
  db.find({}, function (err, query) {
    res.render("delete.hbs", { cars: query });
  });
});

app.post("/deleteAll", function (req, res) {
  db.remove({}, { multi: true }, function (err, count) {
    db.find({}, function (err, query) {
      res.render("delete.hbs", {
        cars: query,
        message: `removed ${count} cars`,
      });
    });
  });
});

app.post("/deleteSelected", function (req, res) {
  let count = 0;
  Object.keys(req.body).forEach((e) => {
    count++;
    db.remove({ _id: e }, function (err, count) {});
  });
  db.find({}, function (err, query) {
    res.render("delete.hbs", { cars: query, message: `removed ${count} cars` });
  });
});

app.post("/deleteBtn", function (req, res) {
  db.remove({ _id: Object.keys(req.body)[0] }, function (err, count) {});
  db.find({}, function (err, query) {
    res.render("delete.hbs", { cars: query, message: `removed 1 car` });
  });
});

// app.get("/edit", function (req, res) {
//   res.render("edit.hbs");
// });
app.listen(PORT, function () {
  console.log("port " + PORT);
});
