const express = require("express")
const app = express()
const PORT = 3000

const path = require("path")
const formidable = require('formidable')

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/static/index05.html"))
})

app.post('/api', function (req, res) {

    responseArray = []

    let form = formidable({});

    form.uploadDir = __dirname + '/static/upload/' // folder do zapisu zdjęcia
    form.keepExtensions = true // zapis z rozszerzeniem pliku

    form.parse(req, function (err, fields, files) {

        responseArray.push({
            "path": files.file.path
        })

        res.header("content-type", "application/json") //zwracanie JSONa
        res.send(JSON.stringify(responseArray, null, 5))
        console.log(fields)
        console.log(files)
        console.log(form.bytesExpected, form.bytesReceived);
    });
});


app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})