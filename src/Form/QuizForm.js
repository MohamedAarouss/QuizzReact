import React from "react";
import axios from "axios";


export default function Form() {
    function addQuiz(e){
        e.preventDefault();
        // axios.get('http://localhost:8000/new_quiz/' +e.target.quiz_name.value+ '/' +e.target.quiz_keyword.value+ '/http://localhost:8000/img/25595.jpg');
        axios.get('http://localhost:8000/new_quiz/' +e.target.quiz_name.value+ '/' +e.target.quiz_keyword.value);
        window.location.href = "http://localhost:3000/quiz/";
    }

    return (
        <>
            <h1>Créer un nouveau Quiz</h1>
            <form onSubmit={addQuiz} className="form-group quiz_wrapper">
                <label htmlFor="quiz_name">Nom du quiz</label>
                <input type="text" id="quiz_name" name="quiz_name" className="form-control" style={{width:300}}/><br/>
                <label htmlFor="quiz_keyword">Nom du thème</label>
                <input type="text" id="quiz_keyword" name="quiz_keyword" className="form-control" style={{width:300}}/><br/>
                {/*<input type="file" id="quiz_image" name="quiz_image" accept="image/png, image/jpeg" multiple onChange={processSelectedFiles}/><br/>*/}
                <button class="btn btn-success" type="submit">Créer</button>
            </form>
        </>
    );
}