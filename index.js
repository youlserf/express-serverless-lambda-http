import express from 'express'
import cors from 'cors'
import serverless from 'serverless-http';
const app = express();
// Enable cors
app.use(cors());
// Middleware to parse JSON requests
app.use(express.json());

// Sample user data
let users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' }
];

// Route to get all users
app.get('/api/users', (req, res) => {
  res.json(users);
});

// Route to add a new user
app.post('/api/users', (req, res) => {
  const newUser = req.body;
  users.push(newUser);
  res.status(201).json(newUser);
});

// Route to get a specific user by ID
app.get('/api/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find(user => user.id === userId);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});


export const handler = serverless(app);

// Start the server
/* const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
}); */
