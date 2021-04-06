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

const express = require("express");
const router = express.Router();
const db = require('./data/pg');

module.exports = router;

router
    .get('/quiz',
        async (req, res) => {
            const result = await db.query('select * from quiz');
            res.json(result.rows);
        })

    .get('/quiz/:id',
        async (req, res) => {
            const result = await db.query('select * from quiz where quiz_id =$1', [req.params.id]);
            res.json(result.rows);
        })
