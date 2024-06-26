import fs from 'fs';

// A class should have one responsibility in this case manage a Journal
class Journal {
    constructor() {
        this.entries = [];
        this.count = 0;
    }

    addEntry(text) {
        this.entries.push(`${++this.count}: ${text}`);

        return this.count;
    }

    removeEntry(index) {
        this.entries.splice(index, 1);
    }

    toString() {
        return this.entries.join('\n');
    }

    // Since all the operations that are below this comment are related and probably will have the same behavior, they could be in another class.

    // This is an antipattern because we are mixing responsibilities, Journal should only manage entries
    // save(filename) {
    //     fs.writeFileSync(filename, this.toString());
    // }

    // // This is an antipattern because we are mixing responsibilities, Journal should only manage entries
    // load(filename) {
    //     // Load from file
    // }

    // // This is an antipattern because we are mixing responsibilities, Journal should only manage entries
    // loadFromWeb(url) {
    //     // Load from web
    // }
}

// This class should be responsible for saving and loading the journal
// Also this way we apply the separation of concerns principle and avoid th God object antipattern
class PersistenceManager {
    preprocess(j) {
        // Do something
    }

    saveToFile(journal, filename) {
        fs.writeFileSync(filename, journal.toString());
    }
}

let j = new Journal();

j.addEntry('I started a course today.');
j.addEntry('I am learning about design patterns.');

console.log(j.toString());

let p = new PersistenceManager();

let filename = 'journal.txt';

// Dont want to run this, is just for the example
// p.saveToFile(j, filename);
