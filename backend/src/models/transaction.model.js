const mongoose = require("mongoose");

const allowedTypes = ["income", "expense"];

const allowedPaymentMethods = ["cash", "card", "transfer"];

const allowedCategories = [
  "food",
  "transport",
  "housing",
  "services",
  "entertainment",
  "health",
  "education",
  "shopping",
  "salary",
  "freelance",
  "other",
];

const transactionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: false,
      minlength: 3,
      trim: true,
    },

    description: {
      type: String,
      required: true, 
      maxlength: 200,
      trim: true,
    },

    type: {
      type: String,
      required: true,
      enum: allowedTypes,
    },

    amount: {
      type: Number,
      required: true,
      min: 0.01,
    },

    category: {
      type: String,
      required: true,
      enum: allowedCategories,
      default: "other", 
    },

    date: {
      type: Date,
      default: Date.now,
    },

    paymentMethod: {
      type: String,
      enum: allowedPaymentMethods,
      default: "cash",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;