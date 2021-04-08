import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "@reach/router";
import async from "async";

let tab_props = [];

var compteur = 1;
export default function Form(props) {

    const [quiz, setQuiz] = useState([]);
    useEffect(() => {
        const getQuiz = async () => {
            const quiz_id = props.quiz_id;
            const quiz = (await axios.get('http://localhost:8000/quiz/' + quiz_id)).data;
            setQuiz(quiz[0]);
            document.getElementById('quiz_name').value = quiz[0].quiz_name;
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
        var div = document.createElement('div');
        div.className = 'question';
        var label = document.createElement('label');
        label.innerHTML = 'Question ' + compteur++;
        var input = document.createElement('input');
        input.setAttribute("type", "text");
        input.name = 'new_ques';
        input.id = 'new_ques';
        input.className = 'new_ques';
        div.appendChild(label);
        div.appendChild(input);
        document.getElementById('questions_wrapper').appendChild(div);
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

        await axios.all([
            axios.get('http://localhost:8000/edit_quiz/' + quiz.quiz_id + '/' + e.target.quiz_name.value),
            postNewQuestions(),
            updateQuestions(),
        ])

        document.location.reload();
    }

    function generateHtmlQuestions(questions) {
        console.log('generateHtmlQuestions');

        questions.forEach(q => {
            let div = document.createElement('div');
            div.className = 'question';
            div.id = 'question_' + q.ques_id;
            let label = document.createElement('label');
            label.innerHTML = 'Question ' + compteur++;
            let input = document.createElement('input');
            input.setAttribute("type", "text");
            input.className = 'input_ques';
            input.id = 'ques_' + q.ques_id;
            input.value = q.ques_phrase;
            div.appendChild(label);
            div.appendChild(input);
            let div_props = document.createElement('div');
            div_props.id = 'props_question_' + q.ques_id;
            div.appendChild(div_props);
            document.getElementById('questions_wrapper').appendChild(div);

        })
    }

    return (
        <>
            <h1>Modification du Quiz</h1>
            <form onSubmit={updateQuiz}>
                <label>Nom du quiz</label>
                <input type="text" id="quiz_name"/>

                <div id="questions_wrapper">

                </div>

                <button class="btn btn-success" onClick={addQuestion}>Ajouter une question</button>
                <button class="btn btn-warning" type="submit">Mettre à jour</button>
            </form>

        </>
    );
}
