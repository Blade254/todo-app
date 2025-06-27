import React, { useState } from 'react';


function AddTodoForm({addTodo}) {
    const [taskText, setTaskText] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!taskText.trim()) return; // Prevent adding empty todos

        addTodo(taskText);
        setTaskText(''); // Clear input field after submission
    };

    return (
        <form onSubmit={handleSubmit} class="md-8">
            <div className="flex">
                <input
                    type="text"
                    value={taskText}
                    onChange={(e) => setTaskText(e.target.value)}
                    placeholder="Add a new task..."
                    className="flex-grow p-3 rounded-l-lg bg-slate-800 border-2 border-slate-700 focus:outline-none focus:border-sky-500"
                />
                <button
                    type="submit"
                    className="bg-sky-500 text-white font-bold p-3 rounded-r-lg hover:bg-sky-600 transition-colors duration-200"
                    >
                        Add
                </button>
            </div>
        </form>
    )
}

export default AddTodoForm;