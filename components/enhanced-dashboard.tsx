"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
  Pill,
  Shield,
  Zap,
  Target,
  Star,
  Award,
  ChevronRight,
  Settings,
  Search,
  Filter,
  Download,
  RefreshCw,
} from "lucide-react"

interface EnhancedDashboardProps {
  userName: string
  userRole: string
  onSectionChange: (section: string) => void
}

export default function EnhancedDashboard({ userName, userRole, onSectionChange }: EnhancedDashboardProps) {
  const currentTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  // Patient Dashboard
  if (userRole === "patient") {
    return (
      <div className="space-y-6 animate-fade-in-up">
        {/* Enhanced Welcome Banner */}
        <div className="bg-gradient-to-r from-primary via-teal-600 to-accent rounded-xl p-6 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-transparent"></div>
          <div className="relative flex items-center justify-between">
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2">Welcome back, {userName.split(" ")[0]}!</h1>
              <p className="text-white/90 text-lg mb-1">{currentDate} • {currentTime}</p>
              <p className="text-white/80 capitalize">Patient Health Dashboard</p>
              <div className="flex items-center gap-4 mt-4">
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                  <Heart className="w-3 h-3 mr-1" />
                  Healthy Status
                </Badge>
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                  <Star className="w-3 h-3 mr-1" />
                  Premium Member
                </Badge>
              </div>
            </div>
            <div className="hidden md:block">
              <Stethoscope className="h-24 w-24 text-white/20" />
            </div>
          </div>
        </div>

        {/* Health Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="hover-lift border-l-4 border-l-green-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Health Score</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">85%</div>
              <Progress value={85} className="mt-2" />
              <p className="text-xs text-muted-foreground mt-2">+5% from last month</p>
            </CardContent>
          </Card>

          <Card className="hover-lift border-l-4 border-l-blue-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Next Appointment</CardTitle>
              <Calendar className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Today</div>
              <p className="text-xs text-muted-foreground">Dr. Sarah Wilson • 2:30 PM</p>
              <Button size="sm" className="mt-3 w-full" onClick={() => onSectionChange("appointment-booking")}>
                View Details
              </Button>
            </CardContent>
          </Card>

          <Card className="hover-lift border-l-4 border-l-red-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Blood Requests</CardTitle>
              <Heart className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">Active requests nearby</p>
              <Button
                size="sm"
                variant="outline"
                className="mt-3 w-full"
                onClick={() => onSectionChange("blood-donation")}
              >
                View Requests
              </Button>
            </CardContent>
          </Card>

          <Card className="hover-lift border-l-4 border-l-orange-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Notifications</CardTitle>
              <Bell className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">7</div>
              <p className="text-xs text-muted-foreground">2 urgent, 5 general</p>
              <Button
                size="sm"
                variant="outline"
                className="mt-3 w-full"
                onClick={() => onSectionChange("notifications")}
              >
                View All
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Recent Activity
                </span>
                <Button variant="ghost" size="sm">
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </CardTitle>
              <CardDescription>Your latest healthcare interactions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div className="flex-1">
                  <p className="font-medium">Lab Results Available</p>
                  <p className="text-sm text-muted-foreground">Blood work from Dr. Wilson</p>
                </div>
                <Badge variant="secondary">2h ago</Badge>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800">
                <Calendar className="h-5 w-5 text-blue-600" />
                <div className="flex-1">
                  <p className="font-medium">Appointment Confirmed</p>
                  <p className="text-sm text-muted-foreground">Follow-up with Dr. Sarah Wilson</p>
                </div>
                <Badge variant="secondary">1d ago</Badge>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800">
                <Heart className="h-5 w-5 text-red-600" />
                <div className="flex-1">
                  <p className="font-medium">Blood Donation Reminder</p>
                  <p className="text-sm text-muted-foreground">You're eligible to donate again</p>
                </div>
                <Badge variant="secondary">3d ago</Badge>
              </div>

              <Button
                variant="outline"
                className="w-full"
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
                className="w-full justify-start"
                variant="outline"
                onClick={() => onSectionChange("appointment-booking")}
              >
                <Calendar className="mr-2 h-4 w-4" />
                Book Appointment
              </Button>

              <Button
                className="w-full justify-start"
                variant="outline"
                onClick={() => onSectionChange("medical-record")}
              >
                <FileText className="mr-2 h-4 w-4" />
                View Medical Records
              </Button>

              <Button
                className="w-full justify-start"
                variant="outline"
                onClick={() => onSectionChange("blood-donation")}
              >
                <Heart className="mr-2 h-4 w-4" />
                Blood Donation
              </Button>

              <Button
                className="w-full justify-start"
                variant="outline"
                onClick={() => onSectionChange("health-tips")}
              >
                <BookOpen className="mr-2 h-4 w-4" />
                Health Tips
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Health Insights & Goals */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Health Goals
              </CardTitle>
              <CardDescription>Track your progress</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Daily Steps</span>
                  <span>8,500 / 10,000</span>
                </div>
                <Progress value={85} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Water Intake</span>
                  <span>6 / 8 glasses</span>
                </div>
                <Progress value={75} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Sleep Hours</span>
                  <span>7.5 / 8 hours</span>
                </div>
                <Progress value={94} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Achievements
              </CardTitle>
              <CardDescription>Your health milestones</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-yellow-50 dark:bg-yellow-950/20">
                <Award className="h-6 w-6 text-yellow-600" />
                <div>
                  <p className="font-medium">Week Streak</p>
                  <p className="text-sm text-muted-foreground">7 days of healthy habits</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-blue-50 dark:bg-blue-950/20">
                <Heart className="h-6 w-6 text-blue-600" />
                <div>
                  <p className="font-medium">Blood Donor</p>
                  <p className="text-sm text-muted-foreground">Saved 3 lives this year</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-green-50 dark:bg-green-950/20">
                <Star className="h-6 w-6 text-green-600" />
                <div>
                  <p className="font-medium">Health Champion</p>
                  <p className="text-sm text-muted-foreground">Completed all checkups</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // Doctor Dashboard
  if (userRole === "doctor") {
    return (
      <div className="space-y-6 animate-fade-in-up">
        {/* Enhanced Welcome Banner */}
        <div className="bg-gradient-to-r from-primary via-teal-600 to-accent rounded-xl p-6 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-transparent"></div>
          <div className="relative flex items-center justify-between">
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2">Welcome, Dr. {userName.split(" ")[0]}!</h1>
              <p className="text-white/90 text-lg mb-1">{currentDate} • {currentTime}</p>
              <p className="text-white/80">Medical Professional Dashboard</p>
              <div className="flex items-center gap-4 mt-4">
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                  <Shield className="w-3 h-3 mr-1" />
                  Licensed
                </Badge>
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                  <Zap className="w-3 h-3 mr-1" />
                  Online
                </Badge>
              </div>
            </div>
            <div className="hidden md:block">
              <Stethoscope className="h-24 w-24 text-white/20" />
            </div>
          </div>
        </div>

        {/* Doctor Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="hover-lift border-l-4 border-l-blue-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Appointments</CardTitle>
              <Calendar className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">Next: 9:00 AM - John Doe</p>
              <Button size="sm" className="mt-3 w-full" onClick={() => onSectionChange("appointment-booking")}>
                View Schedule
              </Button>
            </CardContent>
          </Card>

          <Card className="hover-lift border-l-4 border-l-orange-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Reports</CardTitle>
              <FileText className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">Awaiting review</p>
              <Button
                size="sm"
                variant="outline"
                className="mt-3 w-full"
                onClick={() => onSectionChange("reports")}
              >
                Review Reports
              </Button>
            </CardContent>
          </Card>

          <Card className="hover-lift border-l-4 border-l-green-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Patients</CardTitle>
              <Users className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">127</div>
              <p className="text-xs text-muted-foreground">Under your care</p>
              <Button
                size="sm"
                variant="outline"
                className="mt-3 w-full"
                onClick={() => onSectionChange("medical-record")}
              >
                View Patients
              </Button>
            </CardContent>
          </Card>

          <Card className="hover-lift border-l-4 border-l-purple-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Notifications</CardTitle>
              <Bell className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-muted-foreground">1 urgent, 4 general</p>
              <Button
                size="sm"
                variant="outline"
                className="mt-3 w-full"
                onClick={() => onSectionChange("notifications")}
              >
                View All
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Today's Schedule */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Today's Schedule
                </span>
                <Button variant="ghost" size="sm">
                  <Filter className="h-4 w-4" />
                </Button>
              </CardTitle>
              <CardDescription>Your upcoming appointments and tasks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800">
                <Calendar className="h-5 w-5 text-blue-600" />
                <div className="flex-1">
                  <p className="font-medium">9:00 AM - John Doe</p>
                  <p className="text-sm text-muted-foreground">Annual checkup</p>
                </div>
                <Badge>In 30 min</Badge>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800">
                <Calendar className="h-5 w-5 text-green-600" />
                <div className="flex-1">
                  <p className="font-medium">10:30 AM - Sarah Johnson</p>
                  <p className="text-sm text-muted-foreground">Follow-up consultation</p>
                </div>
                <Badge variant="secondary">Upcoming</Badge>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-lg bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800">
                <Video className="h-5 w-5 text-purple-600" />
                <div className="flex-1">
                  <p className="font-medium">2:00 PM - Michael Brown</p>
                  <p className="text-sm text-muted-foreground">Telemedicine consultation</p>
                </div>
                <Badge variant="outline">Virtual</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common doctor tasks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                className="w-full justify-start"
                variant="outline"
                onClick={() => onSectionChange("medical-record")}
              >
                <FileText className="mr-2 h-4 w-4" />
                Patient Records
              </Button>

              <Button
                className="w-full justify-start"
                variant="outline"
                onClick={() => onSectionChange("appointment-booking")}
              >
                <Calendar className="mr-2 h-4 w-4" />
                Manage Schedule
              </Button>

              <Button
                className="w-full justify-start"
                variant="outline"
                onClick={() => onSectionChange("reports")}
              >
                <BarChart3 className="mr-2 h-4 w-4" />
                View Reports
              </Button>

              <Button
                className="w-full justify-start"
                variant="outline"
                onClick={() => onSectionChange("health-tips")}
              >
                <BookOpen className="mr-2 h-4 w-4" />
                Health Resources
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Weekly Performance
              </CardTitle>
              <CardDescription>Your practice metrics</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Patients Seen</span>
                  <span>45 / 50</span>
                </div>
                <Progress value={90} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Reports Completed</span>
                  <span>38 / 40</span>
                </div>
                <Progress value={95} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Patient Satisfaction</span>
                  <span>4.8 / 5.0</span>
                </div>
                <Progress value={96} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Professional Achievements
              </CardTitle>
              <CardDescription>Your career milestones</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-yellow-50 dark:bg-yellow-950/20">
                <Award className="h-6 w-6 text-yellow-600" />
                <div>
                  <p className="font-medium">Top Performer</p>
                  <p className="text-sm text-muted-foreground">Highest patient satisfaction this month</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-blue-50 dark:bg-blue-950/20">
                <Star className="h-6 w-6 text-blue-600" />
                <div>
                  <p className="font-medium">5-Star Rating</p>
                  <p className="text-sm text-muted-foreground">Maintained for 6 months</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-green-50 dark:bg-green-950/20">
                <Heart className="h-6 w-6 text-green-600" />
                <div>
                  <p className="font-medium">Patient Care Excellence</p>
                  <p className="text-sm text-muted-foreground">Recognized by hospital administration</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // Hospital Dashboard
  if (userRole === "hospital") {
    return (
      <div className="space-y-6 animate-fade-in-up">
        {/* Enhanced Welcome Banner */}
        <div className="bg-gradient-to-r from-primary via-teal-600 to-accent rounded-xl p-6 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-transparent"></div>
          <div className="relative flex items-center justify-between">
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2">Welcome, {userName.split(" ")[0]}!</h1>
              <p className="text-white/90 text-lg mb-1">{currentDate} • {currentTime}</p>
              <p className="text-white/80">Hospital Management Dashboard</p>
              <div className="flex items-center gap-4 mt-4">
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                  <Building2 className="w-3 h-3 mr-1" />
                  Level 1 Trauma
                </Badge>
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                  <Shield className="w-3 h-3 mr-1" />
                  Accredited
                </Badge>
              </div>
            </div>
            <div className="hidden md:block">
              <Building2 className="h-24 w-24 text-white/20" />
            </div>
          </div>
        </div>

        {/* Hospital Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="hover-lift border-l-4 border-l-blue-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Bed Occupancy</CardTitle>
              <Activity className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">198/250</div>
              <Progress value={79} className="mt-2" />
              <p className="text-xs text-muted-foreground mt-2">79% occupancy rate</p>
            </CardContent>
          </Card>

          <Card className="hover-lift border-l-4 border-l-green-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Staff on Duty</CardTitle>
              <Users className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">95/180</div>
              <Progress value={53} className="mt-2" />
              <p className="text-xs text-muted-foreground mt-2">53% utilization</p>
            </CardContent>
          </Card>

          <Card className="hover-lift border-l-4 border-l-orange-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Appointments</CardTitle>
              <Calendar className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">156</div>
              <p className="text-xs text-muted-foreground">23 emergency cases</p>
              <Button size="sm" className="mt-3 w-full" onClick={() => onSectionChange("appointment-booking")}>
                View Schedule
              </Button>
            </CardContent>
          </Card>

          <Card className="hover-lift border-l-4 border-l-red-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Blood Bank</CardTitle>
              <Droplets className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">85%</div>
              <p className="text-xs text-muted-foreground">Stock level</p>
              <Button
                size="sm"
                variant="outline"
                className="mt-3 w-full"
                onClick={() => onSectionChange("blood-donation")}
              >
                Manage Stock
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Critical Alerts */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5" />
                  Critical Alerts
                </span>
                <Button variant="ghost" size="sm">
                  <Download className="h-4 w-4" />
                </Button>
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

          {/* Management Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Management Actions</CardTitle>
              <CardDescription>Hospital administration tools</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                className="w-full justify-start"
                variant="outline"
                onClick={() => onSectionChange("reports")}
              >
                <BarChart3 className="mr-2 h-4 w-4" />
                Hospital Analytics
              </Button>

              <Button
                className="w-full justify-start"
                variant="outline"
                onClick={() => onSectionChange("medical-record")}
              >
                <FileText className="mr-2 h-4 w-4" />
                Patient Records
              </Button>

              <Button
                className="w-full justify-start"
                variant="outline"
                onClick={() => onSectionChange("appointment-booking")}
              >
                <Calendar className="mr-2 h-4 w-4" />
                Scheduling System
              </Button>

              <Button
                className="w-full justify-start"
                variant="outline"
                onClick={() => onSectionChange("blood-donation")}
              >
                <Droplets className="mr-2 h-4 w-4" />
                Blood Bank
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Hospital Performance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Monthly Performance
              </CardTitle>
              <CardDescription>Key hospital metrics</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Patient Satisfaction</span>
                  <span>4.6 / 5.0</span>
                </div>
                <Progress value={92} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Bed Utilization</span>
                  <span>79%</span>
                </div>
                <Progress value={79} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Staff Efficiency</span>
                  <span>87%</span>
                </div>
                <Progress value={87} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Hospital Achievements
              </CardTitle>
              <CardDescription>Recognition and milestones</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-yellow-50 dark:bg-yellow-950/20">
                <Award className="h-6 w-6 text-yellow-600" />
                <div>
                  <p className="font-medium">Quality Excellence Award</p>
                  <p className="text-sm text-muted-foreground">Best patient care in region</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-blue-50 dark:bg-blue-950/20">
                <Star className="h-6 w-6 text-blue-600" />
                <div>
                  <p className="font-medium">5-Star Rating</p>
                  <p className="text-sm text-muted-foreground">Maintained for 2 years</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-green-50 dark:bg-green-950/20">
                <Heart className="h-6 w-6 text-green-600" />
                <div>
                  <p className="font-medium">Safety Excellence</p>
                  <p className="text-sm text-muted-foreground">Zero incidents this quarter</p>
                </div>
              </div>
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
