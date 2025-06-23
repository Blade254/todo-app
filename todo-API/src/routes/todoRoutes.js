const express = require('express');
const router= express.Router();


const {  getAllTodos } = require('../controllers/todosController');

// Define the route to get all todos
router.get('/', getAllTodos);

// Export the router
module.exports = router;