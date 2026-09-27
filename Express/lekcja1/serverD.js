const express = require("express")
const app = express()
const PORT = 3000

const path = require("path")

app.get("/product_id/:id", function(req, res) {
    let id = parseInt(req.params.id)

    if (id >= 1 && id <= 3) {
        res.sendFile(path.join(__dirname, "/static/products/product"+id+".html"))
    }
    else {
        res.status(404).send("Produkt o id = "+id+" nie istnieje.")
    }
})

app.use(express.static("static"))

app.listen(PORT, function () {
    console.log("ZADANIE D. Serwer na porcie " + PORT)
})