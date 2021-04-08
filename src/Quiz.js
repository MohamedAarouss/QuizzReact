import './App.css';
import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link, Router} from "@reach/router";
import QuizForm from "./Form/QuizForm";


function Quiz() {

    const [search, setSearch] = useState("");
    const [quiz, setQuiz] = useState([]);

    let handleSearch = e => {
        setSearch(e.target.value);
    }

    useEffect(() => {
        const research = quiz.filter(q => String(q.quiz_keyword) === String(search) || String(q.quiz_name) === String(search));
        research.length === 0 ? getQuiz() : setQuiz(research);
    }, [search]);

    async function getQuiz() {
        const data = (await axios.get('http://localhost:8000/quiz')).data;
        console.log(data);
        setQuiz(data);
    }

    async function deleteQuiz(e, quiz_id) {
        e.preventDefault();
        var answer = window.confirm("Voulez-vous vraiment supprimer le quiz ?");
        if (answer === true) {
            axios.get('http://localhost:8000/delete_quiz/' + quiz_id);
            window.location.href = "http://localhost:3000/quiz";
        }

    }

    if (quiz.length === 0)
        return (
            <p>Pas de quiz, ou vous n'avez pas les droits d'accès.</p>
        )

    return (
        <>
            <div class="page">
                <div className="research_wrapper">
                    <label>Recherche (Nom ou Thème) : </label>
                    <input id="search" value={search} onChange={handleSearch} type="text"/>
                </div>

                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Nom du Quiz</th>
                        <th scope="col">Thème</th>
                        <th scope="col">image</th>
                        <th scope="col">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                {quiz.map(q =>
                    <tr>
                        <td>{q.quiz_id}</td>
                        <td>{q.quiz_name}</td>
                        <td>{q.quiz_keyword}</td>
                        <td>
                            <img class="image" src={q.quiz_image} alt="Pas d'image"/>
                        </td>
                        <td>
                            <Link className="btn btn-success" to={`${q.quiz_id}/questions`}>Jouer</Link>
                            <Link className="btn btn-warning" to={`/quiz/${q.quiz_id}/edit`}>Modifier</Link>
                            <button className="btn btn-danger" onClick={e => deleteQuiz(e, q.quiz_id)}>Supprimer
                            </button>
                        </td>
                    </tr>
                )}
                    </tbody>
                </table>

                <Link className="btn btn-success" to="/quiz/new">Créer un quiz</Link>

            </div>


        </>
    );
}

export default Quiz;
