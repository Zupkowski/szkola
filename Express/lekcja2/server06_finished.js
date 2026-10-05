const express = require("express")
const path = require("path")
const app = express()
const PORT = 3000

let users = [
    { nick: "111", email: "111@w.pl" },
    { nick: "222", email: "222@w.pl" },
    { nick: "333", email: "333@w.pl" }
]

// parser danych z formularza (application/x-www-form-urlencoded)
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, "static")))

// --- pomocnicze ---------------------------------------------------------

// zamiana znaków specjalnych, żeby nick z <script> nie zepsuł strony
function esc(text) {
    return String(text)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
}

function page(title, body) {
    return `<!DOCTYPE html>
<html lang="pl">
<head><meta charset="UTF-8"><title>${esc(title)}</title></head>
<body>
    <h1>${esc(title)}</h1>
    ${body}
    <p><a href="/addUser_finished.html">dodaj usera</a> |
       <a href="/removeUserBySelect">select</a> |
       <a href="/removeUserByRadio">radio</a> |
       <a href="/removeUserByCheckboxes">checkboxy</a></p>
</body>
</html>`
}

function usersList() {
    if (users.length === 0) return "<p>brak userów</p>"
    return "<ul>" + users.map(u => `<li>${esc(u.nick)} (${esc(u.email)})</li>`).join("") + "</ul>"
}

// --- a) dodawanie -------------------------------------------------------

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "static/addUser_finished.html"))
})

app.post("/addUser", (req, res) => {
    const nick = (req.body.nick || "").trim()
    const email = (req.body.email || "").trim().toLowerCase()

    if (!nick || !email) {
        return res.status(400).send("podaj nick i email")
    }

    if (users.some(u => u.email.toLowerCase() === email)) {
        return res.send("taki mail już jest w bazie")
    }

    users.push({ nick: nick, email: email })
    console.log(users)

    res.send(page("Dodano usera", usersList()))
})

// podgląd tablicy jako JSON (pomocniczo, do sprawdzania)
app.get("/users", (req, res) => {
    res.header("content-type", "application/json")
    res.send(JSON.stringify(users, null, 5))
})

// --- b) usuwanie przez select ------------------------------------------

app.get("/removeUserBySelect", (req, res) => {
    if (users.length === 0) return res.send(page("Usuń (select)", "<p>brak userów</p>"))

    const options = users
        .map(u => `<option value="${esc(u.email)}">${esc(u.nick)} (${esc(u.email)})</option>`)
        .join("")

    res.send(page("Usuń (select)", `
        <form method="POST" action="/removeUserBySelect">
            <select name="email" required>${options}</select>
            <button type="submit">usuń</button>
        </form>`))
})

app.post("/removeUserBySelect", (req, res) => {
    const email = req.body.email
    users = users.filter(u => u.email !== email)
    console.log(users)

    res.send(page("Usunięto (select)", usersList()))
})

// --- c) usuwanie przez radio -------------------------------------------

app.get("/removeUserByRadio", (req, res) => {
    if (users.length === 0) return res.send(page("Usuń (radio)", "<p>brak userów</p>"))

    const radios = users
        .map(u => `<label><input type="radio" name="email" value="${esc(u.email)}" required> ${esc(u.nick)} (${esc(u.email)})</label><br>`)
        .join("")

    res.send(page("Usuń (radio)", `
        <form method="POST" action="/removeUserByRadio">
            ${radios}
            <button type="submit">usuń</button>
        </form>`))
})

app.post("/removeUserByRadio", (req, res) => {
    const email = req.body.email
    users = users.filter(u => u.email !== email)
    console.log(users)

    res.send(page("Usunięto (radio)", usersList()))
})

// --- d) usuwanie przez checkboxy ---------------------------------------

app.get("/removeUserByCheckboxes", (req, res) => {
    if (users.length === 0) return res.send(page("Usuń (checkboxy)", "<p>brak userów</p>"))

    const boxes = users
        .map(u => `<label><input type="checkbox" name="email" value="${esc(u.email)}"> ${esc(u.nick)} (${esc(u.email)})</label><br>`)
        .join("")

    res.send(page("Usuń (checkboxy)", `
        <form method="POST" action="/removeUserByCheckboxes">
            ${boxes}
            <button type="submit">usuń zaznaczonych</button>
        </form>`))
})

app.post("/removeUserByCheckboxes", (req, res) => {
    // brak zaznaczenia: undefined, jeden: string, kilka: tablica
    const doUsuniecia = [].concat(req.body.email || [])

    users = users.filter(u => !doUsuniecia.includes(u.email))
    console.log(users)

    res.send(page("Usunięto (checkboxy)", usersList()))
})

app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})
