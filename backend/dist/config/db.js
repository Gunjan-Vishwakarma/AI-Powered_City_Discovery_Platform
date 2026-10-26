"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDBStatus = exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
let isConnected = false;
const connectDB = async () => {
    if (isConnected) {
        return true;
    }
    const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/city_discovery_india';
    try {
        // 3 second server selection timeout so it doesn't hang if Mongo isn't running locally
        const conn = await mongoose_1.default.connect(uri, {
            serverSelectionTimeoutMS: 3000,
        });
        isConnected = conn.connection.readyState === 1;
        console.log(`[Database] MongoDB Connected successfully to: ${conn.connection.host}/${conn.connection.name}`);
        return true;
    }
    catch (error) {
        console.warn(`[Database] MongoDB connection failed (${error.message || 'connection error'}).`);
        console.log('[Database] Operating in memory-backed hybrid mode with curated Pan-India dataset.');
        isConnected = false;
        return false;
    }
};
exports.connectDB = connectDB;
const getDBStatus = () => ({
    isConnected,
    readyState: mongoose_1.default.connection.readyState,
    host: mongoose_1.default.connection.host || null,
    name: mongoose_1.default.connection.name || null,
});
exports.getDBStatus = getDBStatus;
