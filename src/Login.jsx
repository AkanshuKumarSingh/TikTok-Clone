import react, { useState } from 'react'

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleEmailInput = (e) => {
        setEmail(e.target.value);
    }

    const handlePasswordInput = (e) => {
        setPassword(e.target.value);
    }

    const handleSubmit = (e) => {
        console.log(email);
        console.log(password);
    }

    return (
        <>
            <h1>Firebase Login</h1>
            <input type="email" value={email} onChange={handleEmailInput}></input>
            <input type="password" value={password} onChange={handlePasswordInput}></input>
            <input type="button" value="submit" onClick={handleSubmit}></input>
        </>
    )
}

export default Login;