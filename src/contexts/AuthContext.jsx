import React, { createContext, useContext, useEffect, useState } from 'react'
import { GoogleProvider, FacebookProvider } from '../config/firebase-config'
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, FacebookAuthProvider, signOut } from 'firebase/auth';
const AuthContext = createContext();
import axios from 'axios'
import { checkUser, createUser } from '../ApiCalls/User';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../Redux/UserRedux';

export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
    // const [currentUser, setCurrentUser] = useState();
    const [authorizedUser, setAuthorizedUser] = useState(false || sessionStorage.getItem('accessToken'));
    const dispatch=useDispatch();
    const auth = getAuth();
    auth.languageCode = 'it';
    const signup = async (email, password) => {
        let returnval
        // console.log(email)
        // console.log(password)
        await createUserWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                //Signed up
                console.log(userCredential)
                const user = userCredential.user;
                //  
                await user.getIdToken()
                    .then(async (tkn) => {
                        setAuthorizedUser(true);
                        const checkuser = await checkUser(tkn);
                        if (checkuser.data.User == -1) {
                            const createuser = await createUser(tkn)
                            // console.log(createuser);
                            returnval = {
                                status: 1,
                                email: createuser.data.email,
                            }
                            dispatch(addUser({email:returnval.email,token:tkn}));
                        }
                        else {
                            // console.log("Account already exists");
                            returnval = {
                                status: 0,
                                error: "Account already exists! Please Login",
                            }
                        }
                    }).catch((error) => {
                        // console.log('error at sign up')
                        returnval = {
                            status: 0,
                            error: "Error in creating account! Please check your internet connection and Try Again",
                        }
                    })
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage)
                console.log(errorCode)
                returnval = {
                    status: 0,
                    error: errorCode.slice(5),
                }
            })
        return returnval;
    }
    const signInWithGoogle = async () => {
        let returnval
        await signInWithPopup(auth, GoogleProvider)
            .then(async (result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                // The signed-in user info.
                const user = result.user;
                 
                const details = {
                    uid: user.uid,
                    token: user.accessToken
                };
                console.log(user);
                // setCurrentUser(details);
                await user.getIdToken()
                    .then(async (tkn) => {
                        setAuthorizedUser(true);
                        const checkuser = await checkUser(tkn);
                        if (checkuser.data.User == -1) {//email not found
                            const createuser = await createUser(tkn)
                            returnval = {
                                status: 1,
                                email: createuser.data.email,
                                found:0
                            }
                        }
                        else if(checkuser.data.User==0){//name not found
                            returnval = {
                                status: 1,
                                email: checkuser.data.email,
                                found:0,
                            }
                        }
                        else {
                            returnval = {   //name and email found
                                status: 1,
                                email: checkuser.data.email,
                                found:1,
                            }
                        }
                        dispatch(addUser({email:returnval.email,token:tkn}));
                    })
                    .catch(err => {
                        returnval = {
                            status: 0,
                            error: "Error in signing in! Please check your internet connection and Try Again",
                        }
                    })

            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);

                returnval = {
                    status: 0,
                    error: errorMessage.slice(9)
                }
            });
        return returnval
    }

    const signInWithFacebook = async () => {
        let returnval
        await signInWithPopup(auth, FacebookProvider)
            .then(async(result) => {
                // The signed-in user info.
                const user = result.user;
                 
                // This gives you a Facebook Access Token. You can use it to access the Facebook API.
                const credential = FacebookAuthProvider.credentialFromResult(result);
                const accessToken = credential.accessToken;

                await user.getIdToken()
                .then(async (tkn) => {
                    setAuthorizedUser(true);
                    const checkuser = await checkUser(tkn);
                    if (checkuser.data.User == -1) {//email not found
                        const createuser = await createUser(tkn)
                        returnval = {
                            status: 1,
                            email: createuser.data.email,
                            found:0
                        }
                    }
                    else if(checkuser.data.User==0){//name not found
                        returnval = {
                            status: 1,
                            email: checkuser.data.email,
                            found:0,
                        }
                    }
                    else {
                        returnval = {   //name and email found
                            status: 1,
                            email: checkuser.data.email,
                            found:1,
                        }
                    }
                    dispatch(addUser({email:returnval.email,token:tkn}));
                })
                .catch(err => {
                    returnval = {
                        status: 0,
                        error: "Error in signing in! Please check your internet connection and Try Again",
                    }
                })
            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = FacebookAuthProvider.credentialFromError(error);
                returnval = {
                    status: 0,
                    error: errorMessage.slice(9)
                }
            });
        return returnval
    }

    const signin = async (email, password) => {
        let returnval
        await signInWithEmailAndPassword(auth, email, password)
            .then(async(userCredential) => {
                const user = userCredential.user;
                const accessToken = user.accessToken;
                console.log(user)
                 
                // if(user){
                // setCurrentUser(user);
                await user.getIdToken()
                    .then(async (tkn) => {
                        setAuthorizedUser(true);
                        const checkuser = await checkUser(tkn);
                        console.log(checkuser)
                        if (checkuser.data.User == -1) {//email not found
                            const createuser = await createUser(tkn)
                            returnval = {
                                status: 1,
                                email: createuser.data.email,
                                found:0
                            }
                        }
                        else if(checkuser.data.User==0){//name not found
                            returnval = {
                                status: 1,
                                email: checkuser.data.email,
                                found:0,
                            }
                        }
                        else {
                            returnval = {   //name and email found
                                status: 1,
                                email: checkuser.data.email,
                                found:1,
                            }
                        }
                        dispatch(addUser({email:returnval.email,token:tkn}));
                    })
                    .catch(err => {
                        returnval = {
                            status: 0,
                            error: "Error in signing in! Please check your internet connection and Try Again",
                        }
                    })
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage)
                console.log(errorCode)
                returnval = {
                    status: 0,
                    error: "Error! Please check your internet connection and Try Again",
                }
            });
        return returnval
    }

    const signout = async () => {
        await signOut(auth)
            .then(() => {
                sessionStorage.clear();
                setAuthorizedUser(false);
                alert('Logged Out Successfully');
            }).catch((error) => {
                // An error happened.
                alert(error);
            });
    }

    useEffect(()=>{
        console.log('in autocontext')
    },[])
    const value = {
        // currentUser,
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
