import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import app from "../Firebase/firebase.config";
import axios from "axios";


export const AuthContex = createContext();
const auth = getAuth(app);


const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


    const creaetUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            const userEmail = currentUser?.email || user?.email;
            const loggedUser = { email: userEmail };

            setUser(currentUser);
            console.log('Current User', currentUser);
            setLoading(false)
            // If user exists then issue a token
            if (currentUser) {
                axios.post('http://localhost:4500/jwt', loggedUser, {
                    withCredentials: true
                })
                    .then(res => {
                        console.log("token response", res.data);
                    })
            }
            else {
                axios.post('http://localhost:4500/logout', loggedUser, {
                    withCredentials: true
                })
                    .then(res => {
                        console.log(res.data);
                    })
            }
        })
        return () => {
            return unSubscribe();
        }
    }, [])


    const logOut = () => {
        return signOut(auth);
    }

    const authInfo = {
        user,
        loading,
        creaetUser,
        signIn,
        logOut,
    }

    return (
        <AuthContex.Provider value={authInfo}>
            {children}
        </AuthContex.Provider>
    );
};

export default AuthProvider;