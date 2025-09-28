"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  Calendar,
  Heart,
  Activity,
  FileText,
  Download,
  Filter,
  CalendarIcon,
  Stethoscope,
  Building2,
  Droplets,
  AlertTriangle,
  CheckCircle,
  Eye,
  Share,
  RefreshCw,
} from "lucide-react"

interface ReportsDashboardProps {
  userName: string
  userRole: string
  onBack: () => void
}

type ReportsScreen = "overview" | "detailed" | "export"

interface HealthMetric {
  name: string
  value: string
  change: string
  trend: "up" | "down" | "stable"
  color: string
}

interface AppointmentStat {
  period: string
  completed: number
  cancelled: number
  pending: number
}

interface BloodDonationStat {
  bloodType: string
  donated: number
  requested: number
  fulfilled: number
}

export default function ReportsDashboard({ userName, userRole, onBack }: ReportsDashboardProps) {
  const [currentScreen, setCurrentScreen] = useState<ReportsScreen>("overview")
  const [selectedTimeRange, setSelectedTimeRange] = useState<"week" | "month" | "quarter" | "year">("month")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  // Mock data for different user roles
  const patientHealthMetrics: HealthMetric[] = [
    {
      name: "Blood Pressure",
      value: "120/80",
      change: "+2%",
      trend: "stable",
      color: "text-green-600",
    },
    {
      name: "Heart Rate",
      value: "72 bpm",
      change: "-5%",
      trend: "down",
      color: "text-blue-600",
    },
    {
      name: "Weight",
      value: "75 kg",
      change: "-2%",
      trend: "down",
      color: "text-green-600",
    },
    {
      name: "BMI",
      value: "24.2",
      change: "-1%",
      trend: "down",
      color: "text-green-600",
    },
  ]

  const appointmentStats: AppointmentStat[] = [
    { period: "This Week", completed: 12, cancelled: 2, pending: 5 },
    { period: "This Month", completed: 45, cancelled: 8, pending: 12 },
    { period: "This Quarter", completed: 134, cancelled: 23, pending: 18 },
    { period: "This Year", completed: 456, cancelled: 67, pending: 34 },
  ]

  const bloodDonationStats: BloodDonationStat[] = [
    { bloodType: "O+", donated: 45, requested: 52, fulfilled: 87 },
    { bloodType: "A+", donated: 38, requested: 41, fulfilled: 93 },
    { bloodType: "B+", donated: 29, requested: 35, fulfilled: 83 },
    { bloodType: "AB+", donated: 15, requested: 18, fulfilled: 83 },
    { bloodType: "O-", donated: 23, requested: 31, fulfilled: 74 },
    { bloodType: "A-", donated: 18, requested: 22, fulfilled: 82 },
    { bloodType: "B-", donated: 12, requested: 16, fulfilled: 75 },
    { bloodType: "AB-", donated: 8, requested: 11, fulfilled: 73 },
  ]

  const timeRanges = [
    { key: "week", label: "This Week" },
    { key: "month", label: "This Month" },
    { key: "quarter", label: "This Quarter" },
    { key: "year", label: "This Year" },
  ]

  const handleExportReport = () => {
    alert("Report exported successfully! Check your downloads folder.")
  }

  const handleShareReport = () => {
    alert("Report sharing link copied to clipboard!")
  }

  const renderPatientReports = () => (
    <div className="space-y-6">
      {/* Health Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {patientHealthMetrics.map((metric, index) => (
          <Card key={index} className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{metric.name}</p>
                  <p className="text-2xl font-bold text-foreground">{metric.value}</p>
                </div>
                <div className={`flex items-center space-x-1 ${metric.color}`}>
                  {metric.trend === "up" && <TrendingUp className="w-4 h-4" />}
                  {metric.trend === "down" && <TrendingDown className="w-4 h-4" />}
                  {metric.trend === "stable" && <Activity className="w-4 h-4" />}
                  <span className="text-sm font-medium">{metric.change}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Health Trends Chart */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="w-5 h-5 text-teal-500" />
            <span>Health Trends</span>
          </CardTitle>
          <CardDescription>Your health metrics over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="w-full h-64 bg-muted rounded-lg flex items-center justify-center">
            <div className="text-center">
              <BarChart3 className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-lg font-semibold text-foreground mb-2">Interactive Health Chart</p>
              <p className="text-sm text-muted-foreground max-w-sm">
                Visual representation of your health metrics including blood pressure, heart rate, weight, and BMI
                trends over the selected time period.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Appointment History */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-blue-500" />
            <span>Appointment Summary</span>
          </CardTitle>
          <CardDescription>Your appointment statistics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {appointmentStats.map((stat, index) => (
              <div key={index} className="bg-muted/50 rounded-lg p-4">
                <h4 className="font-semibold text-foreground mb-3">{stat.period}</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Completed</span>
                    <Badge className="bg-green-100 text-green-700">{stat.completed}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Pending</span>
                    <Badge className="bg-orange-100 text-orange-700">{stat.pending}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Cancelled</span>
                    <Badge className="bg-red-100 text-red-700">{stat.cancelled}</Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Blood Donation History */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Heart className="w-5 h-5 text-red-500" />
            <span>Blood Donation Impact</span>
          </CardTitle>
          <CardDescription>Your contribution to saving lives</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <p className="text-3xl font-bold text-foreground">12</p>
              <p className="text-sm text-muted-foreground">Total Donations</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="w-8 h-8 text-white" />
              </div>
              <p className="text-3xl font-bold text-foreground">36</p>
              <p className="text-sm text-muted-foreground">Lives Saved</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <Droplets className="w-8 h-8 text-white" />
              </div>
              <p className="text-3xl font-bold text-foreground">O+</p>
              <p className="text-sm text-muted-foreground">Blood Type</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderDoctorReports = () => (
    <div className="space-y-6">
      {/* Doctor Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Patients Treated</p>
                <p className="text-2xl font-bold text-foreground">127</p>
              </div>
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Appointments</p>
                <p className="text-2xl font-bold text-foreground">89</p>
              </div>
              <div className="w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center">
                <Calendar className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Patient Rating</p>
                <p className="text-2xl font-bold text-foreground">4.8</p>
              </div>
              <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center">
                <Activity className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Success Rate</p>
                <p className="text-2xl font-bold text-foreground">96%</p>
              </div>
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Patient Demographics */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="w-5 h-5 text-blue-500" />
            <span>Patient Demographics</span>
          </CardTitle>
          <CardDescription>Breakdown of your patient base</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="w-full h-64 bg-muted rounded-lg flex items-center justify-center">
            <div className="text-center">
              <BarChart3 className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-lg font-semibold text-foreground mb-2">Patient Demographics Chart</p>
              <p className="text-sm text-muted-foreground max-w-sm">
                Age groups, gender distribution, and common conditions among your patients.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Activity className="w-5 h-5 text-teal-500" />
            <span>Recent Activity</span>
          </CardTitle>
          <CardDescription>Your latest patient interactions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { patient: "John Doe", action: "Consultation completed", time: "2 hours ago", status: "completed" },
              { patient: "Sarah Johnson", action: "Lab results reviewed", time: "4 hours ago", status: "completed" },
              { patient: "Michael Brown", action: "Follow-up scheduled", time: "1 day ago", status: "scheduled" },
              { patient: "Emily Davis", action: "Prescription updated", time: "2 days ago", status: "completed" },
            ].map((activity, index) => (
              <div key={index} className="flex items-center space-x-4 p-3 bg-muted/50 rounded-lg">
                <div className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center">
                  <Stethoscope className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-foreground">{activity.patient}</p>
                  <p className="text-sm text-muted-foreground">{activity.action}</p>
                </div>
                <div className="text-right">
                  <Badge
                    className={
                      activity.status === "completed" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
                    }
                  >
                    {activity.status}
                  </Badge>
                  <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderHospitalReports = () => (
    <div className="space-y-6">
      {/* Hospital KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Bed Occupancy</p>
                <p className="text-2xl font-bold text-foreground">79%</p>
              </div>
              <div className="flex items-center space-x-1 text-orange-600">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm font-medium">+5%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Staff Utilization</p>
                <p className="text-2xl font-bold text-foreground">85%</p>
              </div>
              <div className="flex items-center space-x-1 text-green-600">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm font-medium">+2%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Patient Satisfaction</p>
                <p className="text-2xl font-bold text-foreground">4.6</p>
              </div>
              <div className="flex items-center space-x-1 text-green-600">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm font-medium">+0.3</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Revenue</p>
                <p className="text-2xl font-bold text-foreground">$2.4M</p>
              </div>
              <div className="flex items-center space-x-1 text-green-600">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm font-medium">+12%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Blood Bank Status */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Droplets className="w-5 h-5 text-red-500" />
            <span>Blood Bank Analytics</span>
          </CardTitle>
          <CardDescription>Blood inventory and donation statistics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {bloodDonationStats.map((stat, index) => (
              <div key={index} className="bg-muted/50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-foreground">{stat.bloodType}</h4>
                  <Badge
                    className={
                      stat.fulfilled >= 80
                        ? "bg-green-100 text-green-700"
                        : stat.fulfilled >= 70
                          ? "bg-orange-100 text-orange-700"
                          : "bg-red-100 text-red-700"
                    }
                  >
                    {stat.fulfilled}%
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Donated</span>
                    <span className="text-sm font-medium text-foreground">{stat.donated}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Requested</span>
                    <span className="text-sm font-medium text-foreground">{stat.requested}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Department Performance */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Building2 className="w-5 h-5 text-blue-500" />
            <span>Department Performance</span>
          </CardTitle>
          <CardDescription>Performance metrics by department</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { dept: "Emergency", patients: 245, satisfaction: 4.2, efficiency: 87 },
              { dept: "Cardiology", patients: 156, satisfaction: 4.8, efficiency: 94 },
              { dept: "Pediatrics", patients: 189, satisfaction: 4.6, efficiency: 91 },
              { dept: "Orthopedics", patients: 134, satisfaction: 4.4, efficiency: 89 },
            ].map((dept, index) => (
              <div key={index} className="flex items-center space-x-4 p-4 bg-muted/50 rounded-lg">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground">{dept.dept}</h4>
                  <p className="text-sm text-muted-foreground">{dept.patients} patients treated</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-4">
                    <div>
                      <p className="text-sm font-medium text-foreground">{dept.satisfaction}</p>
                      <p className="text-xs text-muted-foreground">Satisfaction</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{dept.efficiency}%</p>
                      <p className="text-xs text-muted-foreground">Efficiency</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Critical Alerts */}
      <Card className="border-0 shadow-sm bg-red-50 border-l-4 border-l-red-500">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-red-500" />
            <span>Critical Alerts</span>
          </CardTitle>
          <CardDescription>Issues requiring immediate attention</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-3 bg-red-100 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              <div className="flex-1">
                <p className="font-semibold text-red-900">ICU Bed Shortage</p>
                <p className="text-sm text-red-700">Only 2 ICU beds available</p>
              </div>
              <Badge className="bg-red-500 text-white">URGENT</Badge>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-orange-100 rounded-lg">
              <Users className="w-5 h-5 text-orange-600" />
              <div className="flex-1">
                <p className="font-semibold text-orange-900">Staff Shortage - Night Shift</p>
                <p className="text-sm text-orange-700">Need 3 more nurses</p>
              </div>
              <Badge className="bg-orange-500 text-white">HIGH</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  // Overview Screen
  if (currentScreen === "overview") {
    return (
      <div className="min-h-screen bg-neutral">
        {/* Header */}
        <div className="bg-card border-b border-border sticky top-0 z-10">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Button variant="ghost" size="icon" onClick={onBack}>
                  <ArrowLeft className="w-5 h-5" />
                </Button>
                <div>
                  <h1 className="text-xl font-bold text-foreground">Reports & Analytics</h1>
                  <p className="text-sm text-muted-foreground">
                    {userRole === "patient"
                      ? "Your health insights"
                      : userRole === "doctor"
                        ? "Practice analytics"
                        : "Hospital performance metrics"}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="icon" onClick={() => window.location.reload()}>
                  <RefreshCw className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon" onClick={handleShareReport}>
                  <Share className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon" onClick={handleExportReport}>
                  <Download className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 py-6 space-y-6">
          {/* Time Range Filter */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <CalendarIcon className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">Time Range:</span>
            </div>
            <div className="flex items-center space-x-2">
              {timeRanges.map((range) => (
                <Button
                  key={range.key}
                  variant={selectedTimeRange === range.key ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedTimeRange(range.key as any)}
                  className={selectedTimeRange === range.key ? "bg-teal-500 hover:bg-teal-600" : ""}
                >
                  {range.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card
              className="border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => setCurrentScreen("detailed")}
            >
              <CardContent className="p-4 text-center">
                <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Eye className="w-6 h-6 text-white" />
                </div>
                <p className="font-semibold text-foreground">Detailed View</p>
                <p className="text-xs text-muted-foreground mt-1">In-depth analysis</p>
              </CardContent>
            </Card>

            <Card
              className="border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              onClick={handleExportReport}
            >
              <CardContent className="p-4 text-center">
                <div className="w-12 h-12 bg-teal-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Download className="w-6 h-6 text-white" />
                </div>
                <p className="font-semibold text-foreground">Export Data</p>
                <p className="text-xs text-muted-foreground mt-1">Download reports</p>
              </CardContent>
            </Card>

            <Card
              className="border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              onClick={handleShareReport}
            >
              <CardContent className="p-4 text-center">
                <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Share className="w-6 h-6 text-white" />
                </div>
                <p className="font-semibold text-foreground">Share Report</p>
                <p className="text-xs text-muted-foreground mt-1">Send to others</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4 text-center">
                <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Filter className="w-6 h-6 text-white" />
                </div>
                <p className="font-semibold text-foreground">Custom Filter</p>
                <p className="text-xs text-muted-foreground mt-1">Advanced options</p>
              </CardContent>
            </Card>
          </div>

          {/* Role-specific Reports */}
          {userRole === "patient" && renderPatientReports()}
          {userRole === "doctor" && renderDoctorReports()}
          {userRole === "hospital" && renderHospitalReports()}
        </div>
      </div>
    )
  }

  // Detailed Reports Screen
  if (currentScreen === "detailed") {
    return (
      <div className="min-h-screen bg-neutral">
        {/* Header */}
        <div className="bg-card border-b border-border sticky top-0 z-10">
          <div className="px-6 py-4">
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="icon" onClick={() => setCurrentScreen("overview")}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-xl font-bold text-foreground">Detailed Analytics</h1>
                <p className="text-sm text-muted-foreground">Comprehensive data analysis</p>
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 py-6 space-y-6">
          {/* Detailed Charts Placeholder */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Advanced Analytics Dashboard</CardTitle>
              <CardDescription>Interactive charts and detailed metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="w-full h-96 bg-muted rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <BarChart3 className="w-20 h-20 text-muted-foreground mx-auto mb-4" />
                  <p className="text-xl font-semibold text-foreground mb-2">Advanced Analytics</p>
                  <p className="text-sm text-muted-foreground max-w-md">
                    Interactive charts, trend analysis, predictive insights, and detailed breakdowns of all metrics with
                    drill-down capabilities.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Data Tables */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Data Tables</CardTitle>
              <CardDescription>Sortable and filterable data views</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="w-full h-64 bg-muted rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-lg font-semibold text-foreground mb-2">Detailed Data Tables</p>
                  <p className="text-sm text-muted-foreground max-w-sm">
                    Comprehensive data tables with sorting, filtering, and export capabilities.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return null
}
