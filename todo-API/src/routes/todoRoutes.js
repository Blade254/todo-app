const express = require('express');
const router= express.Router();


const {  getAllTodos,createTodo } = require('../controllers/todosController');

// Define the route to get all todos
router.get('/', getAllTodos);

//create todo route
router.post('/', createTodo);

// Export the router
module.exports = router;