const express = require("express")
const app = express()
const PORT = 3000

let auta = ["audi", "opel", "francuz", "duży fiat", "mercedes", "małe fajne autko", "duże autko", "prądolot"]

function makeCarsTable(auta) {
    let count = auta.length
    let html = `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                table, td, th {
                    border: 1px solid black;
                    border-collapse: collapse;
                } 
                th {
                    background: blue; 
                    color: white;
                } 
                th, td {
                    padding: 3px 10px; 
                    margin: auto;
                } 
                button {
                    background: green; 
                    color: white; 
                    padding: 10px 25px; 
                    border: none; 
                    border-radius: 5px; 
                    margin-top: 10px;
                }
            </style>
        </head>
        <body>
            <form action="/" method="post"> 
                <table>
                    <tr>
                        <th></th>
                        <th></th>
                        <th>nowych</th>
                        <th>uzywanych</th>
                        <th>powypadkowych</th>
                    </tr>
    `
    for (let i=0; i<count; i++) {
        html += `
            <tr>
                <td>${i+1}</td>
                <td>${auta[i]}</td>
                <td><input type="radio" name="${auta[i]}" value="nowych"></td>
                <td><input type="radio" name="${auta[i]}" value="uzywanych"></td>
                <td><input type="radio" name="${auta[i]}" value="powypadkowych"></td>
            </tr>
        `
    }
    html += `
                </table>
                <button type='submit'>Wyślij</button>
            </form>
        </body>
        </html>
    `
    return html
}

app.use(express.urlencoded({
  extended: true
}))

app.get("/", function(req, res){
    res.send(makeCarsTable(auta))
})
app.post("/", function(req,res) {
    let status = Object.values(req.body)
    let nowych = 0
    let uzywanych = 0
    let powypadkowych = 0
    
    for (let i=0; i<status.length; i++) {
        if (status[i] === "nowych") {
            nowych++
        }
        else if (status[i] === "uzywanych") {
            uzywanych++
        }
        else if (status[i] === "powypadkowych")  {
            powypadkowych++
        }
    }
    res.send({"nowych":nowych,"uzywanych":uzywanych,"powypadkowych":powypadkowych})
    
})

app.listen(PORT, function() {
    console.log("Odpalona na porcie "+PORT)
})

