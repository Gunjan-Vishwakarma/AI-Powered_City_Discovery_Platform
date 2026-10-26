"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const syncController_1 = require("../controllers/syncController");
const router = (0, express_1.Router)();
router.post('/seed', syncController_1.seedDatabase);
router.post('/city', syncController_1.syncCity);
exports.default = router;
