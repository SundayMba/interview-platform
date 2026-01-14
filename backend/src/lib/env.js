import dotenv from 'dotenv';

dotenv.config({ quiet: true }); // Load environment variables from .env file

const ENV = {
  PORT: process.env.PORT,
  DB_URL: process.env.DB_URL,
  NODE_ENV: process.env.NODE_ENV,
  VITE_CLERK_PUBLISHABLE_KEY: process.env.VITE_CLERK_PUBLISHABLE_KEY,
};

export default ENV;
