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
    subject: "ćwiczenie 3 - dane z tablicy obiektów",
    books: [
        { title: "Lalka", author: "B Prus", lang: "PL" },
        { title: "Hamlet", author: "W Szekspir", lang: "ENG" },
        { title: "Pan Wołodyjowski", author: "H Sienkiewicz", lang: "PL" },
        { title: "Homo Deus", author: "Yuval Noah Harari", lang: "CZ" }
    ]
}

app.get("/", function (req, res) {
    res.render('index4.hbs', context); // nie podajemy ścieżki tylko nazwę pliku
})


app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})