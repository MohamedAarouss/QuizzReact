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
    .get("/new_quiz/:quiz_name/:quiz_keyword", async (req, res) => {
        try {
            await db.query("insert into quiz(quiz_name, quiz_keyword) values($1,$2)", [req.params.quiz_name, req.params.quiz_keyword]);
        } catch (err) {
            console.error(err);
            res.sendStatus(500);
        }
    })

    // EDIT QUIZ
    .get("/edit_quiz/:quiz_id/:quiz_name/:quiz_keyword", async (req, res) => {
        try {
            await db.query("UPDATE quiz SET quiz_name = $2, quiz_keyword = $3 WHERE quiz_id = $1", [req.params.quiz_id, req.params.quiz_name, req.params.quiz_keyword]);
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
                const questions = await db.query('select * from question where question.quiz_id =$1 ORDER BY ques_id ASC', [req.params.quiz_id]);
                for (const q of questions.rows) {
                    await db.query('DELETE FROM proposition where proposition.ques_id = $1', [q.ques_id]);
                }
                await db.query('DELETE FROM question where question.quiz_id = $1', [req.params.quiz_id]);
                await db.query('DELETE FROM quiz WHERE quiz_id = $1', [req.params.quiz_id]);

            } catch (err) {
                console.error(err);
                res.sendStatus(500);
            }
        })

    // LIST ALL QUIZ
    .get('/quiz',
        async (req, res) => {
            try {
                const result = await db.query('select * from quiz ORDER BY quiz_id ASC');
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
                const result = await db.query('select * from quiz where quiz_id =$1 ORDER BY quiz_id ASC', [req.params.id]);
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
                const question = await db.query('select * from question where quiz_id =$1 ORDER BY ques_id ASC', [req.params.id]);
                res.json(question.rows);
            } catch (err) {
                console.error(err);
                res.sendStatus(500);
            }
        })
    .get('/quiz/:ques_id/propositions',
        async (req, res) => {
            const question = await db.query('select * from proposition where ques_id =$1 ORDER BY prop_id ASC', [req.params.ques_id]);
            res.json(question.rows);
        })
    .get('/propositions/:quiz_id',
        async (req, res) => {
            const question = await db.query('select * from proposition,question,quiz WHERE proposition.ques_id = question.ques_id AND question.quiz_id = quiz.quiz_id AND quiz.quiz_id = $1 ORDER BY prop_id ASC', [req.params.quiz_id]);
            res.json(question.rows);
        })
;
// ---------------------------------- QUESTION ----------------------------------
router
    // new question
    .get('/new_question/:ques_phrase/:quiz_id', async (req, res) => {
        try {
            await db.query("insert into question(ques_phrase, quiz_id) values($1,$2)", [req.params.ques_phrase, req.params.quiz_id]);
            // return res.redirect('http://localhost:3000/quiz');
            console.log('ajout new ques');
        } catch (err) {
            console.error(err);
            res.sendStatus(500);
        }
    })
    // update question
    .get("/edit_question/:ques_id/:ques_phrase", async (req, res) => {
        try {
            console.log('update question');
            await db.query("UPDATE question SET ques_phrase = $2 WHERE ques_id = $1", [req.params.ques_id, req.params.ques_phrase]);
            // return res.redirect('http://localhost:3000/quiz');
        } catch (err) {
            console.error(err);
            res.sendStatus(500);
        }
    })
    // delete question
    .get('/delete_question/:ques_id',
        async (req, res) => {
            try {
                await db.query('DELETE FROM proposition where proposition.ques_id = $1', [req.params.ques_id]);
                await db.query('DELETE FROM question where question.ques_id = $1', [req.params.ques_id]);

                return res.redirect('http://localhost:3000/quiz');
            } catch (err) {
                console.error(err);
                res.sendStatus(500);
            }
        })

// ----------------------------- PROPOSITION -----------------------------
router
    // new proposition
    .get('/new_proposition/:ques_id/:prop_phrase/:prop_valide', async (req, res) => {
        try {
            await db.query("insert into proposition(ques_id, prop_phrase, prop_valide) values($1,$2,$3)", [req.params.ques_id, req.params.prop_phrase, req.params.prop_valide]);
        } catch (err) {
            console.error(err);
            res.sendStatus(500);
        }
    })
    // update proposition
    .get("/edit_proposition/:prop_id/:prop_phrase/:prop_valide", async (req, res) => {
        try {
            console.log('AAAAAAAAAAAAAAAAAAAAAAa');
            await db.query("UPDATE proposition SET prop_phrase = $2, prop_valide = $3 WHERE prop_id = $1", [req.params.prop_id, req.params.prop_phrase, req.params.prop_valide]);
            // await db.query("UPDATE proposition SET prop_phrase = 'TEST' WHERE prop_id = $1", [req.params.prop_id]);
            console.log('BBBBBBBBBBBBBBBBBBBBBBBBBBB');

        } catch (err) {
            console.error(err);
            res.sendStatus(500);
        }
    })
    // delete proposition
    .get('/delete_proposition/:prop_id',
        async (req, res) => {
            try {
                await db.query('DELETE FROM proposition where proposition.prop_id = $1', [req.params.prop_id]);
            } catch (err) {
                console.error(err);
                res.sendStatus(500);
            }
        })

router
    .use((req, res) => {
        res.status(404);
        res.json({
            error: "Page not found"
        });
    });

