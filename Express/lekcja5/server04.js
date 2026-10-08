const express = require("express")
const app = express()
const PORT = 3000

const path = require("path")
const { create } = require('express-handlebars');

app.use(express.static('static'))

const hbs = create({
    defaultLayout: 'main.hbs', // Domyślny layout: views/layouts/main.hbs
    extname: '.hbs' // rozszerzenie plików szablonów
});

app.engine('.hbs', hbs.engine); // określenie silnika szablonów
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views')); // ustalamy katalog views

const context = {
    subject: "ćwiczenie 4 - dane z tablicy, select",
    fields: [
        { name: "title" },
        { name: "author" },
        { name: "lang" }
    ],
    books: [
        { title: "Lalka", author: "B Prus", lang: "PL" },
        { title: "Hamlet", author: "W Szekspir", lang: "ENG" },
        { title: "Pan Wołodyjowski", author: "H Sienkiewicz", lang: "PL" },
        { title: "Zamek", author: "F Kafka", lang: "CZ" }
    ]
}

app.get("/", function (req, res) {
    res.render('index4.hbs', context); // nie podajemy ścieżki tylko nazwę pliku
})

app.get("/handle04", (req, res) => {
    console.log(req.query)
    let arr = []

    for (let i = 0; i < context.books.length; i++) {
        arr.push({ field: context.books[i][req.query.select] })
    }

    res.render('index4_1.hbs', { name: context.subject, fields: arr });
})


app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})