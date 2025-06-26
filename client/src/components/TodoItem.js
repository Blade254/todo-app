import React from 'react';

function TodoItem({ todo, toggleComplete, deleteTodo }) {
    return (
        <div classname="flex items-center bg-slate-800 p-4 rounded-lg shadow-md transition-all duration-300 hover:bg-slate-700">
            <div 
            className="flex-grow cursor-pointer"
            onClick={() => toggleComplete(todo.id, todo.is_completed)}
            >
                <span className={todo.is_completed ? "line-through text-slate-500": ''}>
                    {todo.task_text}
                </span>
            </div>
            <div className="flex-shrink-0 ml-4 space-x-2">
                {/*tod: add functinality later*/}
                {/* <button className="text-yellow-400 hover:text-yellow-300>Edit</button>" */}
                <button
                    onClick={() => deleteTodo(todo.id)}
                    className="text-red-500 hover:text-red-400 font-bold"
                >
                    Delete
                </button>
            </div>
        </div>
    )
}