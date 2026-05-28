import React, { useState } from "react";
import axios from "axios";

function Login({ setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      const res = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });

      // ✅ Save token
      localStorage.setItem("token", res.data.token);

      // ✅ Update app state
      setToken(res.data.token);

    } catch (err) {
      console.error(err);
      alert("Login failed");
    }
  };

  return (
    <div>
      <h2>Login</h2>

      <input
        onChange={e => setEmail(e.target.value)}
        placeholder="Email"
      />

      <input
        onChange={e => setPassword(e.target.value)}
        placeholder="Password"
        type="password"
      />

      <button onClick={login}>Login</button>
    </div>
  );
}

export default Login;