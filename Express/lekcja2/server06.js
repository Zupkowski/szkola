const express = require("express")
const app = express()
const PORT = 3000

const path = require("path")

let users = [
   {nick:"111", email:"111@w.pl"},
   {nick:"222", email:"222@w.pl"},
   {nick:"333", email:"333@w.pl"}
]


// TA SAMA FUNKCJA CO PONIZEJ, TYLKO ZE FOR'EM 
// function addUser(nick, mail) {
//     for (let i=0;i<users.length;i++) {
//         if (users[i]["email"] === mail) {
//             return "Taki mail jest juz w bazie."
//         }
//     }
//     users.push({"nick":nick, "email":mail}) 
//     return "Dodano uzytkownika."
// }

function addUser(nick, mail) {
    let isFound = false
    users.forEach(obj => { if (obj.email === mail) { isFound = true }})
    if (isFound) {
        return "Taki mail jest juz w bazie."
    }
    else {
        users.push({"nick":nick, "email":mail}) 
        return "Dodano uzytkownika."
    }
}

function makeSelectForm() {
    let html = `
        <h1>Usuń email (Select)</h1>
        <form action="/removeBySelect" method="post">
            <select name="selectUserDel">
    `
    for (let i=0; i<users.length; i++) {
        html += `
            <option value="${users[i].email}">${users[i].email}</option>
        `
    }
    html += `
            </select>
            <button type="submit">Usuń</button>
        </form>
    `
    return html
}

function removeUser(userObject) {
    users.splice(users.indexOf(userObject), 1)
}


app.use(express.urlencoded({
    extended: true
}))

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "/static/addUser.html"))
})

app.post("/", function(req, res) {
    res.send(addUser(req.body.nick, req.body.email))
    console.log(users)
})

app.get("/removeBySelect", function(req, res) {
    res.send(makeSelectForm())
})

app.post("/removeBySelect", function(req, res) {
    removeUser(req.body.selectUserDel)
    res.send(`Usunieto uzytkownika o emailu ${req.body.selectUserDel}`)
})

app.listen(3000)

