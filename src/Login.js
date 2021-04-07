import signIn from "./App";
import React, {useState} from "react";

export default function Login() {
    const [user, setUser] = useState({util_name: "", util_password: ""});

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
    function showData(e) {
        e.preventDefault();
        console.log("current user = ", user);
    }
}