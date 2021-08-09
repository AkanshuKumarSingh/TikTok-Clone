import React, { useState, useEffect } from 'react';
import auth from '../firebase';

export const AuthContext = React.createContext();

export default function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);
    
    function login(email, password) {
        // firebase
        return auth.signInWithEmailAndPassword(email, password);
    }

    function signout() {
        // firebase signup
        return auth.signOut();
    }

    function signup(email,password) {
        return auth.createUserWithEmailAndPassword(email,password);
    }

    useEffect(() => {
        // event Listener add
        console.log("event Listener add");
        const unsubscribe = auth.onAuthStateChanged(user => {
            console.log("inside listner - ", user);
            setCurrentUser(user);
            setLoading(false);
        })
        return unsubscribe;
    }, []);

    const value = {
        currentUser,
        login,
        signout,
        signup
    }

    console.log("wee ", children);

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>

    )
}