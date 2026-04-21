const buildQuery = (queryParams) => {
  const { category, type, title, startDate, endDate, sort } = queryParams;

  const filter = {};
  let sortOption = { date: -1 };

  // Filtrar por categoría
  if (category) {
    filter.category = category;
  }

  // Filtrar por tipo
  if (type) {
    filter.type = type;
  }

  // Buscar por texto en title
  if (title) {
    filter.title = { $regex: title, $options: "i" };
  }

  // Filtrar por rango de fechas
  if (startDate || endDate) {
    filter.date = {};

    if (startDate) {
      filter.date.$gte = new Date(startDate);
    }

    if (endDate) {
      filter.date.$lte = new Date(endDate);
    }
  }

  // Ordenar
  if (sort === "oldest") {
    sortOption = { date: 1 };
  }

  if (sort === "recent") {
    sortOption = { date: -1 };
  }

  return { filter, sortOption };
};

module.exports = buildQuery;