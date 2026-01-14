import express from 'express';
import ENV from './lib/env.js';
import path from 'path';
import { connectDB } from './lib/db.js';

const __dirname = path.resolve(); // Get the current directory name

const app = express(); // Create an Express applicatio server instance

app.get('/health', (req, res) => {
  res.status(200).json({ msg: 'Server is running successfully' });
});

if (ENV.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist'))); // Serve static files from the frontend build directory

  app.get('/*any', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'dist', 'index.html')); // Serve the main HTML file for any other routes
  });
}

const startServer = async () => {
  try {
    await connectDB();
    app.listen(ENV.PORT, () => {
      console.log(`Server is running on port ${ENV.PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
  }
};

startServer();
