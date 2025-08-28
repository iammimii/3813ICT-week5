import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const users = [
  { username: 'Alice', birthdate: '1998-04-02', age: 27, email: 'alice@example.com', password: 'alice123' },
  { username: 'Bob', birthdate: '1996-09-15', age: 29, email: 'bob@example.com', password: 'bob123' },
  { username: 'Charlie', birthdate: '2000-03-21', age: 25, email: 'charlie@example.com', password: 'charlie123' }
];

app.post('/api/auth', (req, res) => {
  const { email, password } = req.body;
  const match = users.find(u => u.email === email && u.password === password);
  if (!match) return res.json({ valid: false });
  const { password: _, ...withoutPassword } = match;
  res.json({ ...withoutPassword, valid: true });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Auth API running at http://localhost:${PORT}`));
