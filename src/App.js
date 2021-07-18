import './App.css';
import react, { useState, useEffect, useContext } from 'react';
import auth from "./firebase";
import './App.css';
import Login from './components/Login';
import Signup from './components/Signup';
import Feed from './components/Feed';
import Profile from './components/Profile';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import AuthProvider, { AuthContext } from './contexts/AuthProvider';

function App() {
    return (
        <div className='app'>
            <AuthProvider>
                <Router>
                    <Switch>
                        <Route path="/login" component={Login}></Route>
                        <Route path="/signup" component={Signup}></Route>
                        <PrivateRoute path="/profile" component={Profile}></PrivateRoute>
                        <PrivateRoute path="/" abc={Feed}></PrivateRoute>
                    </Switch>
                </Router>
            </AuthProvider>
        </div>
    )

}


// Private Route
function PrivateRoute(props) {

    // we can't pass parentProps containing component to route with condition if we did it doesn't check condition 
    // istead just excutes the component so we can do it by changing name component to else like abc
    console.log("obj - ", props);
    let Component = props.abc;
    let { currentUser } = useContext(AuthContext);

    return (
        <Route {...props} render={(props) => {
            return currentUser != null ? <Component {...props}></Component> : <Redirect to='/login'></Redirect>
        }}>
        </Route>
    )
}

export default App;