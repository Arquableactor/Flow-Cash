const BASE_URL = "https://tu-api.onrender.com";

export const getTransactions = async () => {
  const res = await fetch(`${BASE_URL}/users`);
  return res.json();
};