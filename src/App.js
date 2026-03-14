import { useEffect } from "react";
import axios from "axios";
import TransactionForm from "./TransactionForm"; 

function App() {

  useEffect(() => {
    axios.get("http://localhost:5000")
      .then(res => console.log(res.data));
  }, []);

  return (
    <div>
      <h1>Personal Finance Manager</h1>

      <TransactionForm /> 
      
    </div>
  );
}

export default App;