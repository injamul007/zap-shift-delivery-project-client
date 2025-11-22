import React, { useEffect, useState } from 'react';
import { AuthContext } from '../AuthContext/AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../../firebase/firebase.config';

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true)

  const createRegisterUserFunc = (email,password) => {
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password)
  }

  const signInUserFunc = (email,password) => {
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password);
  }

  const googleLoginFunc = () => {
    setLoading(true)
    return signInWithPopup(auth, googleProvider)
  }

  const logOut = () => {
    setLoading(true)
    return signOut(auth)
  }

  const updateUserProfileFunc = (profile) => {
    return updateProfile(auth.currentUser, profile)
  }

  //? observe the state
  useEffect(() => {
    const unsubscribe =  onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false)
    })
    return () => {
      unsubscribe();
    }
  },[])

  const authInfo = {
    user,
    setUser,
    loading,
    setLoading,
    createRegisterUserFunc,
    signInUserFunc,
    googleLoginFunc,
    logOut,
    updateUserProfileFunc
  }

  return <AuthContext value={authInfo}>{children}</AuthContext>
};

export default AuthProvider;