const express = require("express");
const router = express.Router();
const db = require('./data/pg');
const axios = require('axios');
const {redirectTo} = require("@reach/router");

module.exports = router;

router
    .get("/", (req, res) => {
        res.json("Bienvenue sur le projet WEKA 2021 du groupe Les Crackheads De Lens !");
    });


// ---------------------------------- QUIZ ----------------------------------
router

    // POST NEW QUIZZ
    .get("/new_quiz/:quiz_name", async (req, res) => {
        try {
            await db.query("insert into quiz(quiz_name) values($1)", [req.params.quiz_name]);
            return res.redirect('http://localhost:3000/quiz');
        } catch (err) {
            console.error(err);
            res.sendStatus(500);
        }
    })

    // LIST ALL QUIZ
    .get('/quiz',
        async (req, res) => {
            const result = await db.query('select * from quiz');
            console.log(result.rows);
            res.json(result.rows);
        })

    // SHOW ONE QUIZ
    .get('/quiz/:id',
        async (req, res) => {
            const question = await db.query('select * from quiz where quiz_id =$1',[req.params.id]);
            console.log(question.rows);
            res.json(question.rows);
        })


    .get('/quiz/:id/questions',
        async (req, res) => {
            const question = await db.query('select * from question where quiz_id =$1',[req.params.id]);
            console.log(question.rows);
            res.json(question.rows);
        })

    .get('/quiz/:ques_id/propositions',
        async (req, res) => {
            const question = await db.query('select * from proposition where ques_id =$1',[req.params.ques_id]);
            console.log(question.rows);
            res.json(question.rows);
        })

    // DELETE ONE QUIZ
    .get('/delete_quiz/:id',
        async (req, res) => {
            try {
                await db.query('DELETE FROM quiz WHERE quiz_id = $1', [req.params.id]);
                console.log('delete');
                redirectTo('/');
            } catch (err) {
                console.error(err);
                res.sendStatus(500);
            }
        })
;

router
    .use((req, res) => {
        res.status(404);
        res.json({
            error: "Page not found"
        });
    });

