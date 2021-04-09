import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "@reach/router";
import async from "async";

let tab_props = [];

    let compteur = 1;
export default function Form(props) {
    let count_new = 0;

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
            console.log(data);
            generateHtmlPropositions(data)

        }
        getPropositions()
    }, []);





    function generateHtmlQuestions(questions) {
        console.log('generateHtmlQuestions');

        questions.forEach(q => {
            // div question
            let div = document.createElement('div');
            div.className = 'question';
            div.id = 'question_' + q.ques_id;
            div.classList.add('form-group', 'quiz_wrapper');

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
            div.appendChild(input);

            // div des réponses
            let div_props = document.createElement('div');
            div_props.id = 'props_question_' + q.ques_id;
            div_props.classList.add('props_wrapper')
            div.appendChild(div_props);


            // button delete
            let button = document.createElement('button');
            button.className = "btn btn-danger";
            button.onclick = e => deleteQuestion(e, q.ques_id);
            button.innerHTML = "Supprimer la question";
            div.appendChild(button);

            // button add réponse
            let button_add_prop = document.createElement('button');
            button_add_prop.className = "btn btn-success";
            button_add_prop.onclick = e => addProposition(e, q.ques_id);
            button_add_prop.innerHTML = "Ajouter réponse";
            div_props.appendChild(button_add_prop);

            document.getElementById('questions_wrapper').appendChild(div);
        })
    }

    function generateHtmlPropositions(propositions) {
        console.log('genererateHtmlPropositions');

        propositions.forEach(function (p) {
            let input = document.createElement('input');
            input.setAttribute("type", "text");
            input.id = 'prop_' + p.prop_id;
            input.classList.add('input_prop');
            input.value = p.prop_phrase;
            input.style.width = "200px";
            input.style.marginLeft = "auto";
            input.style.marginRight = "auto";
            input.style.marginLeft = "auto";
            input.style.marginRight = "auto";
            // document.getElementById('questions_wrapper').appendChild(input);

            // button delete
            let button = document.createElement('button');
            button.id = 'btn_prop_' + p.prop_id
            button.className = "btn btn-danger";
            button.onclick = e => deleteProposition(e, p.prop_id);
            button.innerHTML = "S";

            document.getElementById('props_question_' + p.ques_id).appendChild(input);
            document.getElementById('props_question_' + p.ques_id).appendChild(button);
        })
    }

    function addQuestion(e) {
        console.log('addQuestion');
        e.preventDefault();
        count_new++;
        // div question
        var div = document.createElement('div');
        div.className = 'question';
        div.style.marginBottom = "20px";
        div.classList.add('form-group', 'quiz_wrapper');
        div.id = 'new_question_' + count_new;
        var label = document.createElement('label');
        label.innerHTML = 'Question ' + compteur++ + ' :';

        // input question phrase
        var input = document.createElement('input');
        input.setAttribute("type", "text");
        input.name = 'new_ques';
        input.id = 'new_ques';
        input.classList.add('new_ques', 'form-control');
        input.style.width = "300px"
        input.style.marginLeft = "auto";
        input.style.marginRight = "auto";
        div.appendChild(label);
        div.appendChild(input);

        // button delete
        let button = document.createElement('button');
        button.className = "btn btn-danger";
        button.id = 'new_btn_' + count_new;
        button.onclick = function (e) {
            e.preventDefault();
            var ques_id = this.id.substr(8);
            document.getElementById('new_question_' + ques_id).hidden = true;
        };
        button.innerHTML = "Supprimer la question";
        div.appendChild(button);

        document.getElementById('questions_wrapper').appendChild(div);
    }

    function addProposition(e, ques_id){
        e.preventDefault();
        console.log('addProposition');
        count_new++;
        // div question

        // input question phrase
        var input = document.createElement('input');
        input.setAttribute("type", "text");
        input.id = 'new_prop_'+ count_new+'_ques_'+ques_id;
        input.name = 'new_prop';
        input.classList.add('new_prop');
        input.style.width = "200px";
        input.style.marginLeft = "auto";
        input.style.marginRight = "auto";
        input.style.marginBottom = "5px";

        document.getElementById('props_question_'+ques_id).appendChild(input);

        // button delete
        let button = document.createElement('button');
        button.id = 'new_btn_prop_'+ count_new;
        button.className = "btn btn-danger";
        button.onclick = function (e) {
            e.preventDefault();
            var id = this.id.substr(13,14);
            // alert(id);
            document.getElementById('new_prop_' +id+ '_ques_' +ques_id).hidden = true;
            document.getElementById('new_btn_prop_' + id).hidden = true;
        };
        button.innerHTML = "S";
        document.getElementById('props_question_'+ques_id).appendChild(button);


        // document.getElementById('questions_wrapper').appendChild(div);
    }

    function updateAll(e) {
        e.preventDefault();
        console.log('updateQuiz');

        function postNewQuestions() {
            var new_questions = document.getElementsByClassName("new_ques");
            for (let i = 0; i < new_questions.length; i++) {
                axios.get('http://localhost:8000/new_question/' + new_questions[i].value + '/' + quiz.quiz_id);
            }
        }

        function postNewPropositions() {
            var new_propositions = document.getElementsByClassName("new_prop");
            for (let i = 0; i < new_propositions.length; i++) {
                var ques_id = new_propositions[i].id.substr(16);
                console.log(ques_id);
                axios.get('http://localhost:8000/new_proposition/' + ques_id + '/' + new_propositions[i].value + '/false');
            }
        }

        function updateQuestions() {
            var questions = document.getElementsByClassName('input_ques');
            for (let i = 0; i < questions.length; i++) {
                let ques_id = questions[i].id.substr(5)
                axios.get('http://localhost:8000/edit_question/' + ques_id + '/' + questions[i].value);
                // axios.get('http://localhost:8000/edit_question/' + ques_id + '/CECI EST UN TEST');
            }
        }

        async function updatePropositions() {
            var propositions = document.getElementsByClassName('input_prop');
            for (let i = 0; i < propositions.length; i++) {
                let prop_id = propositions[i].id.substr(5);
                axios.get('http://localhost:8000/edit_proposition/' + prop_id + '/' + propositions[i].value + '/false');
                // axios.get('http://localhost:8000/edit_proposition/' + prop_id + '/OKKKKKK/false');
            }
        }

        let quiz_name = document.getElementById('quiz_name').value;
        let quiz_keyword = document.getElementById('quiz_keyword').value;

        axios.all([
            axios.get('http://localhost:8000/edit_quiz/' + quiz.quiz_id + '/' + quiz_name + '/' + quiz_keyword),
            postNewQuestions(),
            postNewPropositions(),
            updateQuestions(),
            updatePropositions(),
        ])

        compteur = 0;
        alert('Les informations ont bien été modifié !');
        document.location.reload();
    }

    function deleteQuiz(e, quiz_id) {
        e.preventDefault();
        var answer = window.confirm("Voulez-vous vraiment supprimer le quiz ?");
        if (answer === true) {
            axios.get('http://localhost:8000/delete_quiz/' + quiz_id);
            window.location.href = "http://localhost:3000/quiz";
        }
    }

    function deleteQuestion(e, ques_id) {
        e.preventDefault();
        axios.get('http://localhost:8000/delete_question/' + ques_id);
        document.getElementById('question_' + ques_id).hidden = true;
    }

    function deleteProposition(e, prop_id) {
        e.preventDefault();
        axios.get('http://localhost:8000/delete_proposition/' + prop_id);
        document.getElementById('prop_' + prop_id).hidden = true;
        document.getElementById('btn_prop_' + prop_id).hidden = true;
    }





    return (
        <>
            <div class="page">
                <form>
                    <br/>
                    <div id="quiz_wrapper" className="form-group quiz_wrapper">
                        <h2>Modification du Quiz</h2>

                        <label htmlFor="quiz_name">Nom du quiz :</label>
                        <input type="text" id="quiz_name" class="quiz_name" name="quiz_name" className="form-control"
                               style={{width: 300}}/><br/>
                        <label>Thème :</label>
                        <input type="text" id="quiz_keyword" className="form-control" style={{width: 300}}/><br/>
                        <button className="btn btn-danger" onClick={e => deleteQuiz(e, quiz.quiz_id)}>Supprimer le quiz</button>
                    </div>

                    <button className="btn btn-warning" type="submit" onClick={updateAll}>Tout mettre à jour</button>
                    <br/><br/>
                    <div id="questions_wrapper">

                    </div>
                </form>

                <button class="btn btn-success" onClick={addQuestion}>Ajouter une question</button>
                <br/><br/>
                <button className="btn btn-warning" type="submit" onClick={updateAll}>Tout mettre à jour</button>
            </div>
        </>
    );
}