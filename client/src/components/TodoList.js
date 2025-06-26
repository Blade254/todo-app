import React from 'react';
import TodoItem from './TodoItem';

function Todolist({ todos, toggleComplete, deleteTodo }) {
    if(todos.length === 0) {
        return (<p className="text-center text-slate-500">No tasks yet. Add one above!</p>)
    }

    return (
        <div className="space-y-4">
            {todos.map(todo => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    toggleComplete={toggleComplete}
                    deleteTodo={deleteTodo}
                />
            ))}
        </div>
    );
}