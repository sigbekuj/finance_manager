import { useState } from "react";
import axios from "axios";

function TransactionForm() {

  const [amount, setAmount] = useState("");

  const submit = async () => {
    await axios.post("http://localhost:5000/transactions", {
      amount: amount,
      type: "expense"
    });
  };

  return (
    <div>
      <input
        placeholder="Amount"
        onChange={(e) => setAmount(e.target.value)}
      />

      <button onClick={submit}>
        Add Transaction
      </button>
    </div>
  );
}

export default TransactionForm;