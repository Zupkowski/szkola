const express = require("express")
const app = express()
const PORT = 3000

const path = require("path")
const formidable = require('formidable')

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/static/index.html"))
})

app.post('/handleUpload', function (req, res) {

    responseArray = {}
    beginTime = 0
    count = 0

    let form = formidable({});

    form.uploadDir = __dirname + '/static/upload/' // folder do zapisu zdjęcia
    form.keepExtensions = true // zapis z rozszerzeniem pliku


    form.on("fileBegin", function (name, value) {
        beginTime = new Date().getTime()
    })

    form.on("progress", function (bytesReceived, bytesExpected) {
        now =  new Date()
        responseArray[count++] = {
            bytesExpected: bytesExpected,
            bytesReceived:  bytesReceived,
            currentTime: "czas bieżący: " + now.getSeconds() + " sekunda, " + now.getMilliseconds() + " milisekunda"
        }
    })

    form.on("end", function () {
        endTime = new Date().getTime() - beginTime
        responseArray.fulltime = "cały zapis trwał: " + Math.floor(endTime / 1000) + " sekund, " + (endTime % 1000) + " milisekund"

        res.header("content-type", "application/json")
        res.send(JSON.stringify(responseArray, null, 5))
    })

    form.parse(req, function (err, fields, files) {
    });
});


app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})