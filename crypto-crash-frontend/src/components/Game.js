// import React, { useEffect, useState } from "react";
// import io from "socket.io-client";

// const socket = io("http://localhost:5000");

// const Game = () => {
//   const [multiplier, setMultiplier] = useState(1.0);
//   const [crashed, setCrashed] = useState(false);
//   const [betPlaced, setBetPlaced] = useState(false);
//   const [cashedOut, setCashedOut] = useState(false);
//   const [profit, setProfit] = useState(0);

//   useEffect(() => {
//     socket.on("crash_update", (data) => {
//       setMultiplier(data.multiplier);
//       setCrashed(data.crashed);

//       if (data.crashed && betPlaced && !cashedOut) {
//         setProfit(0); // lost
//         setBetPlaced(false);
//       }
//     });

//     return () => socket.off("crash_update");
//   }, [betPlaced, cashedOut]);

//   const placeBet = () => {
//     setBetPlaced(true);
//     setCashedOut(false);
//     setProfit(0);
//   };

//   const cashOut = () => {
//     if (!crashed) {
//       const winnings = 100 * multiplier;
//       setProfit(winnings);
//       setCashedOut(true);
//       setBetPlaced(false);
//     }
//   };

//   return (
//     <div style={{ textAlign: "center", marginTop: "2rem" }}>
//       <h2>Multiplier: {multiplier.toFixed(2)}x</h2>
//       {crashed && <p style={{ color: "red" }}>💥 Crashed!</p>}

//       {!betPlaced ? (
//         <button onClick={placeBet}>Place Bet</button>
//       ) : (
//         <button onClick={cashOut} disabled={cashedOut || crashed}>
//           Cash Out
//         </button>
//       )}

//       {cashedOut && <p style={{ color: "green" }}>You won: ${profit.toFixed(2)}</p>}
//       {!cashedOut && crashed && betPlaced && <p>You lost. Try again!</p>}
//     </div>
//   );
// };

// export default Game;





// src/components/Game.js
import React, { useEffect, useRef, useState } from "react";

const Game = ({ username }) => {
  const [multiplier, setMultiplier] = useState(1.0);
  const [crashed, setCrashed] = useState(false);
  const [bet, setBet] = useState(0);
  const [placed, setPlaced] = useState(false);
  const [winnings, setWinnings] = useState(null);

  const ws = useRef(null);

  useEffect(() => {
    ws.current = new WebSocket("ws://localhost:5000");
    ws.current.onmessage = (msg) => {
      const data = JSON.parse(msg.data);
      if (data.type === "update") {
        setMultiplier(data.multiplier);
      } else if (data.type === "crash") {
        setCrashed(true);
        setPlaced(false);
      } else if (data.type === "cashed_out") {
        setWinnings(data.winnings);
        setPlaced(false);
      }
    };
  }, []);

  const placeBet = () => {
    setWinnings(null);
    ws.current.send(JSON.stringify({ type: "bet", username, amount: parseFloat(bet) }));
    setPlaced(true);
    setCrashed(false);
  };

  const cashOut = () => {
    ws.current.send(JSON.stringify({ type: "cashout", username }));
  };

  return (
    <div>
      <h2>Multiplier: {multiplier}x</h2>
      {crashed && <h3 style={{ color: "red" }}>Crashed!</h3>}
      {!placed ? (
        <div>
          <input
            type="number"
            placeholder="Enter Bet"
            value={bet}
            onChange={(e) => setBet(e.target.value)}
          />
          <button onClick={placeBet}>Place Bet</button>
        </div>
      ) : (
        <button onClick={cashOut}>Cash Out</button>
      )}
      {winnings && <p>You won: {winnings.toFixed(2)}</p>}
    </div>
  );
};

export default Game;
