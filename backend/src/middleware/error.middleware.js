const errorMiddleware = (err, req, res, next) => {
  console.error(err);

  // Error de validación de Mongoose
  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map((item) => item.message);

    return res.status(400).json({
      success: false,
      message: messages.join(", "),
    });
  }

  // Error de cast (ObjectId inválido)
  if (err.name === "CastError") {
    return res.status(400).json({
      success: false,
      message: "Invalid resource id",
    });
  }

  // Error general
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal server error",
  });
};

module.exports = errorMiddleware;