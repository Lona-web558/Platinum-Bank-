const crypto = require("crypto");
const { loadDB, saveDB } = require("./database");

const Transaction = {
    create: async (data) => {
        const db = loadDB();
        const transaction = {
            _id: crypto.randomUUID(),
            userId: data.userId,
            type: data.type,
            amount: data.amount,
            description: data.description || "",
            recipient: data.recipient || "",
            createdAt: new Date().toISOString()
        };
        db.transactions.push(transaction);
        saveDB(db);
        return { ...transaction };
    },

    find: (query) => {
        const db = loadDB();
        const results = db.transactions.filter((t) =>
            Object.keys(query).every((key) => String(t[key]) === String(query[key]))
        );

        return {
            sort: async (sortObj) => {
                const key = Object.keys(sortObj)[0];
                const dir = sortObj[key];
                results.sort((a, b) => {
                    if (a[key] < b[key]) return dir === -1 ? 1 : -1;
                    if (a[key] > b[key]) return dir === -1 ? -1 : 1;
                    return 0;
                });
                return results;
            }
        };
    }
};

module.exports = Transaction;
