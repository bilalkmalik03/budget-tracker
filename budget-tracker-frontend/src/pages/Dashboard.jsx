import { useEffect, useState } from "react";
import { getTransactions, getBalance, addTransaction, deleteTransaction } from "../services/transactionService";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState({ income: 0, expense: 0, total: 0 });
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("income");

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const trans = await getTransactions(token);
      const bal = await getBalance(token);
      setTransactions(trans);
      setBalance(bal);
    } catch (err) {
      console.error("Failed to load data", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addTransaction(token, { title, amount: Number(amount), type });
      setTitle("");
      setAmount("");
      setType("income");
      await fetchData(); // Refresh transactions and balance
    } catch (err) {
      console.error("Failed to add transaction", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");  // remove JWT
    navigate("/");  // send user back to login
  };

  const handleDelete = async (id) => {
    try {
      await deleteTransaction(token, id);
      await fetchData(); // refresh transactions and balance
    } catch (err) {
      console.error("Failed to delete transaction", err);
    }
    
  };
  
  return (
    <div style={{ padding: "2rem" }}>
      <h1>Dashboard</h1>
      <button onClick={handleLogout} style={{ marginBottom: "1rem" }}>
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
        /><br/><br/>
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        /><br/><br/>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select><br/><br/>
        <button type="submit">Add Transaction</button>
      </form>

      <h3>Transactions</h3>
      <ul>
  {transactions.map((tx) => (
    <li key={tx._id}>
      {tx.title} - ${tx.amount} ({tx.type})
      <button onClick={() => handleDelete(tx._id)} style={{ marginLeft: "1rem" }}>
        Delete
      </button>
    </li>
  ))}
</ul>
    </div>
  );
  
}


export default Dashboard;

