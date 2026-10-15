const express = require("express")
const app = express()
const PORT = 3000

const Datastore = require('@seald-io/nedb')
const path = require("path")
const { create } = require('express-handlebars');

const hbs = create({
    defaultLayout: 'main.hbs', // Domyślny layout: views/layouts/main.hbs
    extname: '.hbs' // rozszerzenie plików szablonów
});

app.engine('.hbs', hbs.engine); // określenie silnika szablonów
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views')); // ustalamy katalog views

app.use(express.static('static'))

const db = new Datastore({
    filename: 'databases/db02.db',
    autoload: true
});

app.get("/", function (req, res) {
    res.render('view02.hbs'); // nie podajemy ścieżki tylko nazwę pliku
})

app.get("/handle", (req, res) => {
    const user = req.query.login
    const pass = req.query.password

    db.count({ "login": user }, (err, count) => {
        if (count != 0) {
            const resp = {
                message: "Istnieje już taki użytkownik."
            }
            res.render('view02.hbs', resp);
        }
        else {
            const newUser = {
                login: user,
                password: pass,
                timestamp: new Date().getTime()
            }
            db.find({}).sort({ timestamp: 1 }).exec(function (err, usersList) {
                usersList.array.forEach(function (user, i) {
                    usersIndexedList.push({ index: i, login: user.login, password: user.password })
                });
                const resp = {
                    message: "OK.",
                    users: usersIndexedList
                }
                console.log(resp.users)
                db.insert(newUser, (err, newUsera) => { });

                res.render('view02.hbs', resp);
            })
        }
    })
})


app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})
