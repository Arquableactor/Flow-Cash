const mongoose = require("mongoose");

// Valores permitidos
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
      required: [true, "Title is required"],
      minlength: [3, "Title must be at least 3 characters"],
      trim: true,
    },

    type: {
      type: String,
      required: [true, "Type is required"],
      enum: {
        values: allowedTypes,
        message: 'Type must be either "income" or "expense"',
      },
    },

    amount: {
      type: Number,
      required: [true, "Amount is required"],
      min: [0.01, "Amount must be greater than 0"],
    },

    category: {
      type: String,
      required: [true, "Category is required"],
      enum: {
        values: allowedCategories,
        message: "Invalid category value",
      },
      trim: true,
    },

    date: {
      type: Date,
      required: [true, "Date is required"],
    },

    description: {
      type: String,
      maxlength: [200, "Description cannot exceed 200 characters"],
      trim: true,
      default: "",
    },

    paymentMethod: {
      type: String,
      required: [true, "Payment method is required"],
      enum: {
        values: allowedPaymentMethods,
        message: 'Payment method must be "cash", "card" or "transfer"',
      },
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
