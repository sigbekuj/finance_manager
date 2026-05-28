import { useState } from "react";
import axios from "axios";

function Register({ switchToLogin, setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = async () => {
    try {
      // 🔹 Create user
      await axios.post("http://localhost:5000/register", {
        email,
        password,
      });

      // 🔹 Auto login after register (optional but nice UX)
      const res = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      setToken(res.data.token);

    } catch (err) {
      console.error(err);
      alert("Registration failed (email may already exist)");
    }
  };

  return (
    <div style={styles.container}>
      <h2>Create Account</h2>

      <input
        style={styles.input}
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        style={styles.input}
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button style={styles.button} onClick={register}>
        Sign Up
      </button>

      <p>
        Already have an account?{" "}
        <span style={styles.link} onClick={switchToLogin}>
          Login
        </span>
      </p>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "300px",
    margin: "100px auto",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    textAlign: "center",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
  },
  button: {
    padding: "10px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
  link: {
    color: "blue",
    cursor: "pointer",
  },
};

export default Register;