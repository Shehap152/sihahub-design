"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Calendar,
  Heart,
  FileText,
  Bell,
  Activity,
  ChevronRight,
  Pill,
  Droplets,
  Users,
  Video,
  BarChart3,
} from "lucide-react"

interface HomeDashboardProps {
  userRole: string
  userName: string
  onViewMedicalRecord?: () => void
  onBookAppointment?: () => void
  onBloodDonation?: () => void
  onNotifications?: () => void
  onHealthTips?: () => void
  onInteractiveFeatures?: () => void
  onReportsSharing?: () => void
  onSettingsProfile?: () => void
  onDoctorDashboard?: () => void
  onPatientManagement?: () => void
  onHospitalDashboard?: () => void
  onStaffCoordination?: () => void
  onAdvancedAppointments?: () => void
  onMedicalRecordsSystem?: () => void
  handleNavigateToSubScreen?: (screen: string) => void
  onAnalyticsDashboard?: () => void
}

export default function HomeDashboard({
  userRole,
  userName,
  onViewMedicalRecord,
  onBookAppointment,
  onBloodDonation,
  onNotifications,
  onHealthTips,
  onInteractiveFeatures,
  onReportsSharing,
  onSettingsProfile,
  onDoctorDashboard,
  onPatientManagement,
  onHospitalDashboard,
  onStaffCoordination,
  onAdvancedAppointments,
  onMedicalRecordsSystem,
  handleNavigateToSubScreen,
  onAnalyticsDashboard,
}: HomeDashboardProps) {
  if (userRole === "patient") {
    return (
      <div className="min-h-screen bg-background">
        {/* Top Section - Welcome Banner */}
        <div className="bg-card border-b border-border">
          <div className="px-6 py-6 animate-fade-in-up">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-foreground">Welcome, {userName.split(" ")[0]}</h1>
                <p className="text-muted-foreground mt-1">How are you feeling today?</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Button variant="ghost" size="icon" className="relative btn-press" onClick={onNotifications}>
                    <Bell className="w-5 h-5" />
                    <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-red-500 text-white text-xs animate-pulse-gentle">
                      3
                    </Badge>
                  </Button>
                </div>
                <Avatar className="w-10 h-10">
                  <AvatarImage src="/patient-profile.png" />
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {userName.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 py-6 space-y-6">
          {/* Health Status Overview */}
          <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            <h2 className="text-lg font-semibold text-foreground">Health Status Overview</h2>
            <div className="grid grid-cols-1 gap-3">
              <Card
                className="border-0 shadow-sm card-hover cursor-pointer bg-gradient-to-r from-teal-50 to-teal-100 dark:from-teal-900/20 dark:to-teal-800/20 border-l-4 border-l-teal-500"
                onClick={onReportsSharing}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center">
                        <Activity className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">Blood Pressure Normal</p>
                        <p className="text-sm text-muted-foreground">Last check: 2 days ago</p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>

              <Card
                className="border-0 shadow-sm card-hover cursor-pointer bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-l-4 border-l-blue-500"
                onClick={onBookAppointment}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">Next Appointment</p>
                        <p className="text-sm text-muted-foreground">Tomorrow, 2:00 PM - Dr. Sarah</p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm card-hover cursor-pointer bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border-l-4 border-l-orange-500">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                        <Pill className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">Medication Reminder</p>
                        <p className="text-sm text-muted-foreground">Take vitamins - 8:00 AM daily</p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Quick Actions Section */}
          <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <h2 className="text-lg font-semibold text-foreground">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-4">
              <Card className="border-0 shadow-sm card-hover cursor-pointer btn-press" onClick={onAdvancedAppointments}>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-teal-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <p className="font-semibold text-foreground">Advanced Appointments</p>
                  <p className="text-xs text-muted-foreground mt-1">Full scheduling system</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm card-hover cursor-pointer btn-press" onClick={onBookAppointment}>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-teal-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <p className="font-semibold text-foreground">Book Appointment</p>
                  <p className="text-xs text-muted-foreground mt-1">Schedule with doctors</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm card-hover cursor-pointer btn-press" onClick={onViewMedicalRecord}>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <p className="font-semibold text-foreground">Medical Record</p>
                  <p className="text-xs text-muted-foreground mt-1">View your history</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm card-hover cursor-pointer btn-press" onClick={onReportsSharing}>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <p className="font-semibold text-foreground">Medical Records System</p>
                  <p className="text-xs text-muted-foreground mt-1">Complete health management</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm card-hover cursor-pointer btn-press" onClick={onBloodDonation}>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Droplets className="w-6 h-6 text-white" />
                  </div>
                  <p className="font-semibold text-foreground">Blood Donation</p>
                  <p className="text-xs text-muted-foreground mt-1">Find requests</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm card-hover cursor-pointer btn-press" onClick={onHealthTips}>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <p className="font-semibold text-foreground">Health Tips</p>
                  <p className="text-xs text-muted-foreground mt-1">Learn & improve</p>
                </CardContent>
              </Card>

              {/* Added telemedicine system card for patients */}
              <Card
                className="border-0 shadow-sm card-hover cursor-pointer btn-press"
                onClick={() => handleNavigateToSubScreen("telemedicine-system")}
              >
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-indigo-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Video className="w-6 h-6 text-white" />
                  </div>
                  <p className="font-semibold text-foreground">Telemedicine</p>
                  <p className="text-xs text-muted-foreground mt-1">Virtual consultations</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm card-hover cursor-pointer btn-press" onClick={onAnalyticsDashboard}>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <BarChart3 className="w-6 h-6 text-white" />
                  </div>
                  <p className="font-semibold text-foreground">Analytics Dashboard</p>
                  <p className="text-xs text-muted-foreground mt-1">Health insights & trends</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Community & Rewards section */}
          <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <h2 className="text-lg font-semibold text-foreground">Community & Rewards</h2>
            <Card
              className="border-0 shadow-sm card-hover cursor-pointer bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-l-4 border-l-purple-500 btn-press"
              onClick={onInteractiveFeatures}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                      <Activity className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Interactive Features</p>
                      <p className="text-sm text-muted-foreground">Games, rewards & community</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Emergency Contact */}
          <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            <h2 className="text-lg font-semibold text-foreground">Emergency</h2>
            <Card className="border-0 shadow-sm bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 border-l-4 border-l-red-500">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                      <Heart className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Emergency Hotline</p>
                      <p className="text-sm text-muted-foreground">24/7 medical assistance</p>
                    </div>
                  </div>
                  <Button size="sm" className="bg-red-500 hover:bg-red-600 text-white btn-press animate-pulse-gentle">
                    Call Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  if (userRole === "doctor") {
    return (
      <div className="min-h-screen bg-background">
        {/* Top Section - Welcome Banner */}
        <div className="bg-card border-b border-border">
          <div className="px-6 py-6 animate-fade-in-up">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-foreground">Welcome, Dr. {userName.split(" ")[0]}</h1>
                <p className="text-muted-foreground mt-1">Ready to help your patients today?</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Button variant="ghost" size="icon" className="relative btn-press" onClick={onNotifications}>
                    <Bell className="w-5 h-5" />
                    <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-red-500 text-white text-xs animate-pulse-gentle">
                      5
                    </Badge>
                  </Button>
                </div>
                <Avatar className="w-10 h-10">
                  <AvatarImage src="/doctor-profile.png" />
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {userName.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 py-6 space-y-6">
          {/* Today's Schedule */}
          <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            <h2 className="text-lg font-semibold text-foreground">Today's Schedule</h2>
            <div className="grid grid-cols-1 gap-3">
              <Card
                className="border-0 shadow-sm card-hover cursor-pointer bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-l-4 border-l-blue-500"
                onClick={onDoctorDashboard}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">8 Appointments Today</p>
                        <p className="text-sm text-muted-foreground">Next: 9:00 AM - John Doe</p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>

              <Card
                className="border-0 shadow-sm card-hover cursor-pointer bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border-l-4 border-l-orange-500"
                onClick={onReportsSharing}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                        <FileText className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">3 Pending Reports</p>
                        <p className="text-sm text-muted-foreground">Review and approve</p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <h2 className="text-lg font-semibold text-foreground">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-4">
              <Card className="border-0 shadow-sm card-hover cursor-pointer btn-press" onClick={onAdvancedAppointments}>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-teal-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <p className="font-semibold text-foreground">Advanced Scheduling</p>
                  <p className="text-xs text-muted-foreground mt-1">Manage all appointments</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm card-hover cursor-pointer btn-press" onClick={onDoctorDashboard}>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-teal-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <p className="font-semibold text-foreground">Doctor Dashboard</p>
                  <p className="text-xs text-muted-foreground mt-1">Manage patients & schedule</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm card-hover cursor-pointer btn-press" onClick={onPatientManagement}>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <p className="font-semibold text-foreground">Patient Records</p>
                  <p className="text-xs text-muted-foreground mt-1">Access medical files</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm card-hover cursor-pointer btn-press" onClick={onReportsSharing}>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <p className="font-semibold text-foreground">Medical Records System</p>
                  <p className="text-xs text-muted-foreground mt-1">Complete patient management</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm card-hover cursor-pointer btn-press" onClick={onBloodDonation}>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Droplets className="w-6 h-6 text-white" />
                  </div>
                  <p className="font-semibold text-foreground">Blood Requests</p>
                  <p className="text-xs text-muted-foreground mt-1">Manage donations</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm card-hover cursor-pointer btn-press" onClick={onHealthTips}>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <p className="font-semibold text-foreground">Health Resources</p>
                  <p className="text-xs text-muted-foreground mt-1">Educational content</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm card-hover cursor-pointer btn-press" onClick={onAnalyticsDashboard}>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <BarChart3 className="w-6 h-6 text-white" />
                  </div>
                  <p className="font-semibold text-foreground">Analytics Dashboard</p>
                  <p className="text-xs text-muted-foreground mt-1">Practice analytics</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (userRole === "hospital") {
    return (
      <div className="min-h-screen bg-background">
        {/* Top Section - Welcome Banner */}
        <div className="bg-card border-b border-border">
          <div className="px-6 py-6 animate-fade-in-up">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-foreground">Welcome, {userName.split(" ")[0]}</h1>
                <p className="text-muted-foreground mt-1">Hospital Management Dashboard</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Button variant="ghost" size="icon" className="relative btn-press" onClick={onNotifications}>
                    <Bell className="w-5 h-5" />
                    <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-red-500 text-white text-xs animate-pulse-gentle">
                      7
                    </Badge>
                  </Button>
                </div>
                <Avatar className="w-10 h-10">
                  <AvatarImage src="/hospital-profile.png" />
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {userName.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 py-6 space-y-6">
          {/* Hospital Overview */}
          <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            <h2 className="text-lg font-semibold text-foreground">Hospital Overview</h2>
            <div className="grid grid-cols-1 gap-3">
              <Card
                className="border-0 shadow-sm card-hover cursor-pointer bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-l-4 border-l-blue-500"
                onClick={onHospitalDashboard}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                        <Activity className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">198/250 Beds Occupied</p>
                        <p className="text-sm text-muted-foreground">79% occupancy rate</p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>

              <Card
                className="border-0 shadow-sm card-hover cursor-pointer bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-l-4 border-l-green-500"
                onClick={onStaffCoordination}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                        <Users className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">95/180 Staff On Duty</p>
                        <p className="text-sm text-muted-foreground">53% utilization</p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm card-hover cursor-pointer bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border-l-4 border-l-orange-500">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">156 Appointments Today</p>
                        <p className="text-sm text-muted-foreground">23 emergency cases</p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Management Actions */}
          <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <h2 className="text-lg font-semibold text-foreground">Management Actions</h2>
            <div className="grid grid-cols-2 gap-4">
              <Card className="border-0 shadow-sm card-hover cursor-pointer btn-press" onClick={onAdvancedAppointments}>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <p className="font-semibold text-foreground">Appointment System</p>
                  <p className="text-xs text-muted-foreground mt-1">Hospital-wide scheduling</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm card-hover cursor-pointer btn-press" onClick={onHospitalDashboard}>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-teal-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Activity className="w-6 h-6 text-white" />
                  </div>
                  <p className="font-semibold text-foreground">Hospital Dashboard</p>
                  <p className="text-xs text-muted-foreground mt-1">Overview & analytics</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm card-hover cursor-pointer btn-press" onClick={onStaffCoordination}>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <p className="font-semibold text-foreground">Staff Coordination</p>
                  <p className="text-xs text-muted-foreground mt-1">Schedules & communication</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm card-hover cursor-pointer btn-press" onClick={onReportsSharing}>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <p className="font-semibold text-foreground">Reports & Analytics</p>
                  <p className="text-xs text-muted-foreground mt-1">Performance metrics</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm card-hover cursor-pointer btn-press" onClick={onReportsSharing}>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-indigo-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <p className="font-semibold text-foreground">Medical Records System</p>
                  <p className="text-xs text-muted-foreground mt-1">Hospital-wide records</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm card-hover cursor-pointer btn-press" onClick={onBloodDonation}>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Droplets className="w-6 h-6 text-white" />
                  </div>
                  <p className="font-semibold text-foreground">Blood Bank</p>
                  <p className="text-xs text-muted-foreground mt-1">Inventory & requests</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm card-hover cursor-pointer btn-press" onClick={onAnalyticsDashboard}>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <BarChart3 className="w-6 h-6 text-white" />
                  </div>
                  <p className="font-semibold text-foreground">Analytics Dashboard</p>
                  <p className="text-xs text-muted-foreground mt-1">Hospital intelligence</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Default fallback
  return (
    <div className="min-h-screen bg-background">
      <div className="px-6 py-6">
        <h1 className="text-2xl font-bold text-foreground">Welcome to SihaHub</h1>
        <p className="text-muted-foreground">Please complete your profile setup.</p>
      </div>
    </div>
  )
}
