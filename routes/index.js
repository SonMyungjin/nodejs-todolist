const express = require("express");
const app = express();
const router = express.Router();

// Todo Router
const TodoRouter = require('./todo');

// Refactoring
router.use('/api/todos', TodoRouter);

module.exports = router;