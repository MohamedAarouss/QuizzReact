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
            <h1>Bienvenue sur Cra'Quiz !</h1>
            <label>Recherche par thème : </label>
            <input id="search" value={search} onChange={handleSearch} type="text"/>

            {quiz.map(q =>
                <div class="quiz_wrapper">
                    <h1><b>{q.quiz_name}</b></h1>
                    <span>Thème : "{q.quiz_keyword}"</span>
                    <img class="image2" src={q.quiz_image} alt="Pas d'image"/>
                    <br/>
                    <Link className="btn btn-success play" to={`/quiz/${q.quiz_id}/questions`}>Jouer</Link>
                </div>
            )}
        </>
    );
}

export default Home;
