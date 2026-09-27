const express = require("express")
const app = express()
const PORT = 3000

const path = require("path")

app.listen(PORT, function() {
    console.log("Odpalona na porcie "+PORT)
})

app.get("/", function(req, res){
    res.sendFile(path.join(__dirname,"/static/formularz.html"))    
})

app.get("/handleForm", function(req, res){
    let bg = req.query.kolor
    let html = `<html><body style="background: ${bg}"><h1>Kolor tła to: ${bg}</h1></body>`
    res.send(html)
})