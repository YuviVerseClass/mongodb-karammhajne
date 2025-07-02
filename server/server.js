require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const apiRoutes = require('./routes/api');

const app = express();

app.use(cors({
  origin: 'http://127.0.0.1:5500', 
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json()); 


app.use((req, res, next) => {
  console.log(`📥 ${req.method} ${req.url}`);
  next();
});


app.use('/api', apiRoutes);


mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");
    console.log("Using database:", mongoose.connection.name);
  })
  .catch(err => console.error("MongoDB connection error:", err));


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on port", PORT));
