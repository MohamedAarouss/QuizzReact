import React, {useEffect, useState} from "react";
import axios from "axios";
import {useCookies} from "react-cookie";
import {navigate} from "@reach/router";
import {Button, Card, Form, ListGroup} from "react-bootstrap";

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
        navigate('/quiz');
    }

    return(
        <div className="login-wrapper container mt-2">
            <Card>
                <Card.Header><h1>Pour profiter du site, connectez-vous !</h1></Card.Header>
                <Form onSubmit={signIn}>
                    <ListGroup variant="flush">

                        <ListGroup.Item>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Nom d'utilisateur</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={user.util_name}
                                    onChange={e => setUser({...user, util_name: e.target.value})}
                                />
                            </Form.Group>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Mot de passe</Form.Label>
                                <Form.Control
                                    type="password"
                                    value={user.util_password}
                                    onChange={e => setUser({...user, util_password: e.target.value})}
                                />
                            </Form.Group>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Button variant="primary" type="submit">
                                Se connecter
                            </Button>
                        </ListGroup.Item>

                    </ListGroup>
                </Form>
            </Card>

            {/*<form onSubmit={signIn} method="post">*/}
            {/*    <div>*/}
            {/*        Username*/}
            {/*        <input*/}
            {/*            type="text"*/}
            {/*            value={user.util_name}*/}
            {/*            onChange={e => setUser({...user, util_name: e.target.value})}*/}
            {/*        />*/}
            {/*    </div>*/}
            {/*    <div>*/}
            {/*        Password*/}
            {/*        <input*/}
            {/*            type="password"*/}
            {/*            value={user.util_password}*/}
            {/*            onChange={e => setUser({...user, util_password: e.target.value})}*/}
            {/*        />*/}
            {/*    </div>*/}
            {/*    <div>*/}
            {/*        <button type="submit">Valider</button>*/}
            {/*    </div>*/}
            {/*</form>*/}
        </div>
    )
}