import React, { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut
} from "firebase/auth";
import app from "../Firebase/firebase.config";


export const AuthContent = createContext();
const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  //creat an account

  const creatUser = (email, password) => {
   return createUserWithEmailAndPassword(auth, email, password);
  };

  // signup with gmail
  const signUpwithGmail = () => {
    return signInWithPopup(auth, googleProvider);
  };

  //login using email and password
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

//log out
const logOut = ()=>{
  return  signOut(auth)
}

//update profile
const updateUserProfile =({name, photoURL})=>{
  return  updateProfile(auth.currentUser, {
        displayName:name,  photoURL:photoURL
      })
}


//check signed in user and this is also helps to logout the user and returns to the home page with login

useEffect(()=>{
 const unsuscribed = onAuthStateChanged(auth, (currentUser) => {
        if (currentUser) {
        setUser(currentUser)
        setLoading(false)
        } else {
          setUser(null);
          setLoading(false);
        }
      });
      return () =>{
         return unsuscribed()
      }
}, [])

  const authInfo = {
    user,
    creatUser,
    signUpwithGmail,
    login,
    logOut,
    updateUserProfile,
    loading
  };
  return (
    <AuthContent.Provider value={authInfo}>{children}</AuthContent.Provider>
  );
};

export default AuthProvider;
