const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const socketIO = require('socket.io');
const http = require('http');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/disasterDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, () => {
  console.log("Connected to MongoDB");
});

// Disaster schema and model
const disasterSchema = new mongoose.Schema({
  type: String,
  location: String,
  severity: String,
  description: String,
  status: String,  // e.g. 'Active', 'Resolved'
  timestamp: { type: Date, default: Date.now }
});

const Disaster = mongoose.model('Disaster', disasterSchema);


app.get('/disasters', async (req, res) => {
  try {
    const disasters = await Disaster.find();
    res.json(disasters);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


app.post('/disasters', async (req, res) => {
  const { type, location, severity, description, status } = req.body;
  const disaster = new Disaster({ type, location, severity, description, status });

  try {
    const savedDisaster = await disaster.save();
    io.emit('newDisaster', savedDisaster); 
    res.status(201).json(savedDisaster);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

io.on('connection', (socket) => {
  console.log('A user connected');
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
