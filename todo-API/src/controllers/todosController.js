const { pool, poolConnect, mssql } = require('../db/dbConfig');

//get all todods
const getAllTodos = async (req, res) => {
    try {
        await poolConnect;

        //create a request from the pool
        const request = pool.request();

        //executew the query
        const result = await request.query('SELECT * FROM todos ORDER BY created_at DESC');

        //send the result as a response
        res.json(result.recordset);
    } catch (err) {
        console.error('Error fetching todos:', err);
        res.status(500).send('server error');
    }
};

//create todo
const createTodo = async (req, res) => {
    try{
        const { task_text } = req.body;

        //checking if task_text is provided
        if(!task_text) {
            return res.status(400).json({ message: 'Task text cannot be empty' });
        }

        await poolConnect;
        const request = pool.request();

        //parameterized queries to prevent SQL injection
        request.input('taskText', mssql.NVarChar, task_text);

        //insert query
        const result = await request.query(
            'INSERT INTO todos (task_text) OUTPUT INSERTED.* VALUES (@taskText)'
        );

        //send the newly created todo as a response
        res.status(201).json(result.recordset[0]);
    } catch (err) {
        console.error('Error creating todo:', err);
        res.status(500).send('Server error');
    }
} 

//update todo
const updateTodo = async (req, res) => { 
    try {
        const { id } = req.params;
        const { task_text, is_completed } = req.body;

        await poolConnect;
        const request = pool.request();

        //parameteres
        request.input('id', mssql.Int, id);
        request.input('taskText', mssql.NVarChar, task_text);
        request.input('isCompleted', mssql.Bit, is_completed);

        //update query
        const result = await request.query(
            'UPDATE todos SET task_text = @taskText, is_completed = @isCompleted OUTPUT INSERTED.* WHERE id = @id'
        );

        //check if todo was updated
        if (result.recordset.length === 0) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        
        //send the updated todo as a response
        res.json(result.recordset[0]);  

    } catch (err) {
        console.error('Error updating todo:', err);
        res.status(500).send('Server error');
    }
};

//delete todo
const deleteTodo = async (req, res) => {
    try { 
        const { id } = req.params;

        await poolConnect;
        const request = pool.request();
        request.input('id', mssql.Int, id);

        //delete query
        const result = await request.query('DELETE FROM todos WHERE id = @id');

        //check if todo was deleted
        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        //send success response
        res.status(201).json({ message: 'Todo deleted successfully' });
    } catch (err) {
        console.error('Error deleteing todo:', err);
        res.status(500).send('Server error');
    }
}
module.exports ={
    getAllTodos,
    createTodo,
    updateTodo,
    deleteTodo
};