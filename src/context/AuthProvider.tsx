import React, { createContext, useContext, useState } from 'react'
import { ROLE } from '../common/constants/auth'

interface AuthContextType {
  isAdmin: boolean
  isLoggedIn: boolean
  login: (role: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: React.ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    // Check local storage for authentication status
    const storedAuthStatus = localStorage.getItem('isLoggedIn')
    return storedAuthStatus === 'true'
  })

  const [isAdmin, setIsAdmin] = useState(() => {
    const roleStore = localStorage.getItem('userRole')
    return roleStore === ROLE.admin
  })

  const login = (userRole: string) => {
    // Set authentication status in local storage
    localStorage.setItem('isLoggedIn', 'true')
    localStorage.setItem('userRole', userRole)
    if (userRole === ROLE.admin) setIsAdmin(true)
    setIsLoggedIn(true)
  }

  const logout = () => {
    // Remove authentication status from local storage
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('userRole')
    setIsLoggedIn(false)
    setIsAdmin(false)
    window.location.href = '/login'
  }

  return (
    <AuthContext.Provider value={{ isAdmin, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
