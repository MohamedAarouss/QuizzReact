import './App.css';
import React, {useEffect, useState} from "react";
import axios from "axios";

let score = 0;

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
                            <input type="checkbox" id="proposition" name="proposition" value={p.prop_valide}/>
                                <label htmlFor="subscribeNews">{p.prop_phrase}<img className="image" src={p.prop_image} alt=""/></label>
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
    const [initial, setInitial] = useState(true);

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

    //console.log('avant question : '+currIndex)
    const currentQuestion = questions[currIndex]; // A voir si bien appelé
    const jsxQuestion = <Question question={currentQuestion.ques_phrase} points={currentQuestion.ques_points} propositions={propositions}/>;

    async function getPropositions() {
        let p = [];
        console.log('getPropositions')
        const ques_id = currentQuestion.ques_id;
        //console.log(ques_id)
        //try{ // execute 2 fois ?
            console.log('avant')
        // if(!initial){
            await axios.get('http://localhost:8000/quiz/'+ques_id+'/propositions')
            .then(response => {
                p=response.data;
                setPropositions(p);
                //setCurrIndex(currIndex+1)
                console.log('result')})
            .catch(error => {
                console.log(error.response)
            })
            console.log(p);
            // setPropositions(p);
            console.log('apres')
        // }else{
        //     await axios.get('http://localhost:8000/quiz/1/propositions')
        //         .then(response => {
        //             p=response.data;
        //             setPropositions(p);
        //             //setCurrIndex(currIndex+1)
        //             console.log('result')})
        //         .catch(error => {
        //             console.log(error.response)
        //         })
        //     setInitial(false)
        // }

            //
            // console.log(currIndex)
        //}catch (err){
            //alert(err)
        //}
    }

    if(propositions.length===0){
        getPropositions();
        // let p = [{"prop_id":1,"prop_phrase":"Toto","prop_image":"","prop_valide":true,"ques_id":1},{"prop_id":2,"prop_phrase":"Cleveland","prop_image":"","prop_valide":true,"ques_id":1},{"prop_id":3,"prop_phrase":"Leo","prop_image":"","prop_valide":true,"ques_id":1}]
        // setPropositions(p)
        //setCurrIndex(currIndex+1)
        //console.log(currIndex)
        //setInitial(false)
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
