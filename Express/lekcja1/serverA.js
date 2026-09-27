const express = require("express")
const app = express()
const PORT = 3000

const path = require("path")

app.get("/koty", function(req, res) {
    res.sendFile(path.join(__dirname, "/static/pages/koty.html"))
})
app.get("/drzewa", function(req, res) {
    res.sendFile(path.join(__dirname, "/static/pages/drzewa.html"))
})
app.get("/auta", function(req, res) {
    res.sendFile(path.join(__dirname, "/static/pages/auta.html"))
})

app.listen(PORT, function () {
 console.log("ZADANIE A. Serwer na porcie " + PORT )
})

app.use(express.static('static'))