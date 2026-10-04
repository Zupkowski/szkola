const express = require("express")
const app = express()
const PORT = 3000

const path = require("path")

app.use(express.json());

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/static/formularz2.html"))
})

app.post("/test", (req, res)=>{
    console.log(req.body);
    res.send(JSON.stringify(req.body)); 
})

app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})