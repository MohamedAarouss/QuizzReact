import React, {useEffect, useState} from "react";
import axios from "axios";


export default function Form(props) {

    const [quiz, setQuiz] = useState([]);
    useEffect(() => {
        const getQuiz = async () => {
            const quiz_id = props.quiz_id;
            const quiz = (await axios.get('http://localhost:8000/quiz/'+quiz_id)).data;
            setQuiz(quiz[0]);
        }
        getQuiz()
    }, []);

    function editQuiz(e){
        e.preventDefault();
        window.location.href = 'http://localhost:8000/edit_quiz/' +quiz.quiz_id+ '/' + e.target.quiz_name.value;
    }

    return (
        <>
            <h1>Modification du Quiz</h1>
            <form onSubmit={editQuiz}>
                <label htmlFor="quiz_name">Nom du quiz</label>
                <input type="text" id="quiz_name" name="quiz_name" /><br/>
                <button class="btn btn-warning" type="submit">Modifier</button>
            </form>
        </>
    );
}