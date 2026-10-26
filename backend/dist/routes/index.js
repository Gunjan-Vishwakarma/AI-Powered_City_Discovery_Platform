"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cityRoutes_1 = __importDefault(require("./cityRoutes"));
const bookmarkRoutes_1 = __importDefault(require("./bookmarkRoutes"));
const syncRoutes_1 = __importDefault(require("./syncRoutes"));
const db_1 = require("../config/db");
const router = (0, express_1.Router)();
// Health check endpoint
router.get('/health', (_req, res) => {
    const dbStatus = (0, db_1.getDBStatus)();
    res.json({
        status: 'online',
        timestamp: new Date().toISOString(),
        service: 'AI-Powered Indian City Discovery Platform API',
        version: '1.0.0',
        database: {
            status: dbStatus.isConnected ? 'connected' : 'offline_fallback_active',
            ...dbStatus,
        },
        scope: 'India Cities Exclusively (18+ Cities across all regions)',
    });
});
// Mount modular sub-routers
router.use('/cities', cityRoutes_1.default);
router.use('/bookmarks', bookmarkRoutes_1.default);
router.use('/sync', syncRoutes_1.default);
exports.default = router;
