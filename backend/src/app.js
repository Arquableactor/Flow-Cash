const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const transactionRoutes = require("./routes/transaction.routes");
const notFoundMiddleware = require("./middleware/notFound.middleware");
const errorMiddleware = require("./middleware/error.middleware");

const app = express();

// CORS
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
  })
);

// Middlewares globales
app.use(morgan("dev"));
app.use(express.json());

// Ruta base
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "FlowCash API running",
    data: null,
  });
});

// Rutas principales
app.use("/api/transactions", transactionRoutes);

// Middlewares de errores
app.use(notFoundMiddleware);
app.use(errorMiddleware);

module.exports = app;