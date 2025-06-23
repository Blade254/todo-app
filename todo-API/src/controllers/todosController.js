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

module.exports ={
    getAllTodos,
    createTodo
};