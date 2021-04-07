import logo from './logo.svg';
import './App.css';
import React, {useState} from "react";
import {Link, Router} from "@reach/router";
import axios from 'axios';
import {useCookies} from 'react-cookie';
import Login from "./Login";

function App() {
  const [user, setUser] = useState({util_name: "", util_password: ""});
  const [cookies, setCookie, removeCookie] = useCookies(['td06']);

  async function createAccount(e) {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/signup', user);
          } catch (err) {
      alert(err);
    }
  }

  async function signIn(e) {
    e.preventDefault();
    console.log("test ", user.util_name);
    try {
      const response = (await axios.post('http://localhost:8000/token', user));
      const data = {name: user.util_name, token: response.data.token}
      setCookie('td06', data, '/');
    } catch (err) {
      alert("err : " + err);
    }
  }

  function showData(e) {
    e.preventDefault();
    console.log("current user = ", user);
  }

  if (cookies && cookies.td06) {
    return (
        <div className="container">
          <div className="row">
            hello {cookies.td06.name} !!
          </div>
          <div className="row">
            <button className="btn btn-danger" onClick={() =>
                removeCookie('td06')}>
              Déconnexion
            </button>
          </div>
        </div>
    )
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>

        <div className="login-wrapper">
          <h1>Pour profiter du site, connectez-vous !</h1>
          <form onSubmit={signIn} method="post">
            <div>
              Username
              <input
                  type="text"
                  value={user.util_name}
                  onChange={e => setUser({...user, util_name: e.target.value})}
              />
            </div>
            <div>
              Password
              <input
                  type="password"
                  value={user.util_password}
                  onChange={e => setUser({...user, util_password: e.target.value})}
              />
            </div>
            <div>
              <button type="submit">Valider</button>
            </div>
          </form>
        </div>

      </header>
    </div>
  );
}

export default App;
