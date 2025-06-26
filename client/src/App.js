import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

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

  return (
    <div className="container mx-auto max-2-2xl mt-12">
      <header className="text-center mb-8">
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-300">
          MY TODO LIST
        </h1>
      </header>
      <main>
        {/*to add form and list component*/}
        {/*displaying raw data for now*/}
        <div className="space-y-4">
          {todos.map(todo => (
            <div key={todo.id} className="bg-slate-800 p-4 rounded-lg shadow-md">
              {todo.task_text}
            </div>
          ))}
        </div>

      </main>

    </div>
  );
}

export default App;
