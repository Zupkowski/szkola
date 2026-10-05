const express = require("express")
const app = express()
const PORT = 3001

const path = require("path")

app.use(express.urlencoded({
    extended: true
}));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "static/index02.html"))
})

app.post("/handleForm", (req, res) => {
    title = req.body.title
    values = req.body.values
    valArray = values.split(",")
    max = maxElement(valArray)

    function maxElement(array) {
        max = parseInt(array[0])
        array.forEach(u => {
            if (parseInt(u) > max) {
                max = parseInt(u)
            }
        })
        return max
    }

    div = "<div>"
    h1 = `<h1>Z02: ${title}</h1>`
    div += h1
    for (i = 0; i < valArray.length; i++) {
        length = parseInt(valArray[i]) / max * 100
        if (parseInt(valArray[i]) > 10) { color = "red" } else { color = "cornflowerblue" }
        maxDiv = `<div style="width: 200px; height: 20px; background: lightgrey; margin-bottom: 10px; color: white;"><div style="width: ${length}%; height: 20px; background: ${color}; text-align: right;">${parseInt(valArray[i])}</div></div>`
        div += maxDiv
    }
    div += "</div>"
    res.send(div)
})

app.listen(PORT, () => {
    console.log("odpalono " + PORT)
})