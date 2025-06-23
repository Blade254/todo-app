const express = require('express');
const { poolConnect } = require('./db/dbConfig');
const cors = require('cors')

//import routes
const todoRoutes = require('./routes/todoRoutes');

const app = express();
const port = 5000;

// Middleware 
app.use(cors());
app.use(express.json());

// Sample route
const startServer = () => {
  app.use('/api/todos', todoRoutes);
  app.get('/', (req, res) => {
    res.send('To-Do App API is running!');  
  });

  // Start the server
  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
};


poolConnect
  .then(() => {
    console.log('---Database connection successful.---');
    startServer();
  })
  .catch(err => {
    console.log('--Database connection failed server will nor run--', err);
    process.exit(1);
  });