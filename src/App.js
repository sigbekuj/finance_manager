import { useEffect, useState } from "react";
import axios from "axios";
import TransactionForm from "./TransactionForm";

function App() {
  const [transactions, setTransactions] = useState([]);

  // Fetch transactions from backend
  useEffect(() => {
    axios.get("http://localhost:5000/transactions")
      .then(res => setTransactions(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1>Personal Finance Manager</h1>
      <TransactionForm setTransactions={setTransactions} />
      
      <h2>Transactions</h2>
      <ul>
        {transactions.map((t, index) => (
          <li key={index}>
            {t.type}: £{t.amount} {t.category ? `- ${t.category}` : ""}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;