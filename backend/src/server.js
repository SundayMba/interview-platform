import express from 'express';
import ENV from './lib/env.js';

const app = express(); // Create an Express applicatio server instance

app.get('/health', (req, res) => {
  res.status(200).json({ msg: 'Server is running successfully' });
});

console.log('Environment Variables:', ENV); // Log the loaded environment variables for verification
app.listen(ENV.PORT, () => {
  console.log(`Server is running on port ${ENV.PORT}`);
}); // Start the server and listen on the specified port
