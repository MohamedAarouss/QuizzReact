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
import Home from "./Home";


function App() {
  const [user, setUser] = useState({util_name: "", util_password: ""});
  const [cookies, setCookie, removeCookie] = useCookies(['td06']);
  if (cookies && cookies.td06)
      var isLoggedIn = true;

  return (
      <div className="App">
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
              <Link className="navbar-brand" to="/">Cra'Quiz</Link>

              <div className="collapse navbar-collapse" id="navbarNavDropdown">
                  <ul className="navbar-nav">
                      <Link className="btn btn-info" to="quiz">Administration</Link>
                      <div>
                          {(() => {
                              if (isLoggedIn) {
                                  return (
                                      <div className="row ml-3">
                                          <button className="btn btn-danger" onClick={() => removeCookie('td06')}>
                                              Déconnexion
                                          </button>
                                          <div className="pl-3">
                                              <h4 className="text-light">
                                                  Bonjour {cookies.td06.name} :)
                                              </h4>
                                          </div>
                                      </div>
                                  )
                              } else {
                                  return (
                                      <div>
                                          <Link className="btn btn-secondary" to="login">Connexion</Link>
                                          <Link className="btn btn-primary" to="register">S'inscrire</Link>
                                      </div>
                                  )
                              }
                          })()}
                      </div>
                  </ul>
              </div>
          </nav>
          <Router>
              <Home path="/"/>
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
