import { useEffect, useState } from "react";
import axios from "axios";
import TransactionForm from "./TransactionForm";
import Login from "./auth/Login";
import Register from "./auth/Register";


function App() {
  // ✅ ALWAYS at top
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [transactions, setTransactions] = useState([]);
  const [analysis, setAnalysis] = useState(null);

  // ✅ Fetch transactions WITH token
  useEffect(() => {
      const fetchTransactions = async () => {
    try {

      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/transactions",
        {
          headers: {
            Authorization: token,
          },
        }
      );

      setTransactions(res.data);

    } catch (err) {
      console.error(err);
    }
  };
      if (token) {
        fetchTransactions();
      }
    }, [token]);
  useEffect(() => {

  const cleanedTransactions = transactions.map(t => ({
    type: t.type,
    amount: Number(t.amount),
    category: t.category,
  }));

  const fetchAnalysis = async () => {

    try {

      const res = await axios.post(
        "http://localhost:8000/analysis",
        cleanedTransactions
      );

      console.log("PYTHON ANALYSIS:", res.data);

      setAnalysis(res.data);

    } catch (err) {
      console.error(err);
    }
  };

  if (transactions.length > 0) {
    fetchAnalysis();
  }

}, [transactions]);

  // ✅ Delete with token
  const deleteTransaction = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/transactions/${id}`, {
        headers: {
          Authorization: token,
        },
      });

      setTransactions(prev => prev.filter(t => t.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ Calculations


  // ✅ AFTER hooks
 const [isLogin, setIsLogin] = useState(true);

  if (!token) {
    return isLogin ? (
      <Login setToken={setToken} switchToRegister={() => setIsLogin(false)} />
    ) : (
      <Register
        setToken={setToken}
        switchToLogin={() => setIsLogin(true)}
      />
    );
  }

  return (
    
    <div>
      <h1>Personal Finance Manager</h1>

      <button
        onClick={() => {
          localStorage.removeItem("token");
          setToken(null);
        }}
      >
        Logout
      </button>

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

     
      {analysis && (
        <div>
          <h2>Dashboard</h2>
          <h3>Python Financial Analysis</h3>

          <p>💰 Income: £{analysis.income}</p>
          <p>💸 Expenses: £{analysis.expenses}</p>
          <p>📊 Balance: £{analysis.balance}</p>
          
        </div>
      )}

    </div>
    
  );
}

export default App;