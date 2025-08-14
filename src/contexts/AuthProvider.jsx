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
//axios
import axios from "axios";
// import { data } from "autoprefixer";

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
//all this are gotten using the unsuscribe function and axios is used a post request thru the /jwt route
//to get the token

useEffect(()=>{
 const unsuscribed = onAuthStateChanged(auth, currentUser => {
        setUser(currentUser);
        if (currentUser) {
        const userInfo = {
          name:currentUser.displayName,
          email:currentUser.email
        }
        axios.post('https://foodie-backend-umhd.onrender.com/jwt', userInfo)
        // axios.post(`${API_BASE_URL}/jwt`, userInfo)
        .then((response) => {
          if(response.data.token){
            localStorage.setItem('Access-token', response.data.token)
            
          }  
        })  
        } else{
          localStorage.removeItem('Access-token')
        }
        setLoading(false)
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
