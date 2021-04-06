import React from "react";


export default function Form() {
    function addQuiz(e){
        e.preventDefault();
    }
    return (
        <form onSubmit={addQuiz}>
            <label htmlFor="quiz_name">Nom du quiz</label>
            <input type="text" id="quiz_name" name="quiz_name"/><br/>
            <button type="submit">OK</button>
        </form>
    );
}