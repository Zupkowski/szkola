const express = require("express")
const app = express()
const PORT = 3000

app.use(express.static('static'))

app.get('/user/:id', function (req, res) {
 let id = req.params.id
 if (id == 2)
    res.send("odsyłam stronę usera z id = 2")
 else
    res.send("taki user nie istnieje")
})

app.listen(PORT, function () {
 console.log("start serwera na porcie " + PORT )
})