const Datastore = require('@seald-io/nedb')

const coll1 = new Datastore({
    filename: 'databases/kolekcja.db',
    autoload: true
});

coll1.remove({}, { multi: true }, function (err, numRemoved) {
    console.log("usunięto wszystkie dokumenty: ", numRemoved)
});