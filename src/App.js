import './App.css';
import React, {useState} from "react";
import {Link, Router} from "@reach/router";
import axios from 'axios';
import {useCookies} from 'react-cookie';
import Login from "./Login";
import Register from "./Register";
import 'bootstrap/dist/css/bootstrap.css';
import Quiz from "./Quiz";
import QuizForm from "./Form/QuizForm";
import QuizEditForm from "./Form/QuizEditForm";
import Question from "./Questions";


function App() {
  const [user, setUser] = useState({util_name: "", util_password: ""});
  const [cookies, setCookie, removeCookie] = useCookies(['td06']);

  return (
      <div className="App">
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
              <a className="navbar-brand" href="http://localhost:3000/home">Quiz des crackheads</a>

              <div className="collapse navbar-collapse" id="navbarNavDropdown">
                  <ul className="navbar-nav">
                      <Link className="btn btn-info" to="quiz">Liste des Quiz</Link>
                      <Link className="btn btn-secondary" to="login">Connexion</Link>
                      <Link to="/register">S'inscrire</Link>
                  </ul>
              </div>
          </nav>
          <Router>
              <Login path="/login"/>
              <Register path="/register"/>
              <Quiz path="quiz"/>
              <Question path="quiz/:quiz_id/questions"/>
              <QuizForm path="/quiz/new"/>
              <QuizEditForm path="/quiz/:quiz_id/edit"/>
          </Router>
      </div>
  );
}

export default App;
