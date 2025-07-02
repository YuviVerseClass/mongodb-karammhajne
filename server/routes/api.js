const express = require('express');
const router = express.Router();
const db = require('../controllers/dbController');

// Route wiring
router.get('/tasks', db.getTasks);
router.post('/tasks', db.addTask);
router.patch('/tasks/:id', db.toggleTask);
router.delete('/tasks/:id', db.deleteTask);

// Export the router
module.exports = router;
