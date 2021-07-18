import logo from './logo.svg';
import './App.css';
import react, { useState, useEffect } from 'react';
import auth from "./firebase";

function App() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loader, setLoader] = useState(false);
  const [user, setUser] = useState(null);
  const [mainLoader, setMainLoader] = useState(true);

  const handleEmailInput = (e) => {
    setEmail(e.target.value);
  }

  const handlePasswordInput = (e) => {
    setPassword(e.target.value);
  }

  const handleLogout = async () => {
    setLoader(true);
    await auth.signOut();
    setUser(null);
    setLoader(false);
  }

  const handleSubmit = async () => {

    try {
      setLoader(true);
      let res = await auth.signInWithEmailAndPassword(email, password);
      console.log(res);
      console.log(res.user);
      setUser(res.user);
      setLoader(false);
    } catch (err) {
      setError(true);
      setLoader(false);
    }

    setEmail("");
    setPassword("");

  }

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      console.log(user);
      setUser(user);
      setMainLoader(false);
    })
  }, [])

  return (
    <>
      {mainLoader == true ? <h1>wait for a second</h1> :
        loader == true ? <h1>Loading...</h1>
          : user != null ?
            <>
              <h1>User LoggedIn {user.uid}
                <button onClick={handleLogout}>Logout</button>
              </h1>
            </>
            :
            <>
              <h1>Firebase Login</h1>
              <input type="email" value={email} onChange={handleEmailInput}></input>
              <input type="password" value={password} onChange={handlePasswordInput}></input>
              <input type="button" value="submit" onClick={handleSubmit}></input>
            </>
      }
    </>
  )
}

export default App;
