const BASE_URL = import.meta.env.VITE_API_URL;

export async function getTransactions(token) {
  const res = await fetch(`${BASE_URL}/api/transactions`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Failed to fetch transactions");
  }

  return await res.json();
}

export async function getBalance(token) {
  const res = await fetch(`${BASE_URL}/api/transactions/balance`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Failed to fetch balance");
  }

  return await res.json();
}

export async function addTransaction(token, transactionData) {
  const res = await fetch(`${BASE_URL}/api/transactions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(transactionData),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Failed to add transaction");
  }

  return await res.json();
}

export async function deleteTransaction(token, id) {
  const res = await fetch(`${BASE_URL}/api/transactions/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Failed to delete transaction");
  }

  return await res.json();
}
