"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app_1 = require("./app");
const db_1 = require("./config/db");
const PORT = process.env.PORT || 5000;
async function startServer() {
    // Attempt MongoDB connection (non-blocking fallback to in-memory curated data)
    await (0, db_1.connectDB)();
    const app = (0, app_1.createApp)();
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
