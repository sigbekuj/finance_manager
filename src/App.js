import { useEffect, useState } from "react";
import axios from "axios";
import TransactionForm from "./TransactionForm";

function App() {
  const [transactions, setTransactions] = useState([]);

  // Fetch transactions
  const fetchTransactions = async () => {
    const res = await axios.get("http://localhost:5000/transactions");
    setTransactions(res.data);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const deleteTransaction = async (id) => {
    await axios.delete(`http://localhost:5000/transactions/${id}`);
    fetchTransactions(); // refresh list
  };

  return (
    <div>
      <h1>Personal Finance Manager</h1>
      <TransactionForm setTransactions={setTransactions} />

      <h2>Transactions</h2>
      <ul>
        {transactions.map((t) => (
          <li key={t.id}>
            {t.type}: £{t.amount} {t.category ? `- ${t.category}` : ""}
            <button onClick={() => deleteTransaction(t.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;