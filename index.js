const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Verbinden met MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Verbonden met MongoDB'))
.catch((err) => console.error('❌ MongoDB fout:', err));

// Log schema/model
const Log = mongoose.model('Log', {
  title: String,
  description: String,
  createdAt: { type: Date, default: Date.now }
});

// ✅ GET: alle logs ophalen
app.get('/logs', async (req, res) => {
  const logs = await Log.find().sort({ createdAt: -1 });
  res.json(logs);
});

// ✅ POST: nieuwe log toevoegen
app.post('/logs', async (req, res) => {
  const { title, description } = req.body;
  if (!title || !description) {
    return res.status(400).json({ message: 'Title en description zijn verplicht' });
  }

  const log = new Log({ title, description });
  await log.save();
  res.status(201).json(log);
});

// Test route
app.get('/', (req, res) => {
  res.send('🚀 API draait');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server draait op poort ${PORT}`));

});


