const Transaction = require("../models/transaction.model");

const getAllTransactions = async (req, res, next) => {
  try {
    const transactions = await Transaction.find().sort({ date: -1 });

    res.status(200).json({
      success: true,
      data: transactions,
    });
  } catch (error) {
    next(error);
  }
};

const getTransactionById = async (req, res, next) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: "Transaction not found",
      });
    }

    res.status(200).json({
      success: true,
      data: transaction,
    });
  } catch (error) {
    next(error);
  }
};

const createTransaction = async (req, res, next) => {
  try {
    let { description, amount, type, category } = req.body;

    if (!description || !amount || !type || !category) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    const typeMap = {
      Ingreso: "income",
      Gasto: "expense",
      income: "income",
      expense: "expense",
    };

    const categoryMap = {
      Comida: "food",
      Transporte: "transport",
      Entretenimiento: "entertainment",
      Otros: "other",
      food: "food",
      transport: "transport",
      entertainment: "entertainment",
      other: "other",
    };

    const finalType = typeMap[type];
    const finalCategory = categoryMap[category];

    if (!finalType || !finalCategory) {
      return res.status(400).json({
        success: false,
        message: "Invalid type or category",
      });
    }

    const parsedAmount = Number(amount);

    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid amount",
      });
    }

    const transaction = await Transaction.create({
      title: description.trim(),
      description: description.trim(),
      amount: parsedAmount,
      type: finalType,
      category: finalCategory,
      date: new Date(),
      paymentMethod: "cash",
    });

    res.status(201).json({
      success: true,
      data: transaction,
    });
  } catch (error) {
    next(error);
  }
};

const updateTransaction = async (req, res, next) => {
  try {
    const updated = await Transaction.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json({
      success: true,
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

const deleteTransaction = async (req, res, next) => {
  try {
    await Transaction.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Deleted",
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