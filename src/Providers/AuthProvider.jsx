import React, { createContext, useEffect, useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import app from '../firebase.config';

// to be exported
export const AuthContext = createContext(null);

const auth = getAuth(app);

const AuthProvider = ({children}) => {


    const [user, setUser] = useState(null);

    // loading user...... 
    const [loading, Setloading] = useState(true);


    const createUser = (email, password) => {
        Setloading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signIn = (email, password) => {
        Setloading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const logOut = () => {
        return signOut(auth);
    }

    // ...............................
    // observer user auth state...
    // ...............................
    useEffect( () => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);

            // loading stop
            Setloading(false);
        });
        // stop observing while unmounting
        return () => {
            return unsubscribe();
        }
    }, [])







    // const user = {displayName: 'google'}

    const authInfo = {
        user,
        loading,
        createUser,
        signIn,
        logOut
    }

    return (
       <AuthContext.Provider value={authInfo}>
        {children}
       </AuthContext.Provider>
    );
};

export default AuthProvider;