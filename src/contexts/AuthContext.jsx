import React, { createContext, useContext, useEffect, useState } from 'react'
import { GoogleProvider, FacebookProvider } from '../config/firebase-config'
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, FacebookAuthProvider } from 'firebase/auth';
const AuthContext= createContext();

export const useAuth =()=>{
    return useContext(AuthContext);
}

export const AuthProvider = ({children}) => {
    const [currentUser , setCurrentUser ] = useState();
    const auth = getAuth();
    auth.languageCode='it';
    const signup = (email,password)=>{
        createUserWithEmailAndPassword(auth,email,password)
        // .then((userCredential)=>{
        //     //Signed up 
        //     // console.log(userCredential)
        //     const user = userCredential.user;
        //     const accessToken = user.accessToken;
        // })
        // .catch((error)=>{
        //     const errorCode = error.code;
        //     const errorMessage = error.message;
        //     console.log(errorMessage)
        //     console.log(errorCode)
        // })
    }
    const signInWithGoogle = ()=>{
        signInWithPopup(auth,GoogleProvider)
        .then((result)=>{
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            // ...
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
          });
    }

    const signInWithFacebook = ()=>{
        signInWithPopup(auth, FacebookProvider)
        .then((result) => {
            // The signed-in user info.
            const user = result.user;

            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            const credential = FacebookAuthProvider.credentialFromResult(result);
            const accessToken = credential.accessToken;

            // IdP data available using getAdditionalUserInfo(result)
            // ...
        })
        .catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = FacebookAuthProvider.credentialFromError(error);

            // ...
        });
    }

    const signin = (email,password)=>{
        signInWithEmailAndPassword(auth,email,password)
        // .then((userCredential) => {
        //     // Signed in 
        //     const user = userCredential.user;
        //     const accessToken=user.accessToken;
        //     return accessToken;
        //     // ...
        //   })
        //   .catch((error) => {
        //     const errorCode = error.code;
        //     const errorMessage = error.message;
        //     console.log(errorMessage)
        //     console.log(errorCode)
        //     return errorCode;
        //   });
    }
    useEffect(()=>{
        const stopAuthListener = onAuthStateChanged(auth,(user)=>{
            setCurrentUser(user)
        })

        return stopAuthListener
    },[])
    const value = {
        currentUser,
        signup,
        signin,
        signInWithGoogle,
        signInWithFacebook
    }
  return (
    <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
  )
}
