// 



// server.js
const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const mongoose = require("mongoose");
const cors = require("cors");

const User = require("./models/User");

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/cryptocrash", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

app.use("/api/user", require("./routes/user"));

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

let currentMultiplier = 1.0;
let crashed = false;
let interval;
let players = [];

const startGame = () => {
  currentMultiplier = 1.0;
  crashed = false;
  players = [];

  interval = setInterval(() => {
    currentMultiplier = parseFloat((currentMultiplier + 0.05).toFixed(2));
    if (Math.random() < 0.01 || currentMultiplier >= 10.0) {
      crashed = true;
      clearInterval(interval);
      for (let client of wss.clients) {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({ type: "crash", multiplier: currentMultiplier }));
        }
      }
      return;
    }
    for (let client of wss.clients) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ type: "update", multiplier: currentMultiplier }));
      }
    }
  }, 100);
};

setInterval(startGame, 10000); // Start new game every 10 seconds

wss.on("connection", (ws) => {
  ws.on("message", async (message) => {
    const data = JSON.parse(message);
    if (data.type === "bet") {
      players.push({ username: data.username, amount: data.amount, cashOut: false });
    }
    if (data.type === "cashout") {
      const player = players.find(p => p.username === data.username);
      if (player && !player.cashOut && !crashed) {
        player.cashOut = true;
        const winnings = player.amount * currentMultiplier;
        await User.findOneAndUpdate(
          { username: data.username },
          { $inc: { balance: winnings, gamesPlayed: 1, totalWon: winnings } }
        );
        ws.send(JSON.stringify({ type: "cashed_out", winnings }));
      }
    }
  });
});

server.listen(5000, () => console.log("Server running on port 5000"));
