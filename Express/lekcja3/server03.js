const express = require("express")
const app = express()
const PORT = 3000

const path = require("path")

app.use(express.json());

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/static/formularz3.html"))
})

app.post("/form", (req, res)=>{

    const firstNum = req.body.a
    const secondNum = req.body.b
    const op = req.body.op
    let message = ""

    wyniki = {
        suma: { message:"suma dwóch elementów", wynik: firstNum + secondNum },
        roznica: { message:"różnica dwóch elementów", wynik: firstNum - secondNum },
        iloczyn: { message:"iloczyn dwóch elementów", wynik: firstNum * secondNum },
        iloraz: { message:"iloraz dwóch elementów", wynik: firstNum / secondNum }
    }

    let result
    if (op == "wszystko") {
        result = Object.values(wyniki)
    }
    else {
        result = wyniki[op]
    }
        
    res.header("content-type","application/json")
    res.send(JSON.stringify(result, null, 5))
})  

app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})