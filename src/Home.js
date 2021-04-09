import './App.css';
import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link, Router} from "@reach/router";

function Home() {

    const [search, setSearch] = useState("");
    const [quiz, setQuiz] = useState([]);

    let handleSearch = e => {
        setSearch(e.target.value);
    }
    useEffect(() => {
        const research = quiz.filter(q => String(q.quiz_keyword) === String(search));
        research.length === 0 ? getQuiz() : setQuiz(research);
    }, [search]);

    async function getQuiz() {
        const data = (await axios.get('http://localhost:8000/quiz')).data;
        console.log(data);
        setQuiz(data);
    }

    return (
        <>
            <div class="page">
            <h1>Bienvenue sur Cra'Quiz !</h1>
            <div class="research_wrapper">
                <label>Recherche (Nom ou Thème) : </label>
                <input id="search" value={search} onChange={handleSearch} type="text"/>
            </div>
            {quiz.map(q =>
                <div class="quiz_presentation">
                    <h1><b>{q.quiz_name}</b></h1>
                    <span>Thème : "{q.quiz_keyword}"</span>
                    <img class="image2" src={q.quiz_image} alt="Pas d'image"/>
                    <br/>
                    <Link className="btn btn-success play" to={`/quiz/${q.quiz_id}/questions`}>Jouer</Link>
                </div>
            )}
            </div>
        </>
    );
}

export default Home;
