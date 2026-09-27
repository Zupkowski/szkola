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
 console.log(req.query)
 console.log(req.query.color) 
})