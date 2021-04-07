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
                {props.propositions.map(p =>
                    <tr>
                        <td>
                            {p.prop_phrase}
                            <img className="image" src={p.prop_image} alt=""/>
                        </td>
                    </tr>
                )}
            </div>
        </>
    );
}

function Questions(props) {

    const [questions, setQuestions] = useState([]);
    const [propositions, setPropositions] = useState([]);
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
            <p>Pas de questions</p>
        )

    let q = document.getElementById("questions");
    let score = 0;

    const currentQuestion = questions[currIndex];
    const jsxQuestion = <Question question={currentQuestion.ques_phrase} points={currentQuestion.ques_points} propositions={propositions}/>;

    async function getPropositions() {
        let p = [];
        const ques_id = currentQuestion.ques_id;
        try{
            p = (await axios.get('http://localhost:8000/quiz/'+ques_id+'/propositions')).data;
            console.log(p);
        }catch (err){
            alert(err)
        }finally {
            setPropositions(p);
        }
    }

    if(propositions.length===0){
        getPropositions();
    }

    function handleClick() {
        if (currIndex + 1 < questions.length){
            setCurrIndex(currIndex + 1);
            getPropositions();
        }
        else q.innerHTML = "<h3 style='color: #ff0000'>Il n'y a plus de questions !</h3><br>" +
            "<h4>Votre score est de : </h4>"+score;
    }

        return (
        <>
            <div id="questions" className="Questions">
                {jsxQuestion}
                <button onClick={(() => handleClick())}>OK</button>
            </div>
        </>
    );
}

export default Questions;
export {Question};
