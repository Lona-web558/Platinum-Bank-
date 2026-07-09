const crypto = require("crypto");
const { loadDB, saveDB } = require("./database");

function attachSave(record) {
    if (!record) return null;
    record.save = async function () {
        const db = loadDB();
        const idx = db.users.findIndex((u) => u._id === record._id);
        if (idx !== -1) {
            const { save, ...plain } = record;
            db.users[idx] = plain;
            saveDB(db);
        }
        return record;
    };
    return record;
}

const User = {
    findOne: async (query) => {
        const db = loadDB();
        const found = db.users.find((u) =>
            Object.keys(query).every((key) => u[key] === query[key])
        );
        return attachSave(found ? { ...found } : null);
    },

    findById: async (id) => {
        const db = loadDB();
        const found = db.users.find((u) => u._id === id);
        return attachSave(found ? { ...found } : null);
    },

    create: async (data) => {
        const db = loadDB();
        const user = {
            _id: crypto.randomUUID(),
            fullName: data.fullName,
            email: data.email,
            password: data.password,
            balance: data.balance || 0,
            accountNumber: data.accountNumber,
            accountType: data.accountType || "Savings",
            status: data.status || "Active",
            createdAt: new Date().toISOString()
        };
        db.users.push(user);
        saveDB(db);
        return { ...user };
    }
};

module.exports = User;
