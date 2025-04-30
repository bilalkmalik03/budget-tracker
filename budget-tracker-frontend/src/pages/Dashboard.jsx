import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTransactions, getBalance, addTransaction, deleteTransaction } from "../services/transactionService";
import { toast } from "react-toastify";

function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState({ income: 0, expense: 0, total: 0 });
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("income");

  const navigate = useNavigate();

  const fetchData = async () => {
    const token = localStorage.getItem("token");
    try {
      const trans = await getTransactions(token);
      const bal = await getBalance(token);
      setTransactions(trans);
      setBalance(bal);
    } catch (err) {
      console.error("Failed to load data", err);
      if (err.message.includes("Invalid token")) {
        toast.error("Session expired. Please log in again.");
        localStorage.removeItem("token");
        navigate("/");
      }
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    } else {
      fetchData();
    }

    const handleTabClose = () => {
      localStorage.removeItem("token");
    };

    window.addEventListener("beforeunload", handleTabClose);
    return () => {
      window.removeEventListener("beforeunload", handleTabClose);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    console.log("📦 token being sent:", token); 
  
    try {
      await addTransaction(token, {
        title,
        amount: Number(amount),
        type
      });
      toast.success("✅ Transaction added!");
      await fetchData();
    } catch (err) {
      console.error("Failed to add transaction", err);
      if (err.message.includes("Invalid token")) {
        toast.error("Session expired. Please log in again.");
        localStorage.removeItem("token");
        navigate("/");
      }
    }
  };
  

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await deleteTransaction(token, id);
      toast.info("🗑️ Transaction deleted");
      await fetchData();
    } catch (err) {
      console.error("Failed to delete transaction", err);
      if (err.message.includes("Invalid token")) {
        toast.error("Session expired. Please log in again.");
        localStorage.removeItem("token");
        navigate("/");
      }
    }
  };

  return (
    <div
      style={{
        width: "100vw",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        backgroundColor: "#f5f6fa",
        padding: "2rem",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1000px",
          background: "white",
          padding: "2rem",
          borderRadius: "10px",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          display: "flex",
          gap: "2rem",
          boxSizing: "border-box",
        }}
      >
        {/* LEFT PANEL */}
        <div style={{ flex: 1 }}>
          <h1>Dashboard</h1>
          <button type="button" onClick={handleLogout} style={{ marginBottom: "1rem" }}>
            Logout
          </button>
  
          <h3>Balance</h3>
          <p>Income: ${balance.income}</p>
          <p>Expense: ${balance.expense}</p>
          <p><strong>Total: ${balance.total}</strong></p>
  
          <h3>Add Transaction</h3>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
            <select value={type} onChange={(e) => setType(e.target.value)}>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
            <button type="submit">Add Transaction</button>
          </form>
        </div>
  
        {/* RIGHT PANEL */}
        <div style={{ flex: 1 }}>
          <h3>Transactions</h3>
          <ul>
  {transactions.map((tx) => (
    <li key={tx._id}>
      <span className={`transaction-${tx.type}`}>
        {tx.title} - ${tx.amount} ({tx.type})
      </span>
      <button
        onClick={() => handleDelete(tx._id)}
        style={{ marginLeft: "1rem" }}
      >
        Delete
      </button>
    </li>
  ))}
</ul>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
