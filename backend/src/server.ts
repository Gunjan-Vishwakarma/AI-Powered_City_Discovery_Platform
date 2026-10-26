import dotenv from 'dotenv';
dotenv.config();

import { createApp } from './app';
import { connectDB } from './config/db';

const PORT = process.env.PORT || 5000;

async function startServer() {
  // Attempt MongoDB connection (non-blocking fallback to in-memory curated data)
  await connectDB();

  const app = createApp();

  app.listen(PORT, () => {
    console.log(`=======================================================`);
    console.log(`  🇮🇳 AI-Powered Indian City Discovery Platform API`);
    console.log(`  🚀 Server listening at: http://localhost:${PORT}`);
    console.log(`  🩺 Health check at:    http://localhost:${PORT}/api/v1/health`);
    console.log(`  🌆 Cities directory:   http://localhost:${PORT}/api/v1/cities`);
    console.log(`=======================================================`);
  });
}

startServer().catch((err) => {
  console.error('Fatal server startup error:', err);
  process.exit(1);
});
