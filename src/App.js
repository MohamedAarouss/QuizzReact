import './App.css';
import React from "react";
import {Link, Router} from "@reach/router";
import 'bootstrap/dist/css/bootstrap.css';
import Quiz from "./Quiz";
import QuizForm from "./Form/QuizForm";
import QuizEditForm from "./Form/QuizEditForm";
import Question from "./Questions";


function App() {
  return (
      <div className="App">
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
              <a className="navbar-brand" href="http://localhost:3000/home">Quiz des crackheads</a>

              <div className="collapse navbar-collapse" id="navbarNavDropdown">
                  <ul className="navbar-nav">
                      <Link className="btn btn-info" to="quiz">Liste des Quiz</Link>
                      <button type="button" className="btn btn-secondary">Connexion</button>
                  </ul>
              </div>
          </nav>
          <Router>
              <Quiz path="quiz"/>
              <QuizForm path="/quiz/new"/>
              <QuizEditForm path="/quiz/:quiz_id/edit"/>
              <Question path="quiz/:quiz_id"/>
          </Router>
      </div>
  );
}

export default App;
