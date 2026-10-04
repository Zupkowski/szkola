const express = require("express")
const app = express()
const PORT = 3000

const path = require("path")

let logowania = []
id = 0


app.use(express.json());

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/static/formularz4.html"))
})

app.post("/add", (req, res)=>{
    user = req.body
    user.id = id++
    console.log(user)

    logowania.push(user)


    res.header("content-type","application/json")
    res.send(JSON.stringify(logowania, null, 5))
})

app.post("/del", (req, res)=>{
    logowania = logowania.filter(l => l.id !== req.body.id)

    res.header("content-type", "application/json")
    res.send(JSON.stringify(logowania, null, 5))
})

app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})