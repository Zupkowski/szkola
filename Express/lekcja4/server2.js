const express = require("express")
const app = express()
const PORT = 3000

const path = require("path")
const formidable = require('formidable')

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/static/index2.html"))
})

app.post('/handleUpload', function (req, res) {

    responseArray = []
    filesArray = []

    let form = formidable({});

    form.uploadDir = __dirname + '/static/upload/' // folder do zapisu zdjęcia
    form.keepExtensions = true // zapis z rozszerzeniem pliku
    form.multiples = true //zezwalaj na wiele plików


    form.parse(req, function (err, fields, files) {

        responseArray.push({
            "date": fields.date
        })

        for (i = 0; i < files.imageupload.length; i++) {
            filesArray.push({
                "path": files.imageupload[i].path
            })
        }


        responseArray.push({
            filesArray
        })

        res.header("content-type", "application/json")
        res.send(JSON.stringify(responseArray, null, 5))

        console.log(fields)
        console.log(files)
        console.log(filesArray)
    });
});


app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})