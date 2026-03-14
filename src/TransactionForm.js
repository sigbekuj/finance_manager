import { useState } from "react";
import axios from "axios";

function TransactionForm({ setTransactions }) {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("expense"); // default

  const submit = async () => {
    const newTransaction = { amount, type, category };
    await axios.post("http://localhost:5000/transactions", newTransaction);

    // Update transactions in App.js
    setTransactions(prev => [...prev, newTransaction]);

    // Clear form
    setAmount("");
    setCategory("");
  };

  return (
    <div>
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <input
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="expense">Expense</option>
        <option value="income">Income</option>
      </select>

      <button onClick={submit}>Add Transaction</button>
    </div>
  );
}

export default TransactionForm;