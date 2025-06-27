import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css';

import AddTodoForm from './components/AddTodoForm';
import TodoList from './components/TodoList';

//define backend API URL
const API_URL = 'http://localhost:5000/api/todos';

function App() {

  const [todos, setTodos] = useState([]);

  useEffect(() => {
    // Fetch todos from the backend API
    const fetchTodos = async () => {
      try {
        const response = await axios.get(API_URL);
        setTodos(response.data);
      }catch (error) { 
        console.error("Error fetching todos:", error);
      }
    };

    fetchTodos();
  }, []);

  // add a new todo
  const addTodo = async (taskText) => {
    try{
      // Post new todo to the backend API
      const response = await axios.post(API_URL, { task_text: taskText });

      // Update the state with the new todo
      setTodos([...todos, response.data]);
    } catch (err) {
      console.error("Error adding todo:", err);
    }
  };

  // toggle todo completion status
/**
 * Toggles the completion status of a todo item by making an API PUT request.
 * This function finds the todo to update, flips its completion status, and updates the state.
 * 
 * @param {number} id - The unique identifier of the todo item to toggle.
 * @param {boolean} currentStatus - The current completion status of the todo item.
 * @returns {Promise<void>} - Resolves when the operation is complete, or logs an error if it fails.
 */
const toggleComplete = async (id, currentStatus) => {
    try {
        // Find the todo item in the state array that matches the given ID
        const todoToUpdate = todos.find(todo => todo.id === id);

        // Make a PUT request to update the todo's completion status
        // Original Error: The URL syntax used '$(id)' instead of '${id}', causing invalid API endpoints
        // Fix: Corrected the template literal syntax to '${id}' for proper URL construction
        const response = await axios.put(`${API_URL}/${id}`, {
            is_completed: !currentStatus, // Flip the completion status (true -> false, false -> true)
            task_text: todoToUpdate.task_text // Preserve the existing task text
        });

        // Update the todos state by mapping over the array and replacing the updated todo
        setTodos(todos.map(todo => (todo.id === id ? response.data : todo)));
    } catch (err) {
        // Log any errors that occur during the API request or state update
        console.error("Error toggling todo completion:", err);
    }
};

/**
 * Deletes a todo item by making an API DELETE request and updates the state accordingly.
 * 
 * @param {number} id - The unique identifier of the todo item to delete.
 * @returns {Promise<void>} - Resolves when the operation is complete, or logs an error if it fails.
 */
const deleteTodo = async (id) => {
    try {
        // Make a DELETE request to remove the todo item from the backend
        // Original Error: The URL syntax used '$(id)' instead of '${id}', causing invalid API endpoints
        // Fix: Corrected the template literal syntax to '${id}' for proper URL construction
        await axios.delete(`${API_URL}/${id}`);

        // Update the todos state by filtering out the deleted todo
        // Original Error: The filter condition 'todo.id' was incomplete and incorrect,
        //                 resulting in all todos being filtered out instead of the specific one
        // Fix: Changed to 'todo.id !== id' to correctly remove only the todo with the matching ID
        setTodos(todos.filter(todo => todo.id !== id));
    } catch (err) {
        // Log any errors that occur during the API request or state update
        console.error("Error deleting todo:", err);
    }
};

// App.js
return (
    <div className="container mx-auto max-w-2xl mt-12 bg-purple-900 min-h-screen p-4">
      <header className="text-center mb-8">
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-300">
          MY TODO LIST
        </h1>
      </header>
      <main>
        <AddTodoForm addTodo={addTodo} />
        <TodoList 
          todos={todos}
          toggleComplete={toggleComplete}
          deleteTodo={deleteTodo}
        /> 
      </main>
    </div>
    
);
}

export default App;
