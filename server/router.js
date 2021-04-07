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

    // NEW QUIZ
    .get("/new_quiz/:quiz_name", async (req, res) => {
        try {
            await db.query("insert into quiz(quiz_name) values($1)", [req.params.quiz_name]);
            return res.redirect('http://localhost:3000/quiz');
        } catch (err) {
            console.error(err);
            res.sendStatus(500);
        }
    })

    // EDIT QUIZ
    .get("/edit_quiz/:quiz_id/:quiz_name", async (req, res) => {
        try {
            await db.query("UPDATE quiz SET quiz_name = $2 WHERE quiz_id = $1", [req.params.quiz_id, req.params.quiz_name]);
            return res.redirect('http://localhost:3000/quiz');
        } catch (err) {
            console.error(err);
            res.sendStatus(500);
        }
    })

    // DELETE QUIZ
    .get('/delete_quiz/:quiz_id',
        async (req, res) => {
            try {
                await db.query('DELETE FROM quiz WHERE quiz_id = $1', [req.params.quiz_id]);
                console.log('delete');
                return res.redirect('http://localhost:3000/quiz');
            } catch (err) {
                console.error(err);
                res.sendStatus(500);
            }
        })

    // LIST ALL QUIZ
    .get('/quiz',
        async (req, res) => {
            try {
                const result = await db.query('select * from quiz');
                console.log(result.rows);
                res.json(result.rows);
            } catch (err) {
                console.error(err);
                res.sendStatus(500);
            }
        })

    // SHOW ONE QUIZ
    .get('/quiz/:id',
        async (req, res) => {
            try {
                const result = await db.query('select * from quiz where quiz_id =$1', [req.params.id]);
                console.log(result.rows);
                res.json(result.rows);
            } catch (err) {
                console.error(err);
                res.sendStatus(500);
            }
        })

    // GET ALL QUESTIONS FROM ONE QUIZ
    .get('/quiz/:id/questions',
        async (req, res) => {
            try {
                const question = await db.query('select * from question where quiz_id =$1', [req.params.id]);
                console.log(question.rows);
                res.json(question.rows);
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

