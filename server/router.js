const express = require("express");
const router = express.Router();
const db = require('./data/pg');

module.exports = router;

router
    .get("/", (req, res) => {
        res.json("Bienvenue sur le projet WEKA 2021 du groupe Les Crackheads De Lens !");
    });

router
    .get('/quiz',
        async (req, res) => {
            const result = await db.query('select * from quiz');
            console.log(result.rows);
            res.json(result.rows);
        })

    .get('/quiz/:id',
        async (req, res) => {
            const result = await db.query('select * from quiz where quiz_id =$1', [req.params.id]);
            const question = await db.query('select ques_id from question where quiz_id =$1',[req.params.id]);
            console.log([result.rows, question.rows]);
            res.json([result.rows, question.rows]);
        })

    .get('/quiz/:id/:ques_id',
        async (req, res) => {
            const result = await db.query('select * from question where quiz_id =$1 and ques_id=$2', [req.params.id, req.params.ques_id]);
            const proposition = await db.query('select * from proposition where ques_id =$1', [req.params.ques_id]);
            console.log([result.rows, proposition.rows]);
            res.json([result.rows, proposition.rows]);
        })
    .post("/new",
        async (req, res) => {
            await db.query('insert into quiz(quiz_name) values("Quiz 3")')
            console.log('création new quiz')
        });


router
    .use((req, res) => {
        res.status(404);
        res.json({
            error: "Page not found"
        });
    });

