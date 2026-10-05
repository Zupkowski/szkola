const express = require("express")
const app = express()
const PORT = 3000

app.get("/", function (req, res) {
    if (!req.query.width) {
        width = 5
    }
    else {
        width = req.query.width
    }
    if (!req.query.height) {
        height = 5
    }
    else {
        height = req.query.height
    }
    if (!req.query.bg1) {
        bg1 = "red"
    }
    else {
        bg1 = req.query.bg1
    }
    if (!req.query.bg2) {
        bg2 = "blue"
    }
    else {
        bg2 = req.query.bg2
    }

    table = "<table>"
    for (let i = 1; i <= height; i++) {
        tr = "<tr>"
        for (let j = 1; j <= width; j++) {
            if (i % 2 == 0) {
                if (j % 2 == 0) {
                    td = `<td style="background: ${bg2}">${i}, ${j}</td>`
                }
                else {
                    td = `<td style="background: ${bg1}">${i}, ${j}</td>`
                }
            }
            else {
                if (j % 2 == 0) {
                    td = `<td style="background: ${bg1}">${i}, ${j}</td>`
                }
                else {
                    td = `<td style="background: ${bg2}">${i}, ${j}</td>`
                }
            }
            tr += td
        }
        tr += "</tr>"
        table += tr
        tr = ""
    }
    table += "</table>"
    res.send(table)
})

app.listen(PORT, () => {
    console.log("odpalono " + PORT)
})