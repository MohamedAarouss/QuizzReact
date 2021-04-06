import './App.css';
import React, {useEffect, useState} from "react";
import axios from "axios";

function Quiz() {

    const [quiz, setQuiz] = useState([]);

    useEffect(() => {
        const getQuiz = async () => {
            const data = (await axios.get('http://localhost:8000/quiz')).data;
            console.log(data);
            setQuiz(data);
        }
        getQuiz()
    }, []);

    if(quiz.length === 0 )
        return (
            <p>Loading</p>
        )

    return (
        <>
        <div className="Quiz">
            <p>
                {quiz.map(q => <li>{q.quiz_name}</li>)}
            </p>
        </div>
        </>
    );
}

export default Quiz;
