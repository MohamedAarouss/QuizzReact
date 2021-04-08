import logo from './logo.svg';
import './App.css';
import React, {useState} from "react";
import {Link, Router} from "@reach/router";
import axios from 'axios';
import {useCookies} from 'react-cookie';
import Login from "./Login";
import Register from "./Register";

function App() {
  const [user, setUser] = useState({util_name: "", util_password: ""});
  const [cookies, setCookie, removeCookie] = useCookies(['td06']);

  // async function createAccount(e) {
  //   e.preventDefault();
  //   try {
  //     await axios.post('/http://localhost:8000/signup', user);
  //         } catch (err) {
  //     alert(err);
  //   }
  // }
  //
  // function refreshPage(){
  //   window.location.reload();
  // }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Link to="/login">Se connecter</Link>
        <Link to="/register">S'inscrire</Link>
        <Router>
          <Login path="/login"/>
          <Register path="/register"/>
        </Router>

        {/*<div className="login-wrapper">*/}
        {/*  <h1>Pour profiter du site, inscrivez-vous !</h1>*/}
        {/*  <form onSubmit={createAccount} method="post">*/}
        {/*    <div>*/}
        {/*      Username*/}
        {/*      <input*/}
        {/*          type="text"*/}
        {/*          value={user.util_name}*/}
        {/*          onChange={e => setUser({...user, util_name: e.target.value})}*/}
        {/*      />*/}
        {/*    </div>*/}
        {/*    <div>*/}
        {/*      Password*/}
        {/*      <input*/}
        {/*          type="password"*/}
        {/*          value={user.util_password}*/}
        {/*          onChange={e => setUser({...user, util_password: e.target.value})}*/}
        {/*      />*/}
        {/*    </div>*/}
        {/*    <div>*/}
        {/*      <button type="submit" onClick={refreshPage}>Valider</button>*/}
        {/*    </div>*/}
        {/*  </form>*/}
        {/*</div>*/}

      </header>
    </div>
  );
}

export default App;
