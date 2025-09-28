"use client"

import { useState } from "react"
import MedicalRecord from "./medical-record"
import AppointmentBooking from "./appointment-booking"
import BloodDonation from "./blood-donation"
import Notifications from "./notifications"
import HealthTips from "./health-tips"
import InteractiveFeatures from "./interactive-features"
import DoctorDashboard from "./doctor-dashboard"
import PatientManagement from "./patient-management"
import HospitalDashboard from "./hospital-dashboard"
import StaffCoordination from "./staff-coordination"
import AdvancedAppointmentSystem from "./advanced-appointment-system"
import MedicalRecordsSystem from "./medical-records-system"
import SettingsProfile from "./settings-profile"
import HomeDashboard from "./home-dashboard"
import TelemedicineSystem from "./telemedicine-system"
import AnalyticsDashboard from "./analytics-dashboard"

interface MainAppContainerProps {
  userRole: string
  userName: string
}

export default function MainAppContainer({ userRole, userName }: MainAppContainerProps) {
  const [activeTab, setActiveTab] = useState<"home" | "reports" | "settings">("home")
  const [currentSubScreen, setCurrentSubScreen] = useState<string | null>(null)

  // Handle navigation to sub-screens from home
  const handleNavigateToSubScreen = (screen: string) => {
    setCurrentSubScreen(screen)
  }

  // Handle back navigation
  const handleBackToMain = () => {
    setCurrentSubScreen(null)
  }

  // Handle tab changes
  const handleTabChange = (tab: "home" | "reports" | "settings") => {
    setActiveTab(tab)
    setCurrentSubScreen(null) // Reset sub-screen when changing tabs
  }

  // Render sub-screens when navigated from home
  if (currentSubScreen) {
    switch (currentSubScreen) {
      case "medical-record":
        return <MedicalRecord userName={userName} onBack={handleBackToMain} />
      case "appointment-booking":
        return <AppointmentBooking userName={userName} onBack={handleBackToMain} />
      case "blood-donation":
        return (
          <BloodDonation
            userName={userName}
            onBack={handleBackToMain}
            onNavigateToNotifications={() => handleNavigateToSubScreen("notifications")}
          />
        )
      case "notifications":
        return (
          <Notifications
            userName={userName}
            onBack={handleBackToMain}
            onNavigateToBloodDonation={() => handleNavigateToSubScreen("blood-donation")}
            onNavigateToHealthTips={() => handleNavigateToSubScreen("health-tips")}
          />
        )
      case "health-tips":
        return (
          <HealthTips
            userName={userName}
            onBack={handleBackToMain}
            onNavigateToNotifications={() => handleNavigateToSubScreen("notifications")}
          />
        )
      case "interactive-features":
        return <InteractiveFeatures userName={userName} onBack={handleBackToMain} />
      case "doctor-dashboard":
        return <DoctorDashboard userName={userName} onBack={handleBackToMain} />
      case "patient-management":
        return <PatientManagement patientId="p1" onBack={handleBackToMain} />
      case "hospital-dashboard":
        return <HospitalDashboard userName={userName} onBack={handleBackToMain} />
      case "staff-coordination":
        return <StaffCoordination onBack={handleBackToMain} />
      case "advanced-appointments":
        return (
          <AdvancedAppointmentSystem
            userRole={userRole as "patient" | "doctor" | "hospital"}
            userName={userName}
            onBack={handleBackToMain}
          />
        )
      case "medical-records-system":
        return (
          <MedicalRecordsSystem
            userRole={userRole as "patient" | "doctor" | "hospital"}
            userName={userName}
            onBack={handleBackToMain}
          />
        )
      case "telemedicine-system":
        return (
          <TelemedicineSystem
            userRole={userRole as "patient" | "doctor" | "hospital"}
            userName={userName}
            onBack={handleBackToMain}
          />
        )
      case "analytics-dashboard":
        return (
          <AnalyticsDashboard
            userRole={userRole as "patient" | "doctor" | "hospital"}
            userName={userName}
            onBack={handleBackToMain}
          />
        )
      case "settings-profile":
        return <SettingsProfile userName={userName} onBack={handleBackToMain} />
      default:
        return null
    }
  }

  return (
    <HomeDashboard
      userRole={userRole}
      userName={userName}
      onViewMedicalRecord={() => handleNavigateToSubScreen("medical-record")}
      onBookAppointment={() => handleNavigateToSubScreen("appointment-booking")}
      onBloodDonation={() => handleNavigateToSubScreen("blood-donation")}
      onNotifications={() => handleNavigateToSubScreen("notifications")}
      onHealthTips={() => handleNavigateToSubScreen("health-tips")}
      onInteractiveFeatures={() => handleNavigateToSubScreen("interactive-features")}
      onReportsSharing={() => handleNavigateToSubScreen("medical-records-system")}
      onSettingsProfile={() => handleNavigateToSubScreen("settings-profile")}
      onDoctorDashboard={() => handleNavigateToSubScreen("doctor-dashboard")}
      onPatientManagement={() => handleNavigateToSubScreen("patient-management")}
      onHospitalDashboard={() => handleNavigateToSubScreen("hospital-dashboard")}
      onStaffCoordination={() => handleNavigateToSubScreen("staff-coordination")}
      onAdvancedAppointments={() => handleNavigateToSubScreen("advanced-appointments")}
      onTelemedicineSystem={() => handleNavigateToSubScreen("telemedicine-system")}
      onAnalyticsDashboard={() => handleNavigateToSubScreen("analytics-dashboard")}
    />
  )
}
