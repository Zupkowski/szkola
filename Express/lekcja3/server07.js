const express = require("express")
const app = express()
const PORT = 3000

const path = require("path")

app.use(express.json());

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/static/formularz7.html"))
})

app.post("/form", (req, res)=>{
    coords = req.body
    elapsed = req.body.date
    result = {time:Date.now() - elapsed}
    
    res.header("content-type","application/json")
    res.send(JSON.stringify(result))
})

app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})