const BASE_URL = "https://flowcash-api.onrender.com/api";

// GET ALL
export const getTransactions = async () => {
  const res = await fetch(`${BASE_URL}/transactions`);
  if (!res.ok) throw new Error("Error fetching transactions");

  const data = await res.json();
  return data.data; // 👈 SOLO el array
};

// CREATE
export const createTransaction = async (data) => {
  const res = await fetch(`${BASE_URL}/transactions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Error creating transaction");
  return res.json();
};

// UPDATE
export const updateTransaction = async (id, data) => {
  const res = await fetch(`${BASE_URL}/transactions/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Error updating transaction");
  return res.json();
};

// DELETE
export const deleteTransaction = async (id) => {
  const res = await fetch(`${BASE_URL}/transactions/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Error deleting transaction");
  return res.json();
};