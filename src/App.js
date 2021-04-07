import './App.css';
import Quiz from "./Quiz";
import QuizForm from "./Form/QuizForm";
import {Link, Router} from "@reach/router";
import 'bootstrap/dist/css/bootstrap.css';

function App() {
  return (
      <div className="App">
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
              <a className="navbar-brand" href="http://localhost:3000/home">Quiz des crackheads</a>

              <div className="collapse navbar-collapse" id="navbarNavDropdown">
                  <ul className="navbar-nav">
                      <Link class="btn btn-info" to="/quiz">Liste des Quiz</Link>
                      <button type="button" className="btn btn-secondary">Connexion</button>
                  </ul>
              </div>
          </nav>
          <Router>
              <Quiz path="/quiz"/>
          </Router>
      </div>
  );
}

export default App;
