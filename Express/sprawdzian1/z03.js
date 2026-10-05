const express = require("express")
const app = express()
const PORT = 3002

const path = require("path")

app.use(express.json());

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "static/index03.html"))
})

app.post("/kolor", (req, res) => {
    console.log(req.body)
    div = `<div style="width: 200px; height: 100px">`
    res.header("content-type", "application/json")
    res.send(JSON.stringify(req.body));
})

app.listen(PORT, () => {
    console.log("odpalono " + PORT)
})