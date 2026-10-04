const express = require("express")
const app = express()
const PORT = 3000

const path = require("path")

app.use(express.json());

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/static/formularz6.html"))
})

app.post("/form", (req, res)=>{
    values = req.body
    rgba = `rgba(${values.red},${values.green},${values.blue},${values.a/100})`

    res.header("content-type","application/json")
    res.send(JSON.stringify(rgba))
})

app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})