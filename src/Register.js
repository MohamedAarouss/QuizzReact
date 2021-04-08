import axios from "axios";
import React, {useState} from "react";
import {redirectTo} from "@reach/router";

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
        <div className="register-wrapper">
            <h1>Si vous n'êtes pas encore inscrit, vous pouvez le faire dès maintenant !</h1>
            <form onSubmit={createAccount} method="post">
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