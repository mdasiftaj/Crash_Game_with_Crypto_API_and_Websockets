// authController.js
const users = [];

exports.login = (req, res) => {
  const { username } = req.body;
  if (!username) return res.status(400).json({ error: 'Username is required' });

  let user = users.find(u => u.username === username);
  if (!user) {
    user = { username, balance: 1000 };
    users.push(user);
  }

  res.json(user);
};
