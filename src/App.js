import './App.css';
import Quiz from "./Quiz";
import {Link, Router} from "@reach/router";


function App() {
  return (
    <div className="App">
      <nav>
        <Link to="/quiz">Les quiz</Link>
      </nav>
      <Router>
        <Quiz path="/quiz"/>
      </Router>
    </div>
  );
}

export default App;
