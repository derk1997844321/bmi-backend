const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

let logs = []; // Tijdelijke opslag in geheugen

// GET - Haal alle logs op
app.get('/logs', (req, res) => {
  res.json(logs);
});

// POST - Voeg een nieuwe log toe
app.post('/logs', (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({ message: 'Title and description required.' });
  }

  const log = {
    id: logs.length + 1,
    title,
    description,
    date: new Date().toISOString()
  };

  logs.push(log);
  res.status(201).json(log);
});

// Root test
app.get('/', (req, res) => {
  res.send('🚀 BMI Logboek backend is live!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

