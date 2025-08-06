const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// App starten
const app = express();
app.use(express.json());
app.use(cors());

// MongoDB verbinden (vervang dit met jouw eigen MongoDB URL als nodig)
mongoose.connect('mongodb+srv://<jouw-gebruiker>:<wachtwoord>@<cluster>.mongodb.net/bmi?retryWrites=true&w=majority')
  .then(() => console.log('✅ Verbonden met MongoDB'))
  .catch((err) => console.error('❌ MongoDB fout:', err));

// Mongoose model voor logs
const Log = mongoose.model('Log', {
  title: String,
  description: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// GET: alle logs ophalen
app.get('/logs', async (req, res) => {
  try {
    const logs = await Log.find().sort({ createdAt: -1 });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: 'Serverfout' });
  }
});

// POST: nieuwe log toevoegen
app.post('/logs', async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      return res.status(400).json({ message: 'Titel en beschrijving zijn verplicht' });
    }

    const newLog = new Log({ title, description });
    await newLog.save();
    res.status(201).json(newLog);
  } catch (err) {
    res.status(500).json({ message: 'Serverfout' });
  }
});

// Server starten
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server draait op poort ${PORT}`);
});


