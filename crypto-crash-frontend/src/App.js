// src/App.js
import React, { useState } from "react";
import Login from "./components/Login";
import Game from "./components/Game";

const App = () => {
  const [username, setUsername] = useState(null);

  return <div>{username ? <Game username={username} /> : <Login onLogin={setUsername} />}</div>;
};

export default App;
