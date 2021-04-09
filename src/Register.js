import axios from "axios";
import React, {useState} from "react";
import {redirectTo} from "@reach/router";
import {Button, Card, Form, ListGroup} from "react-bootstrap";

export default function Register() {
    const [user, setUser] = useState({util_name: "", util_password: ""});

    async function createAccount(e) {
        e.preventDefault();
        try {
            console.log(user);
            await axios.post('http://localhost:8000/signup', user);
            alert("Compte créé, vous pouvez vous connecter")
            setUser({util_name: "", util_password: ""});
        } catch (err) {
            alert(err);
        }
    }

    return(
        <div className="register-wrapper container mt-2">
            <Card>
                <Card.Header><h1>Inscrivez-vous dès maintenant !</h1></Card.Header>
                <Form onSubmit={createAccount}>
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
        </div>
    )
}