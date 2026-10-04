const express = require("express")
const app = express()
const PORT = 3000

const path = require("path")

let logowania = []
id = 1

app.use(express.json());

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/static/formularz5.html"))
})

app.post("/form", (req, res)=>{
    a = req.body
    console.log(a)


    res.header("content-type","application/json")
    res.send(JSON.stringify(a))
})

app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})