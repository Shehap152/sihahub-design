"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Calendar,
  Heart,
  FileText,
  Bell,
  TrendingUp,
  Activity,
  Clock,
  AlertCircle,
  CheckCircle,
  ArrowRight,
  BookOpen,
  Users,
  Video,
  BarChart3,
  Droplets,
  Stethoscope,
  Building2,
} from "lucide-react"

interface WebHomeDashboardProps {
  userName: string
  userRole: string
  onSectionChange: (section: string) => void
}

export default function WebHomeDashboard({ userName, userRole, onSectionChange }: WebHomeDashboardProps) {
  const currentTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  if (userRole === "patient") {
    return (
      <div className="space-y-6 animate-fade-in-up">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-primary to-accent rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Welcome back, {userName.split(" ")[0]}!</h1>
              <p className="text-primary-foreground/90 text-lg">
                {currentDate} • {currentTime}
              </p>
              <p className="text-primary-foreground/80 mt-1 capitalize">Patient Dashboard</p>
            </div>
            <div className="hidden md:block">
              <Stethoscope className="h-20 w-20 text-primary-foreground/30" />
            </div>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="hover-lift">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Next Appointment</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Today</div>
              <p className="text-xs text-muted-foreground">Dr. Sarah Wilson • 2:30 PM</p>
              <Button size="sm" className="mt-3 w-full" onClick={() => onSectionChange("appointment-booking")}>
                View Details
              </Button>
            </CardContent>
          </Card>

          <Card className="hover-lift">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Health Score</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">85%</div>
              <Progress value={85} className="mt-2" />
              <p className="text-xs text-muted-foreground mt-2">+5% from last month</p>
            </CardContent>
          </Card>

          <Card className="hover-lift">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Blood Requests</CardTitle>
              <Heart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">Active requests nearby</p>
              <Button
                size="sm"
                variant="outline"
                className="mt-3 w-full bg-transparent"
                onClick={() => onSectionChange("blood-donation")}
              >
                View Requests
              </Button>
            </CardContent>
          </Card>

          <Card className="hover-lift">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Notifications</CardTitle>
              <Bell className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">7</div>
              <p className="text-xs text-muted-foreground">2 urgent, 5 general</p>
              <Button
                size="sm"
                variant="outline"
                className="mt-3 w-full bg-transparent"
                onClick={() => onSectionChange("notifications")}
              >
                View All
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Recent Activity
              </CardTitle>
              <CardDescription>Your latest healthcare interactions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div className="flex-1">
                  <p className="font-medium">Lab Results Available</p>
                  <p className="text-sm text-muted-foreground">Blood work from Dr. Wilson</p>
                </div>
                <Badge variant="secondary">2h ago</Badge>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <Calendar className="h-5 w-5 text-blue-600" />
                <div className="flex-1">
                  <p className="font-medium">Appointment Confirmed</p>
                  <p className="text-sm text-muted-foreground">Follow-up with Dr. Sarah Wilson</p>
                </div>
                <Badge variant="secondary">1d ago</Badge>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <Heart className="h-5 w-5 text-red-600" />
                <div className="flex-1">
                  <p className="font-medium">Blood Donation Reminder</p>
                  <p className="text-sm text-muted-foreground">You're eligible to donate again</p>
                </div>
                <Badge variant="secondary">3d ago</Badge>
              </div>

              <Button
                variant="outline"
                className="w-full bg-transparent"
                onClick={() => onSectionChange("medical-record")}
              >
                View Full History
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks and shortcuts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                className="w-full justify-start bg-transparent"
                variant="outline"
                onClick={() => onSectionChange("appointment-booking")}
              >
                <Calendar className="mr-2 h-4 w-4" />
                Book Appointment
              </Button>

              <Button
                className="w-full justify-start bg-transparent"
                variant="outline"
                onClick={() => onSectionChange("medical-record")}
              >
                <FileText className="mr-2 h-4 w-4" />
                View Medical Records
              </Button>

              <Button
                className="w-full justify-start bg-transparent"
                variant="outline"
                onClick={() => onSectionChange("blood-donation")}
              >
                <Heart className="mr-2 h-4 w-4" />
                Blood Donation
              </Button>

              <Button
                className="w-full justify-start bg-transparent"
                variant="outline"
                onClick={() => onSectionChange("health-tips")}
              >
                <BookOpen className="mr-2 h-4 w-4" />
                Health Tips
              </Button>

              <div className="pt-4 border-t">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <AlertCircle className="h-4 w-4" />
                  Health Reminders
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Annual Checkup</span>
                    <Badge variant="outline" className="text-xs">
                      Due Soon
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Flu Vaccination</span>
                    <Badge variant="destructive" className="text-xs">
                      Overdue
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Health Tips Preview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Today's Health Tip
              </span>
              <Button variant="ghost" size="sm" onClick={() => onSectionChange("health-tips")}>
                View All Tips
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gradient-to-r from-blue-50 to-teal-50 dark:from-blue-950/20 dark:to-teal-950/20 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Stay Hydrated for Better Health</h3>
              <p className="text-sm text-muted-foreground">
                Drinking adequate water helps maintain body temperature, lubricates joints, and supports organ function.
                Aim for 8 glasses of water daily, and increase intake during exercise or hot weather.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (userRole === "doctor") {
    return (
      <div className="space-y-6 animate-fade-in-up">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-primary to-accent rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Welcome, Dr. {userName.split(" ")[0]}!</h1>
              <p className="text-primary-foreground/90 text-lg">
                {currentDate} • {currentTime}
              </p>
              <p className="text-primary-foreground/80 mt-1">Doctor Dashboard</p>
            </div>
            <div className="hidden md:block">
              <Stethoscope className="h-20 w-20 text-primary-foreground/30" />
            </div>
          </div>
        </div>

        {/* Doctor Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="hover-lift">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Appointments</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">Next: 9:00 AM - John Doe</p>
              <Button size="sm" className="mt-3 w-full" onClick={() => onSectionChange("appointment-booking")}>
                View Schedule
              </Button>
            </CardContent>
          </Card>

          <Card className="hover-lift">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Reports</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">Awaiting review</p>
              <Button
                size="sm"
                variant="outline"
                className="mt-3 w-full bg-transparent"
                onClick={() => onSectionChange("reports")}
              >
                Review Reports
              </Button>
            </CardContent>
          </Card>

          <Card className="hover-lift">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Patients</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">127</div>
              <p className="text-xs text-muted-foreground">Under your care</p>
              <Button
                size="sm"
                variant="outline"
                className="mt-3 w-full bg-transparent"
                onClick={() => onSectionChange("medical-record")}
              >
                View Patients
              </Button>
            </CardContent>
          </Card>

          <Card className="hover-lift">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Notifications</CardTitle>
              <Bell className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-muted-foreground">1 urgent, 4 general</p>
              <Button
                size="sm"
                variant="outline"
                className="mt-3 w-full bg-transparent"
                onClick={() => onSectionChange("notifications")}
              >
                View All
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Doctor Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Today's Schedule
              </CardTitle>
              <CardDescription>Your upcoming appointments and tasks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <Calendar className="h-5 w-5 text-blue-600" />
                <div className="flex-1">
                  <p className="font-medium">9:00 AM - John Doe</p>
                  <p className="text-sm text-muted-foreground">Annual checkup</p>
                </div>
                <Badge>In 30 min</Badge>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <Calendar className="h-5 w-5 text-green-600" />
                <div className="flex-1">
                  <p className="font-medium">10:30 AM - Sarah Johnson</p>
                  <p className="text-sm text-muted-foreground">Follow-up consultation</p>
                </div>
                <Badge variant="secondary">Upcoming</Badge>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <Video className="h-5 w-5 text-purple-600" />
                <div className="flex-1">
                  <p className="font-medium">2:00 PM - Michael Brown</p>
                  <p className="text-sm text-muted-foreground">Telemedicine consultation</p>
                </div>
                <Badge variant="outline">Virtual</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common doctor tasks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                className="w-full justify-start bg-transparent"
                variant="outline"
                onClick={() => onSectionChange("medical-record")}
              >
                <FileText className="mr-2 h-4 w-4" />
                Patient Records
              </Button>

              <Button
                className="w-full justify-start bg-transparent"
                variant="outline"
                onClick={() => onSectionChange("appointment-booking")}
              >
                <Calendar className="mr-2 h-4 w-4" />
                Manage Schedule
              </Button>

              <Button
                className="w-full justify-start bg-transparent"
                variant="outline"
                onClick={() => onSectionChange("reports")}
              >
                <BarChart3 className="mr-2 h-4 w-4" />
                View Reports
              </Button>

              <Button
                className="w-full justify-start bg-transparent"
                variant="outline"
                onClick={() => onSectionChange("health-tips")}
              >
                <BookOpen className="mr-2 h-4 w-4" />
                Health Resources
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (userRole === "hospital") {
    return (
      <div className="space-y-6 animate-fade-in-up">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-primary to-accent rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Welcome, {userName.split(" ")[0]}!</h1>
              <p className="text-primary-foreground/90 text-lg">
                {currentDate} • {currentTime}
              </p>
              <p className="text-primary-foreground/80 mt-1">Hospital Management Dashboard</p>
            </div>
            <div className="hidden md:block">
              <Building2 className="h-20 w-20 text-primary-foreground/30" />
            </div>
          </div>
        </div>

        {/* Hospital Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="hover-lift">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Bed Occupancy</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">198/250</div>
              <Progress value={79} className="mt-2" />
              <p className="text-xs text-muted-foreground mt-2">79% occupancy rate</p>
            </CardContent>
          </Card>

          <Card className="hover-lift">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Staff on Duty</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">95/180</div>
              <Progress value={53} className="mt-2" />
              <p className="text-xs text-muted-foreground mt-2">53% utilization</p>
            </CardContent>
          </Card>

          <Card className="hover-lift">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Appointments</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">156</div>
              <p className="text-xs text-muted-foreground">23 emergency cases</p>
              <Button size="sm" className="mt-3 w-full" onClick={() => onSectionChange("appointment-booking")}>
                View Schedule
              </Button>
            </CardContent>
          </Card>

          <Card className="hover-lift">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Blood Bank</CardTitle>
              <Droplets className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">85%</div>
              <p className="text-xs text-muted-foreground">Stock level</p>
              <Button
                size="sm"
                variant="outline"
                className="mt-3 w-full bg-transparent"
                onClick={() => onSectionChange("blood-donation")}
              >
                Manage Stock
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Hospital Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                Critical Alerts
              </CardTitle>
              <CardDescription>Important notifications requiring attention</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800">
                <AlertCircle className="h-5 w-5 text-red-600" />
                <div className="flex-1">
                  <p className="font-medium text-red-900 dark:text-red-100">ICU Bed Shortage</p>
                  <p className="text-sm text-red-700 dark:text-red-300">Only 2 ICU beds available</p>
                </div>
                <Badge variant="destructive">Urgent</Badge>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-lg bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800">
                <Users className="h-5 w-5 text-orange-600" />
                <div className="flex-1">
                  <p className="font-medium text-orange-900 dark:text-orange-100">Staff Shortage - Night Shift</p>
                  <p className="text-sm text-orange-700 dark:text-orange-300">Need 3 more nurses</p>
                </div>
                <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200">
                  High Priority
                </Badge>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800">
                <Droplets className="h-5 w-5 text-blue-600" />
                <div className="flex-1">
                  <p className="font-medium text-blue-900 dark:text-blue-100">Blood Type O- Low Stock</p>
                  <p className="text-sm text-blue-700 dark:text-blue-300">Below minimum threshold</p>
                </div>
                <Badge variant="secondary">Medium</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Management Actions</CardTitle>
              <CardDescription>Hospital administration tools</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                className="w-full justify-start bg-transparent"
                variant="outline"
                onClick={() => onSectionChange("reports")}
              >
                <BarChart3 className="mr-2 h-4 w-4" />
                Hospital Analytics
              </Button>

              <Button
                className="w-full justify-start bg-transparent"
                variant="outline"
                onClick={() => onSectionChange("medical-record")}
              >
                <FileText className="mr-2 h-4 w-4" />
                Patient Records
              </Button>

              <Button
                className="w-full justify-start bg-transparent"
                variant="outline"
                onClick={() => onSectionChange("appointment-booking")}
              >
                <Calendar className="mr-2 h-4 w-4" />
                Scheduling System
              </Button>

              <Button
                className="w-full justify-start bg-transparent"
                variant="outline"
                onClick={() => onSectionChange("blood-donation")}
              >
                <Droplets className="mr-2 h-4 w-4" />
                Blood Bank
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // Default fallback
  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="bg-gradient-to-r from-primary to-accent rounded-lg p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">Welcome to SihaHub</h1>
        <p className="text-primary-foreground/90">Please complete your profile setup to continue.</p>
      </div>
    </div>
  )
}
