const express = require("express")
const app = express()
const PORT = 3000

const path = require("path")
const formidable = require('formidable')

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/static/index.html"))
})

app.post('/handleUpload', function (req, res) {

    responseArray = []

    let form = formidable({});

    form.uploadDir = __dirname + '/static/upload/' // folder do zapisu zdjęcia
    form.keepExtensions = true // zapis z rozszerzeniem pliku

    form.parse(req, function (err, fields, files) {

        responseArray.push({
            "date": fields.date
        })
        responseArray.push({
            "path": files.imagetoupload.path
        })

        res.header("content-type", "application/json") //zwracanie JSONa
        res.send(JSON.stringify(responseArray, null, 5))
    });
});


app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})