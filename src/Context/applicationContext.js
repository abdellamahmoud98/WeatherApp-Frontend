import React, { useState } from 'react'
import { useCookies } from 'react-cookie'

const AppContext = React.createContext()

const AppContextProvider = ({ children }) => {
  const [cookies, setCookie, removeCookie] = useCookies(['userData'])
  const [userSessionData, setUserSessionData] = useState(undefined)
  const setSession = (userData) => {
    setCookie('userData', userData, {
      path: '/',
      maxAge: 900, //15minutes
    })
  }
  const getSession = () => {
    const userData = cookies.userData || null
    return userData
  }
  const setUserData = (userData) => setUserSessionData(userData)
  const getUserData = () => userSessionData
  const logout = () => {
    removeCookie('userData', { path: '/' })
    setUserData(undefined)
  }
  return (
    <AppContext.Provider
      value={{
        setSession,
        getSession,
        setUserData,
        getUserData,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export { AppContext }
export default AppContextProvider
