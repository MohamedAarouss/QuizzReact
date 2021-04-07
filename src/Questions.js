import './App.css';
import React, {useEffect, useState} from "react";
import axios from "axios";

function Question(props) {
    return (
        <>
            <div className="question">
                Question : {props.question}
                <br/>
                Points : {props.points}
            </div>
            <div className="propositions">
            </div>
        </>
    );
}


function Questions(props) {

    const [questions, setQuestions] = useState([]);
    const [currIndex, setCurrIndex] = useState(0);

    useEffect(() => {
        const getQuestions = async () => {
            const quiz_id = props.quiz_id;
            const data = (await axios.get('http://localhost:8000/quiz/'+quiz_id+'/questions')).data;
            console.log(data);
            setQuestions(data);
        }
        getQuestions()
    }, []);


    if(questions.length === 0)
        return (
            <p>Loading</p>
        )

    const currentQuestion = questions[currIndex];
    const jsxQuestion = <Question question={currentQuestion.ques_phrase} points={currentQuestion.ques_points}/>;

    function handleClick() {
        if (currIndex + 1 < questions.length){
            setCurrIndex(currIndex + 1);
        }
        else setCurrIndex(0);
    }

        return (
        <>
            <div className="Questions">
                {jsxQuestion}
                {/*<p>*/}
                {/*    {questions[1].map(q => <li>{q.ques_phrase} <img src={q.ques_image} alt=""/></li>)}*/}
                {/*    hello !*/}
                {/*</p>*/}
                <button onClick={(() => handleClick())}>Next</button>
            </div>
        </>
    );
}

export default Questions;
export {Question};
