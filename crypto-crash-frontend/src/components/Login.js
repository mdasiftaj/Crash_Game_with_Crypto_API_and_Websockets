// src/components/Login.js
import React, { useState } from "react";
import axios from "axios";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");

  const handleLogin = async () => {
    const res = await axios.post("http://localhost:5000/api/user/login", { username });
    onLogin(res.data.username);
  };

  return (
    <div>
      <h2>Enter Username to Login</h2>
      <input value={username} onChange={(e) => setUsername(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
