"use client"

import { useState } from "react"
import AuthFlow from "@/components/auth-flow"
import ProfileSetup from "@/components/profile-setup"
import WebLayout from "@/components/web-layout"
import WebHomeDashboard from "@/components/web-home-dashboard"
import EnhancedDashboard from "@/components/enhanced-dashboard"
import WebMedicalRecords from "@/components/web-medical-records"
import AppointmentBooking from "@/components/appointment-booking"
import BloodDonation from "@/components/blood-donation"
import Notifications from "@/components/notifications"
import HealthTips from "@/components/health-tips"
import SettingsProfile from "@/components/settings-profile"
import ReportsDashboard from "@/components/reports-dashboard"

export default function SihaHubApp() {
  const [currentScreen, setCurrentScreen] = useState<"auth" | "profile" | "main">("auth")
  const [userRole, setUserRole] = useState<string>("")
  const [userName, setUserName] = useState<string>("User")
  const [activeSection, setActiveSection] = useState<string>("home")

  const handleAuthComplete = (role: string) => {
    setUserRole(role)
    setCurrentScreen("profile")
  }

  const handleProfileComplete = () => {
    setUserName("Alex Johnson")
    setCurrentScreen("main")
  }

  const handleSectionChange = (section: string) => {
    setActiveSection(section)
  }

  if (currentScreen === "auth") {
    return <AuthFlow onComplete={handleAuthComplete} />
  }

  if (currentScreen === "profile") {
    return <ProfileSetup userRole={userRole} onComplete={handleProfileComplete} />
  }

  return (
    <WebLayout
      userName={userName}
      userRole={userRole}
      activeSection={activeSection}
      onSectionChange={handleSectionChange}
    >
      {activeSection === "home" && (
        <WebHomeDashboard userName={userName} userRole={userRole} onSectionChange={handleSectionChange} />
      )}
      {activeSection === "dashboard" && (
        <EnhancedDashboard userName={userName} userRole={userRole} onSectionChange={handleSectionChange} />
      )}
      {activeSection === "medical-record" && (
        <WebMedicalRecords userName={userName} userRole={userRole} onBack={() => setActiveSection("home")} />
      )}
      {activeSection === "appointment-booking" && (
        <AppointmentBooking userName={userName} onBack={() => setActiveSection("home")} />
      )}
      {activeSection === "blood-donation" && (
        <BloodDonation
          userName={userName}
          onBack={() => setActiveSection("home")}
          onNavigateToNotifications={() => setActiveSection("notifications")}
        />
      )}
      {activeSection === "notifications" && (
        <Notifications
          userName={userName}
          onBack={() => setActiveSection("home")}
          onNavigateToBloodDonation={() => setActiveSection("blood-donation")}
          onNavigateToHealthTips={() => setActiveSection("health-tips")}
        />
      )}
      {activeSection === "health-tips" && (
        <HealthTips
          userName={userName}
          onBack={() => setActiveSection("home")}
          onNavigateToNotifications={() => setActiveSection("notifications")}
        />
      )}
      {activeSection === "settings" && <SettingsProfile userName={userName} userRole={userRole} onBack={() => setActiveSection("home")} />}
      {activeSection === "reports" && (
        <ReportsDashboard userName={userName} userRole={userRole} onBack={() => setActiveSection("home")} />
      )}
    </WebLayout>
  )
}
