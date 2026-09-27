const express = require("express")
const app = express()
const PORT = 3000

const path = require("path")

function makeDiv(count,color,font,size) {
    let html = ""
    for (i=1;i<=count;i++) {
        html += `<div style="width: ${size}; height: ${size}; background: ${color}; font-size: ${font}; margin: 10px;">${i}</div>`
    }
    return html
}

app.use(express.urlencoded({
  extended: true
}));

app.get("/", function(req, res){
    res.sendFile(path.join(__dirname,"/static/formularz3.html"))    
})

app.post("/", function(req, res){
    let count = parseInt(req.body.count)
    let color = req.body.color
    let font = req.body.font
    let size = req.body.size
    res.send(makeDiv(count,color,font,size))
})

app.listen(PORT, function() {
    console.log("Odpalona na porcie "+PORT)
})
