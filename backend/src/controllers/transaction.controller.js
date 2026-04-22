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