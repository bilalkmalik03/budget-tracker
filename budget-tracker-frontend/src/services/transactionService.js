const BASE_URL = "http://localhost:5000/api/transactions";

export async function getTransactions(token) {
  const res = await fetch(BASE_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  return data;
}

export async function getBalance(token) {
  const res = await fetch(`${BASE_URL}/balance`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  return data;
}
export async function addTransaction(token, transactionData) {
    const res = await fetch("http://localhost:5000/api/transactions", {
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
    const res = await fetch(`http://localhost:5000/api/transactions/${id}`, {
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