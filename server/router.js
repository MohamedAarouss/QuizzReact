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
            const result = await db.query('select * from question where quiz_id =$1 and ques_id=$2', [req.params.id,req.params.ques_id]);
            const proposition = await db.query('select * from proposition where ques_id =$1',[req.params.ques_id]);
            console.log([result.rows,proposition.rows]);
            res.json([result.rows,proposition.rows]);
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
