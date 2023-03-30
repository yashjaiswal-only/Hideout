import React, { createContext, useContext, useEffect, useState } from 'react'
import { GoogleProvider, FacebookProvider } from '../config/firebase-config'
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, FacebookAuthProvider, signOut } from 'firebase/auth';
const AuthContext= createContext();
import axios from 'axios'
import { async } from '@firebase/util';
import { checkUser } from '../ApiCalls/User';

export const useAuth =()=>{
    return useContext(AuthContext);
}

export const AuthProvider = ({children}) => {
    const [currentUser , setCurrentUser ] = useState();
    const [authorizedUser, setAuthorizedUser] = useState(false || sessionStorage.getItem('accessToken'));

    const auth = getAuth();
    auth.languageCode='it';
    const signup = async(email,password)=>{
        // console.log(email)
        // console.log(password)
        await createUserWithEmailAndPassword(auth,email,password)
        .then(async(userCredential)=>{
            //Signed up
            console.log(userCredential)
            const user = userCredential.user;
            if(user){
                setCurrentUser(user);
                await user.getIdToken()
                .then(async(tkn)=>{
                    sessionStorage.setItem('accessToken',tkn);
                    setAuthorizedUser(true);
                    const checkuser = checkUser();
                    console.log(checkuser)
                    if(checkuser.data.User == 0){
                        console.log("new user here")
                        const createUser = await axios.get(import.meta.env.VITE_API+"user/create",{
                            headers:{
                                'Authorization': `Bearer ${tkn}`
                            }
                        })
                        console.log(createUser);
                    }
                    else{
                        console.log("Account already exists");
                        return;
                    }
                })
            }
            // const accessToken = user.accessToken;
        })
        .catch((error)=>{
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage)
            console.log(errorCode)
        })
    }
    const signInWithGoogle = async()=>{
        await signInWithPopup(auth,GoogleProvider)
        .then(async(result)=>{
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            // The signed-in user info.
            const user = result.user;
            const details = {
                uid: user.uid,
                token: user.accessToken
            };
            console.log(user);
            if(user){
                setCurrentUser(details);
                await user.getIdToken()
                .then(async (tkn)=>{
                    sessionStorage.setItem('accessToken',tkn);
                    setAuthorizedUser(true);
                    console.log('checking user')
                    const checkuser =await checkUser();
                    console.log(checkuser)
                    console.log('checked user')
                    // if(checkuser.data.User == 0){
                    //     const createUser = await axios.get(import.meta.env.VITE_API+"user/create",{
                    //         headers:{
                    //             'Authorization': `Bearer ${tkn}`
                    //         }
                    //     })
                    //     console.log(createUser);
                    // }
                    // else{
                    //     console.log("Account already exists");
                    //     return;
                    // }
                })
                .catch(err=>{
                    console.log('error at sign in')
                    console.log(err)
                })
            }

            console.log("user");
            // console.log(user);

        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            return 0;
            // ...
        });
        
        
    }

    const signInWithFacebook = async()=>{
        await signInWithPopup(auth, FacebookProvider)
        .then((result) => {
            // The signed-in user info.
            const user = result.user;

            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            const credential = FacebookAuthProvider.credentialFromResult(result);
            const accessToken = credential.accessToken;

            if(user){
                setCurrentUser(user);
                user.getIdToken()
                .then(async(tkn)=>{
                    sessionStorage.setItem('accessToken',tkn);
                    setAuthorizedUser(true);
                    const checkuser = await axios.get(import.meta.env.VITE_API+"user/checkuser",{
                        headers:{
                            'Authorization': `Bearer ${tkn}`
                        }
                    });
                    if(checkuser.data.User == 0){
                        const createUser = await axios.get(import.meta.env.VITE_API+"user/create",{
                            headers:{
                                'Authorization': `Bearer ${tkn}`
                            }
                        })
                        console.log(createUser);
                    }
                    else{
                        console.log("Account already exists");
                        return;
                    }
                })
            }
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

    const signin = async(email,password)=>{
        // console.log(email)
        // console.log(password)
        await signInWithEmailAndPassword(auth,email,password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            const accessToken=user.accessToken;
            console.log(user)
            if(user){
                setCurrentUser(user);
                user.getIdToken()
                .then((tkn)=>{
                    sessionStorage.setItem('accessToken',tkn);
                    setAuthorizedUser(true);
                })
            }

            return accessToken;
            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage)
            console.log(errorCode)
            return errorCode;
          });
    }

    const signout = async() => {
        await signOut(auth)
        .then(()=>{
            sessionStorage.clear();
            setAuthorizedUser(false);
            alert('Logged Out Successfully');
        }).catch((error) => {
        // An error happened.
        alert(error);
        });
    }

    // useEffect(()=>{
    //     const stopAuthListener = onAuthStateChanged(auth,(user)=>{
    //         setCurrentUser(user)
    //     })

    //     return stopAuthListener
    // },[])
    const value = {
        currentUser,
        signup,
        signin,
        signInWithGoogle,
        signInWithFacebook,
        signout,
        authorizedUser
    }
  return (
    <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
  )
}
