const express = require('express');
const dotenv = require('dotenv');
const assetRoutes = require('./routes/assetRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use('/uploads', express.static('uploads')); // Serve uploaded files

// Routes
app.use('/api/assets', assetRoutes);

// Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});