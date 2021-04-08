import './App.css';
import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link, Router} from "@reach/router";
import QuizForm from "./Form/QuizForm";


function Quiz() {

    const [quiz, setQuiz] = useState([]);

    useEffect(() => {
        const getQuiz = async () => {
            const data = (await axios.get('http://localhost:8000/quiz')).data;
            setQuiz(data);
        }
        getQuiz()
    }, []);

    if(quiz.length === 0 )
        return (
            <p>Loading</p>
        )

    // function showQuestions(quiz_id){
    //     window.location.href = 'http://localhost:3000/quiz/';
    // }

    return (
        <>
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Nom du Quiz</th>
                    <th scope="col">image</th>
                    <th scope="col">Nombre de questions</th>
                    <th scope="col">Actions</th>
                </tr>
                </thead>
                <tbody>
                {quiz.map(q =>
                    <tr>
                        <td>{q.quiz_id}</td>
                        <td>{q.quiz_name}</td>
                        <td>
                            <img class="image" src={q.quiz_image} alt="Pas d'image"/>
                        </td>
                        <td>10</td>
                        <td>
                            <Link className="btn btn-success" to={`${q.quiz_id}/questions`}>Jouer</Link>
                            <Link className="btn btn-warning" to={`/quiz/${q.quiz_id}/edit`}>Modifier</Link>
                            <Link className="btn btn-danger" to={`/quiz/${q.quiz_id}/delete`}>Supprimer</Link>
                        </td>
                    </tr>
                )}
                </tbody>
            </table>

            <Link className="btn btn-success" to="/quiz/new">Créer un quiz</Link>

        </>
    );
}

export default Quiz;
