const express = require("express")
const app = express()
const PORT = 3000;

const fs = require("fs")

app.use(express.static('static'))
app.use(express.static('static/cwiczenia/lekcja1'))

app.get("/", function () {
})

app.get("/fetchme", function (req, res) {
    const folder = fs.readdirSync(__dirname + "/static/cwiczenia/lekcja1")
    let lekcje = {
        folders: ['lekcja1'],
        lessons: folder
    }
    res.send(JSON.stringify(lekcje, null, 5))
})

app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})