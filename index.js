const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('✅ Verbonden met MongoDB'))
  .catch((err) => console.error('❌ MongoDB fout:', err));

const LogSchema = new mongoose.Schema({
  locatie: String,
  type: String,
  beschrijving: String,
  status: String,
  datum: { type: Date, default: Date.now }
});

const Log = mongoose.model('Log', LogSchema);

app.get('/', (req, res) => res.send('API draait'));
app.get('/logs', async (req, res) => res.json(await Log.find().sort({ datum: -1 })));
app.post('/logs', async (req, res) => {
  const nieuwLog = new Log(req.body);
  await nieuwLog.save();
  res.status(201).json(nieuwLog);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server draait op poort ${PORT}`));
