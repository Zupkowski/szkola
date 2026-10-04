const express = require("express")
const app = express()
const PORT = 3000

const path = require("path")

app.use(express.urlencoded({
  extended: true
}));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/static/formularz.html"))
})

app.post("/handleForm", function(req, res){
    const firstNum = req.body.num1
    const secondNum = req.body.num2
    const op = req.body.operation
    let wynik = 0
    let message = ""

    if (op == "+") {
        wynik = firstNum + secondNum
        message = "suma dwóch elementów"
    }
    else if (op == "-") {
        wynik = firstNum - secondNum
        message = "różnica dwóch elementów"
    }
    else if (op == "*") {
        wynik = firstNum * secondNum
        message = "iloczyn dwóch elementów"
    }
    else if (op == "/") {
        wynik = firstNum / secondNum
        message = "iloraz dwóch elementów"
    }

    let result = JSON.stringify({"message": message, "wynik": wynik}, null, 5)

    res.header("content-type","application/json")
    res.send(result)
})

app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})