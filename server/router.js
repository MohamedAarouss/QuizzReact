const express = require("express");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const auth = require("./auth.js")();
const cfg = require("./config.js");
const pool = require('./data/pg');
const saltRounds = 10;
const router = express.Router();
module.exports = router;
const db = require('./data/pg');
const axios = require('axios');
const {redirectTo} = require("@reach/router");

module.exports = router;

router
    .use(auth.initialize())

router
    .post("/signup", async (req, res) => {
        try {
            console.log("test ", req.body);
            bcrypt.hash(req.body.util_password, saltRounds, async (err, hash) => {
                console.log("blabla = ", hash);
                const result = await db.query('insert into utilisateur(util_name,util_password) values ($1,$2) returning util_id', [req.body.util_name, hash]);
                return res.sendStatus(201);
            });
        } catch (err) {
            console.error("ERROR SIGNUP:", err);
            res.sendStatus(401);
        }
    })

router
    .post("/token", async (req, res) => {
        try {
            console.log("test ", req.body);
            const result = await db.query('select util_id, util_password from utilisateur where util_name=$1', [req.body.util_name]);
            const match = await bcrypt.compare(req.body.util_password, result.rows[0].util_password);
            if (match) {
                const token = jwt.sign({id: result.rows[0].util_id,}, cfg.jwtSecret, {expiresIn: '1h'});
                return res.json({token: token});
            }
            res.sendStatus(200);
        } catch (err) {
            console.error("ERROR TOKEN:", err);
            res.sendStatus(401);
        }
    })

// router
//     .get('/items', async (req, res) => {
//         try {
//             const result = await db.query('select * from item');
//             res.json(result.rows);
//         } catch (err) {
//             console.error(err);
//             res.sendStatus(500);
//         }
//     })


router
    .get("/hello", auth.authenticate(), (req, res) => {
        res.json("Hello world !!!!");
    })


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
                const questions = await db.query('select * from question where question.quiz_id =$1', [req.params.quiz_id]);
                for (const q of questions.rows) {
                    await db.query('DELETE FROM proposition where proposition.ques_id = $1', [q.ques_id]);
                }
                await db.query('DELETE FROM question where question.quiz_id = $1', [req.params.quiz_id]);
                await db.query('DELETE FROM quiz WHERE quiz_id = $1', [req.params.quiz_id]);

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
                // console.log(result.rows);
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
    .get('/quiz/:ques_id/propositions',
        async (req, res) => {
            const question = await db.query('select * from proposition where ques_id =$1', [req.params.ques_id]);
            console.log(question.rows);
            res.json(question.rows);
        })
;

router
    .use((req, res) => {
        res.status(404);
        res.json({
            error: "Page not found"
        });
    });

