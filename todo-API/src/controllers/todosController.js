const { pool, poolConnect } = require('../db/dbConfig');

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

module.exports ={
    getAllTodos,
};