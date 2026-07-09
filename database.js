const fs = require("fs");
const path = require("path");

const DB_FILE = path.join(__dirname, "data.json");

function loadDB() {
    if (!fs.existsSync(DB_FILE)) {
        return { users: [], transactions: [] };
    }
    try {
        return JSON.parse(fs.readFileSync(DB_FILE, "utf-8"));
    } catch (err) {
        return { users: [], transactions: [] };
    }
}

function saveDB(db) {
    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2));
}

module.exports = { loadDB, saveDB };
