import React from "react";


export default function Form() {
    function addQuestion(e){
        e.preventDefault();
        // window.location.href = 'http://localhost:8000/new_quiz/' +e.target.quiz_name.value;
    }
    return (
        <form onSubmit={addQuestion}>
            <label htmlFor="quiz_name">Nom du quiz</label>
            <input type="text" id="quiz_name" name="quiz_name"/><br/>
            <button type="submit">OK</button>
        </form>
    );
}