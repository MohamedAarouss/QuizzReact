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

module.exports = router;

router
    .use(auth.initialize())

router
    .post("/signup", async (req, res) => {
        try {
            console.log("test ", req.body);
            bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {
                const result = await db.query('insert into utilisateur(util_name,util_password) values ($1,$2) returning util_id', [req.body.name, hash]);
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
            console.log("test "+ req.body);
            const result = await db.query('select util_id, util_password from utilisateur where util_name=$1', [req.body.name]);
            const match = await bcrypt.compare(req.body.password, result.rows[0].util_password);
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

router
    .get("/hello", auth.authenticate(), (req, res) => {
        res.json("Hello world !!!!");
    })


router
    .get("/", (req, res) => {
        res.json("Hello world!!");
    });

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


router
    .use((req, res) => {
        res.status(404);
        res.json({
            error: "Page not found"
        });
    });

// let persons=[
//     {id:0,name:'John'},
//     {id:1,name:'Jane'}
// ];
//
// router
//     .get("/persons",(req,res)=>{
//         res.json(persons);
//     })
//
// function getPerson(id) {
//     return persons.find(p => p.id === +id);
// }
//
// router
//     .get("/persons/:id",(req,res)=>{
//         res.json(getPerson(req.params.id));
//     })
//
// function insertPerson(p) {
//     p.id = persons.length;
//     persons.push(p);
//     return p;
// }
//
// router
//     .post('/person',
//     (req, res) => {
//         const p = insertPerson(req.body);
//         res.status(201)
//             .set('Location', '/persons/' + p.id)
//             .json(p);
//     })
//
// function removePerson(id) {
//     persons = persons.filter(p => p.id !== +id);
// }
//
// router
//     .delete('/person/:id',
//     (req, res) => {
//         removePerson(req.params.id);
//         res
//             .status(204)
//             .end();
//     })
//
// function updatePerson(person) {
//     persons = persons.map(p => p.id === +person.id ? person : p);
// }
//
// router
//     .patch('/person/:id',
//     (req, res) => {
//         updatePerson(req.body);
//         res
//             .status(200)
//             .json(req.body);
//     })
