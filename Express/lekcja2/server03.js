const express = require("express")
const app = express()
const PORT = 3000

const path = require("path")

app.use(express.urlencoded({
  extended: true
}));

app.get("/", function(req, res){
    res.sendFile(path.join(__dirname,"/static/formularz_POST.html"))    
})

app.post("/handleForm", function(req, res){
    let bg = req.body.kolor
    let html = `<html><body style="background: ${bg}"><h1>Kolor tła to: ${bg}</h1></body>`
    res.send(html)
    console.log(req.body)
})

app.listen(PORT, function() {
    console.log("Odpalona na porcie "+PORT)
})
