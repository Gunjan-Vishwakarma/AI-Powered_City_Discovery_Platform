"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bookmarkController_1 = require("../controllers/bookmarkController");
const router = (0, express_1.Router)();
router.get('/', bookmarkController_1.getBookmarks);
router.post('/', bookmarkController_1.createBookmark);
router.delete('/:id', bookmarkController_1.deleteBookmark);
exports.default = router;
