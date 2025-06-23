require('dotenv').config();
const mssql = require('mssql');

const sqlConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
    options: { 
        trustServerCertificate: true, 
    }
};

const pool = new mssql.ConnectionPool(sqlConfig);
const poolConnect = pool.connect();

poolConnect.catch(err => {
    console.error('Database connection failed! BAD CONFIG: ',err);
});

module.exports = {
    mssql,
    pool,
    poolConnect
};
