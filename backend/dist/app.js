"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const routes_1 = __importDefault(require("./routes"));
const createApp = () => {
    const app = (0, express_1.default)();
    // Middleware
    const clientUrl = process.env.CLIENT_URL || 'http://localhost:3000';
    app.use((0, cors_1.default)({
        origin: [clientUrl, 'http://localhost:3000', 'http://127.0.0.1:3000'],
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    }));
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    if (process.env.NODE_ENV !== 'test') {
        app.use((0, morgan_1.default)('dev'));
    }
    // Root Welcome & Sitemap
    app.get('/', (_req, res) => {
        res.json({
            name: 'AI-Powered Indian City Discovery Platform API',
            version: '1.0.0',
            description: 'Comprehensive Discovery API for Indian Cities: Food, Culture, Language, Places, Festivals & News',
            scope: 'India Only',
            health: '/api/v1/health',
            documentation: {
                cities: '/api/v1/cities',
                cityBySlug: '/api/v1/cities/:slug',
                cityFood: '/api/v1/cities/:slug/food',
                cityCulture: '/api/v1/cities/:slug/culture',
                cityLanguage: '/api/v1/cities/:slug/language',
                cityPlaces: '/api/v1/cities/:slug/places',
                cityFestivals: '/api/v1/cities/:slug/festivals',
                cityNews: '/api/v1/cities/:slug/news',
                cityFeed: '/api/v1/cities/:slug/feed',
                nearby: '/api/v1/cities/nearby?lat=19.07&lng=72.87&radiusKm=50',
                universalSearch: '/api/v1/cities/universal-search?q=biryani',
                bookmarks: '/api/v1/bookmarks',
                seedDatabase: 'POST /api/v1/sync/seed',
            },
        });
    });
    // Mount API v1
    app.use('/api/v1', routes_1.default);
    // 404 Handler
    app.use((req, res) => {
        res.status(404).json({
            success: false,
            error: `Endpoint not found: ${req.method} ${req.originalUrl}`,
            suggestion: 'Visit / for full API sitemap and endpoints list.',
        });
    });
    // Global Error Handler
    app.use((err, _req, res, _next) => {
        console.error('[API Error]:', err);
        res.status(err.status || 500).json({
            success: false,
            error: err.message || 'Internal Server Error',
        });
    });
    return app;
};
exports.createApp = createApp;
