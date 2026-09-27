const express = require("express")
const app = express()
const PORT = 3000

const path = require("path")

app.get("/", function (req, res) {
    let html = ""
    for (let i = 0; i < 50; i++) {
        let rand = Math.floor(Math.random() * 101)   // 0–100
        html += "<a href='/product/" + rand + "'>produkt " + rand + "</a><br>"
    }
    res.send(html)
})

app.get("/product/:id", function(req, res) {
    res.send("podstrona z danymi produktu o id = " + req.params.id)
})

app.listen(PORT, function () {
    console.log("ZADANIE E. Serwer na porcie " + PORT)
})