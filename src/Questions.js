import './App.css';
import React, {useEffect, useState} from "react";
import axios from "axios";
import {Card, ListGroup} from "react-bootstrap";
import {navigate} from "@reach/router";

let score = 0;

function Question(props) {

    function handleValidate(){
        let checkBox = document.querySelector('input[type="checkbox"]');
        if(checkBox.checked && checkBox.value){
            checkBox.value=''
            score+=props.points
    }
}

    return (
        <>
            <Card className="container mt-3">
                <Card.Header>
                    <div className="question text-center">
                        <h2>Question : {props.question}</h2>
                        <br/>
                        <h4>Points : {props.points}</h4>
                    </div>
                </Card.Header>
                <ListGroup variant="flush">
                    <div id="propositions" className="propositions">
                        <ListGroup.Item>
                            {props.propositions.map(p =>
                                <div>
                                    <input type="checkbox" id={p.prop_id} name="proposition" value={p.prop_valide}/>
                                    <label className="" htmlFor="subscribeNews">{p.prop_phrase}
                                        <div>
                                            {(() => {
                                                if (p.prop_image !== "") {
                                                    return (
                                                        <div>
                                                            <img className="image ml-2" src={p.prop_image} alt=""/>
                                                        </div>
                                                    )
                                                }
                                            })()}
                                        </div>
                                    </label>
                                </div>
                            )}
                        </ListGroup.Item>
                    </div>
                </ListGroup>
                <Card.Footer>
                    <button className="btn btn-success mb-1 row" onClick={(() => handleValidate())}>Valider</button>
                </Card.Footer>
            </Card>
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

    //console.log('avant question : '+currIndex)
    const currentQuestion = questions[currIndex]; // A voir si bien appelé
    const jsxQuestion = <Question question={currentQuestion.ques_phrase} points={currentQuestion.ques_points} propositions={propositions}/>;

    async function getPropositions() {
        let p = [];
        //console.log('getPropositions')
        const ques_id = currentQuestion.ques_id;
        //console.log(ques_id)
        //try{ // execute 2 fois ?
            //console.log('avant')
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
            //console.log(p);
            // setPropositions(p);
            //console.log('apres')
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
        else{ q.innerHTML = "<div style='text-align: center'>" +
            "<h3 style='color: #ff0000'>Il n'y a plus de questions !</h3><br>" +
            "<h4>Votre score est de : </h4>"+score
            +"</div>";
            score=0;
        }
    }

        return (
        <>
            <div id="questions" className="Questions">
                {jsxQuestion}
                <button className="btn btn-danger mt-2 mx-5" onClick={(() => handleClick())}>Passer la question</button>
            </div>
        </>
    );
}

export default Questions;
export {Question};
