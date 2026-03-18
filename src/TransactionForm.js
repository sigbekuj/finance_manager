import { useState } from "react";
import axios from "axios";

function TransactionForm({ setTransactions }) {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("expense");

  const submit = async () => {
    await axios.post("http://localhost:5000/transactions", { amount, type, category });
    // Fetch updated list
    const res = await axios.get("http://localhost:5000/transactions");
    setTransactions(res.data);

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