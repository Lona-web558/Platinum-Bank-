const express = require("express");

const router = express.Router();

const transactionController = require("./transactionController");

router.post("/deposit", transactionController.deposit);
router.post("/withdraw", transactionController.withdraw);
router.post("/transfer", transactionController.transfer);
router.get("/history/:id", transactionController.history);

module.exports = router;
