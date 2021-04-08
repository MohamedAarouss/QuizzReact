const {Pool} = require('pg');
const pool = new Pool({
    user: 'postgres', //postgres - cleveland
    host: 'localhost',
    database: 'postgres', //postgres - quiz
    password: 'admin', //admin - Password123$
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
