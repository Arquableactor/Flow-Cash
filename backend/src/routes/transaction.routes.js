const express = require("express");

const {
  getAllTransactions,
  getTransactionById,
  createTransaction,
  updateTransaction,
  deleteTransaction,
} = require("../controllers/transaction.controller");

const router = express.Router();

// GET all
router.get("/", getAllTransactions);

// GET by id
router.get("/:id", getTransactionById);

// POST create
router.post("/", createTransaction);

// PUT update
router.put("/:id", updateTransaction);

// DELETE
router.delete("/:id", deleteTransaction);

module.exports = router;