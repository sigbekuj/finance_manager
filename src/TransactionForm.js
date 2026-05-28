import { useState } from "react";
import axios from "axios";

function TransactionForm({ setTransactions }) {
  const [month, setMonth] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("expense");

const submit = async () => {
  try {
    const token = localStorage.getItem("token");

    // ✅ POST with token
    await axios.post(
      "http://localhost:5000/transactions",
      { month, amount, type, category },
      {
        headers: {
          Authorization: token,
        },
      }
    );

    // ✅ GET with token
    const res = await axios.get(
      "http://localhost:5000/transactions",
      {
        headers: {
          Authorization: token,
        },
      }
    );

    setTransactions(res.data);

    setMonth("");
    setAmount("");
    setCategory("");
  
  } catch (err) {
    console.error(err);
    alert("Error adding transaction");
  }
};

  return (
    <div>
       <input
        type="date"
        placeholder="Month"
        value={month}
        onChange={(e) => setMonth(e.target.value)}
      />
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