require("dotenv").config();

const path = require("path");
const express = require("express");
const cors = require("cors");

const authRoutes = require("./authRoutes");
const transactionRoutes = require("./transactionRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// Serve static frontend files (html, css, js) from the project root
app.use(express.static(path.join(__dirname)));

app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionRoutes);

// Fallback: serve index.html for the root route
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});
