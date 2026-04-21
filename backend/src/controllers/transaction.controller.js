const mongoose = require("mongoose");
const Transaction = require("../models/transaction.model");
const buildQuery = require("../utils/buildQuery");

// Validar ObjectId
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// GET ALL
const getAllTransactions = async (req, res, next) => {
  try {
    const { filter, sortOption } = buildQuery(req.query);

    const transactions = await Transaction.find(filter).sort(sortOption);

    res.status(200).json({
      success: true,
      message: "Transactions fetched successfully",
      count: transactions.length,
      data: transactions,
    });
  } catch (error) {
    next(error);
  }
};

// GET BY ID
const getTransactionById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid transaction id",
      });
    }

    const transaction = await Transaction.findById(id);

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: "Transaction not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Transaction fetched successfully",
      count: 1,
      data: transaction,
    });
  } catch (error) {
    next(error);
  }
};

// CREATE
const createTransaction = async (req, res, next) => {
  try {
    const {
      title,
      type,
      amount,
      category,
      date,
      description,
      paymentMethod,
    } = req.body;

    const transaction = await Transaction.create({
      title,
      type,
      amount,
      category,
      date,
      description,
      paymentMethod,
    });

    res.status(201).json({
      success: true,
      message: "Transaction created successfully",
      count: 1,
      data: transaction,
    });
  } catch (error) {
    next(error);
  }
};

// UPDATE
const updateTransaction = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid transaction id",
      });
    }

    const updatedTransaction = await Transaction.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedTransaction) {
      return res.status(404).json({
        success: false,
        message: "Transaction not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Transaction updated successfully",
      count: 1,
      data: updatedTransaction,
    });
  } catch (error) {
    next(error);
  }
};

// DELETE
const deleteTransaction = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid transaction id",
      });
    }

    const deletedTransaction = await Transaction.findByIdAndDelete(id);

    if (!deletedTransaction) {
      return res.status(404).json({
        success: false,
        message: "Transaction not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Transaction deleted successfully",
      count: 1,
      data: deletedTransaction,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllTransactions,
  getTransactionById,
  createTransaction,
  updateTransaction,
  deleteTransaction,
};