const express = require("express")
const app = express()
const PORT = 3000

function makeDiv(count, color) { //funkcja zamiast robienia tego samego w app.get
    let div = ""
    for (i=1;i<=count;i++) {
        div += "<div style='background: "+color+"; width: 100px; height: 100px; margin: 10px; color: white; font-size: 30px; padding: 10px;'>"+i+"</div>"
    }
    return div;
}

app.get("/", function (req, res) {
    let count = parseInt(req.query.count) || 1 //opcja defaultowa 1 (jeśli użytkownik nie poda wartości)
    let color = req.query.color || "yellow" //opcja defaultowa yellow (jeśli użytkownik nie poda wartości)
    res.send("<html><head></head><body style='display: inline-flex; flex-wrap: wrap;'>"+makeDiv(count,color)+"</body></html>")
})

app.listen(PORT, function () {
    console.log("ZADANIE B. Serwer na porcie " + PORT)
}) 