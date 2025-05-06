// // routes/user.js
// const express = require("express");
// const router = express.Router();
// const User = require("../models/User");

// router.post("/login", async (req, res) => {
//   const { username } = req.body;
//   if (!username) return res.status(400).json({ error: "Username required" });

//   let user = await User.findOne({ username });
//   if (!user) {
//     user = await User.create({ username });
//   }
//   res.json(user);
// });

// router.get("/:username", async (req, res) => {
//   const { username } = req.params;
//   const user = await User.findOne({ username });
//   if (!user) return res.status(404).json({ error: "User not found" });
//   res.json(user);
// });

// module.exports = router;




// routes/user.js
const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.post("/login", async (req, res) => {
  const { username } = req.body;
  if (!username) return res.status(400).json({ error: "Username required" });

  let user = await User.findOne({ username });
  if (!user) {
    user = await User.create({ username });
  }
  res.json(user);
});

router.get("/:username", async (req, res) => {
  const { username } = req.params;
  const user = await User.findOne({ username });
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json(user);
});

module.exports = router;
