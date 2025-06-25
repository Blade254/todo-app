const express = require('express');
const router= express.Router();


const {  getAllTodos, createTodo, updateTodo, deleteTodo } = require('../controllers/todosController');

// Define the route to get all todos
router.get('/', getAllTodos);

//create todo route
router.post('/', createTodo);

//update todo route
router.put('/:id', updateTodo);

router.delete('/:id', deleteTodo)

// Export the router
module.exports = router;