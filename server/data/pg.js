const {Pool} = require('pg');
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'admin',
    port: 5432
});

pool.on('connect', client => {
    client.query('set search_path to quiz')
});

module.exports = {
    query: (text, params) => {
        return pool.query(text, params)
    }
};
