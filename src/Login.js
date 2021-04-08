import React, {useEffect, useState} from "react";
import axios from "axios";
import {useCookies} from "react-cookie";

export default function Login() {
    const [user, setUser] = useState({util_name: "", util_password: ""});
    const [cookies, setCookie, removeCookie] = useCookies(['td06']);
    // const [items, setItems] = useState([]);

    function showData(e) {
        e.preventDefault();
        console.log("current user = ", user);
    }

    // useEffect(() => {
    //     axios.defaults.headers.common['Authorization'] = (cookies.td06 ? 'Bearer ' + cookies.td06.token : null);
    // }, [cookies.td06]);

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

    // async function getItems() {
    //     try {
    //         const data = (await axios.get('http://localhost:8000/items')).data;
    //         setItems(data);
    //     } catch (err) {
    //         alert("err : " + err);
    //     }
    // }

    if (cookies && cookies.td06) {
        return (
            <div className="container">
                <div className="row">
                    hello {cookies.td06.name} !!
                </div>
                <div className="row">
                    <button className="btn btn-danger" onClick={() => removeCookie('td06')}>
                        Déconnexion
                    </button>
                    {/*<button className="btn btn-success" onClick={getItems}>*/}
                    {/*    objets*/}
                    {/*</button>*/}
                </div>
                {/*<div className="row">*/}
                {/*    <ul>*/}
                {/*        {items.map( item =>*/}
                {/*            <li key={item.id}>{item.name}</li>*/}
                {/*        )}*/}
                {/*    </ul>*/}
                {/*</div>*/}
            </div>
        )
    }

    return(
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
    )
}