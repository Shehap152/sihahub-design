"use client"

import { useState } from "react"
import LoginScreen from "./auth/login-screen"
import RegisterScreen from "./auth/register-screen"
import ForgotPasswordScreen from "./auth/forgot-password-screen"

interface AuthFlowProps {
  onComplete: (role: string) => void
}

export type AuthScreen = "login" | "register" | "forgot-password"

export default function AuthFlow({ onComplete }: AuthFlowProps) {
  const [currentScreen, setCurrentScreen] = useState<AuthScreen>("login")

  const handleAuthSuccess = (role: string) => {
    onComplete(role)
  }

  return (
    <div className="min-h-screen bg-background">
      {currentScreen === "login" && (
        <LoginScreen
          onAuthSuccess={handleAuthSuccess}
          onNavigateToRegister={() => setCurrentScreen("register")}
          onNavigateToForgotPassword={() => setCurrentScreen("forgot-password")}
        />
      )}
      {currentScreen === "register" && (
        <RegisterScreen onAuthSuccess={handleAuthSuccess} onNavigateToLogin={() => setCurrentScreen("login")} />
      )}
      {currentScreen === "forgot-password" && (
        <ForgotPasswordScreen onNavigateToLogin={() => setCurrentScreen("login")} />
      )}
    </div>
  )
}
