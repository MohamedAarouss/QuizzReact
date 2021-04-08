import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "@reach/router";
import async from "async";

let tab_props = [];

export default function Form(props) {
var compteur = 1;

    const [quiz, setQuiz] = useState([]);
    useEffect(() => {
        const getQuiz = async () => {
            const quiz_id = props.quiz_id;
            const quiz = (await axios.get('http://localhost:8000/quiz/' + quiz_id)).data;
            setQuiz(quiz[0]);
            document.getElementById('quiz_name').value = quiz[0].quiz_name;
            document.getElementById('quiz_keyword').value = quiz[0].quiz_keyword;
        }
        getQuiz()
    }, []);

    const [questions, setQuestions] = useState([]);
    useEffect(() => {
        const getQuestions = async () => {
            const quiz_id = props.quiz_id;
            const data = (await axios.get('http://localhost:8000/quiz/' + quiz_id + '/questions')).data;
            setQuestions(data);

            generateHtmlQuestions(data);
        }
        getQuestions()
    }, []);

    const [propositions, setPropositions] = useState([]);
    useEffect(() => {
        const getPropositions = async () => {
            const quiz_id = props.quiz_id;
            const data = (await axios.get('http://localhost:8000/propositions/' + quiz_id)).data;
            setPropositions(data);
            console.log(data)
            // data.forEach(function (p) {
            //     let input = document.createElement('input');
            //     input.setAttribute("type", "text");
            //     input.id = 'prop_' + p.prop_id;
            //     input.value = p.prop_phrase;
            //     document.getElementById('props_question_' + p.ques_id).appendChild(input);
            // })
        }
        getPropositions()
    }, []);

    function addQuestion(e) {
        console.log('addQuestion');
        e.preventDefault();

        // div question
        var div = document.createElement('div');
        div.className = 'question';
        div.style.marginBottom = "20px";
        var label = document.createElement('label');
        label.innerHTML = 'Question ' + compteur++ + ' :';

        // input question phrase
        var input = document.createElement('input');
        input.setAttribute("type", "text");
        input.name = 'new_ques';
        input.id = 'new_ques';
        input.classList.add('new_ques', 'form-control');
        input.style.width = "300px"
        input.style.marginBottom = "5px"
        div.appendChild(label);
        div.appendChild(input);

        // button delete
        let button = document.createElement('button');
        button.className = "btn btn-danger";
        // button.onclick = e => deleteQuestion(e, q.ques_id);
        button.innerHTML = "Supprimer";
        // div.appendChild(button);

        document.getElementById('questions_wrapper').appendChild(div);
    }

    function generateHtmlQuestions(questions) {
        console.log('generateHtmlQuestions');

        questions.forEach(q => {
            // div question
            let div = document.createElement('div');
            div.className = 'question';
            div.id = 'question_' + q.ques_id;
            div.style.marginBottom = "20px";

            // label
            let label = document.createElement('label');
            label.innerHTML = 'Question ' + compteur++ + ' :';
            div.appendChild(label);

            // input question phrase
            let input = document.createElement('input');
            input.setAttribute("type", "text");
            input.classList.add('input_ques', 'form-control');
            input.id = 'ques_' + q.ques_id;
            input.value = q.ques_phrase;
            input.style.width = "300px"
            input.style.marginBottom = "5px"
            div.appendChild(input);

            // div des réponses
            let div_props = document.createElement('div');
            div_props.id = 'props_question_' + q.ques_id;
            div.appendChild(div_props);

            // button delete
            let button = document.createElement('button');
            button.className = "btn btn-danger";
            button.onclick = e => deleteQuestion(e, q.ques_id);
            button.innerHTML = "Supprimer";
            div.appendChild(button);

            document.getElementById('questions_wrapper').appendChild(div);
        })
    }

    async function updateQuiz(e) {
        e.preventDefault();

        function postNewQuestions() {
            var new_questions = document.getElementsByClassName("new_ques");
            for (let i = 0; i < new_questions.length; i++) {
                axios.get('http://localhost:8000/new_question/' + new_questions[i].value + '/' + quiz.quiz_id);
            }
        }

        function updateQuestions() {
            var questions = document.getElementsByClassName('input_ques');
            for (let i = 0; i < questions.length; i++) {
                let ques_id = questions[i].id.substr(5)
                axios.get('http://localhost:8000/edit_question/' + ques_id + '/' + questions[i].value);
            }
        }

        axios.all([
            axios.get('http://localhost:8000/edit_quiz/' + quiz.quiz_id + '/' + e.target.quiz_name.value + '/' + e.target.quiz_keyword.value),
            postNewQuestions(),
            updateQuestions(),
        ])

        document.location.reload();
    }

    function deleteQuestion(e, ques_id) {
        e.preventDefault();
        axios.get('http://localhost:8000/delete_question/' + ques_id);
        document.location.reload();
    }

    async function deleteQuiz(e, quiz_id) {
        e.preventDefault();
        var answer = window.confirm("Voulez-vous vraiment supprimer le quiz ?");
        if (answer === true) {
            axios.get('http://localhost:8000/delete_quiz/' + quiz_id);
            window.location.href = "http://localhost:3000/quiz";
        }
    }

    return (
        <>
            <h1>Modification du Quiz</h1>
            <form onSubmit={updateQuiz}>
                <div id="quiz_wrapper" className="form-group quiz_wrapper">
                    <label>Nom du quiz :</label>
                    <input type="text" id="quiz_name" className="form-control" style={{width: 300}}/><br/>
                    <label>Nom du thème :</label>
                    <input type="text" id="quiz_keyword" className="form-control" style={{width: 300}}/><br/>
                    <button className="btn btn-danger" onClick={e => deleteQuiz(e, quiz.quiz_id)}>Supprimer le quiz
                    </button>
                </div>
                <div className="form-group quiz_wrapper">
                    <div id="questions_wrapper">
                    </div>
                    <button class="btn btn-success" onClick={addQuestion}>Ajouter une question</button><br/>
                    <button class="btn btn-warning" type="submit">Mettre à jour</button>
                </div>
            </form>

        </>
    );
}
