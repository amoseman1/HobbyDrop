import React, { useContext, useState, useEffect } from "react"
import { auth0 } from "../firebase"
import API from "../util/API"

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)

  function signup(email, password) {
    return auth0.createUserWithEmailAndPassword(email, password)
  }

  async function login(email, password) {
    const loginUser = await auth0.signInWithEmailAndPassword
      (email, password)
    const dbUser = await API.getUser(email)
    setCurrentUser({ ...loginUser, ...dbUser.data })
    return { ...loginUser, ...dbUser.data }
  }

  function logout() {
    return auth0.signOut()
  }

  function resetPassword(email) {
    return auth0.sendPasswordResetEmail(email)
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email)
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password)
  }

  useEffect(() => {
    const unsubscribe = auth0.onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}