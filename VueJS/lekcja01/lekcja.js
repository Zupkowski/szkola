const fs = require("fs")

const filenames = fs.readdirSync(__dirname + "/static");
console.log(filenames)
console.log(filenames.forEach(e => {
    console.log(fs.readdirSync(__dirname + "/static/" + e + "/"))
}))