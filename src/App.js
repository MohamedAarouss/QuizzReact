import './App.css';
import Quiz from "./Quiz";
import QuizForm from "./Form/QuizForm";
import {Link, Router} from "@reach/router";


function App() {
  return (
    <div className="App">
      <nav>
        <Link to="/quiz">Les quiz</Link>
        <Link to="/quiz/new">Créer un quiz</Link>
      </nav>
      <Router>
        <Quiz path="/quiz"/>
        <QuizForm path="/quiz/new"/>
      </Router>
    </div>
  );
}

export default App;
