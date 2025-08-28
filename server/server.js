import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const users = [
  { username: 'Bob', birthdate: '2001-01-01', age: 24, email: 'bob@gmail.com', password: 'bob123' },
  { username: 'Reem', birthdate: '2004-05-03', age: 21, email: 'Reem@gmail.com', password: 'Reem456!' },
  { username: 'Admin', birthdate: '1990-12-12', age: 34, email: 'admin@hotmail.com', password: 'ADMIN' }
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
