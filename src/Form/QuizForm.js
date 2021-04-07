import React from "react";


export default function Form() {
    function addQuiz(e){
        e.preventDefault();
        window.location.href = 'http://localhost:8000/new_quiz/' + e.target.quiz_name.value;
    }
    return (
        <>
            <h1>Créer un nouveau Quiz</h1>
            <form onSubmit={addQuiz}>
                <label htmlFor="quiz_name">Nom du quiz</label>
                <input type="text" id="quiz_name" name="quiz_name"/><br/>
                <button class="btn btn-success" type="submit">Créer</button>
            </form>
        </>
    );
}