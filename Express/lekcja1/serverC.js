const express = require("express")
const app = express()
const PORT = 3000

function degToRad(value, toRad) {
    if (toRad == "true") {
        return value+" stopni = "+roundTwo((value * Math.PI)/180)+" radianów."
    }
    else {
        return value+" radianów = "+roundTwo(value * (180 / Math.PI))+" stopni."
    }
}

function roundTwo(value) {
    return Math.round(value*100)/100
}

app.get("/", function(req, res) {
    let value = req.query.value
    let toRad = req.query.toRad
    res.send(degToRad(value,toRad).replace(".", ","))
})

app.listen(PORT, function() {
    console.log("ZADANIE C. Serwer na porcie " + PORT)
})
