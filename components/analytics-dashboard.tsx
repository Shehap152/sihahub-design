"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  Calendar,
  Activity,
  Heart,
  FileText,
  Clock,
  DollarSign,
  Target,
  Award,
  AlertTriangle,
  CheckCircle,
  Download,
  Filter,
  ChevronRight,
  Plus,
  Eye,
  RefreshCw,
  Settings,
  PieChart,
  LineChart,
  BarChart,
  Zap,
  Star,
  ThumbsUp,
  Pill,
  Building,
  UserCheck,
} from "lucide-react"

interface AnalyticsDashboardProps {
  userRole: "patient" | "doctor" | "hospital"
  userName: string
  onBack: () => void
}

interface MetricCard {
  title: string
  value: string | number
  change: number
  changeType: "increase" | "decrease" | "neutral"
  icon: React.ComponentType<any>
  color: string
  description?: string
}

interface ChartData {
  name: string
  value: number
  color?: string
}

const mockPatientMetrics: MetricCard[] = [
  {
    title: "Health Score",
    value: 85,
    change: 5,
    changeType: "increase",
    icon: Heart,
    color: "text-red-500",
    description: "Overall health improvement",
  },
  {
    title: "Appointments",
    value: 12,
    change: 2,
    changeType: "increase",
    icon: Calendar,
    color: "text-blue-500",
    description: "This month",
  },
  {
    title: "Medication Adherence",
    value: "92%",
    change: 3,
    changeType: "increase",
    icon: Pill,
    color: "text-green-500",
    description: "Compliance rate",
  },
  {
    title: "Avg Response Time",
    value: "2.3h",
    change: -15,
    changeType: "decrease",
    icon: Clock,
    color: "text-orange-500",
    description: "Doctor response time",
  },
]

const mockDoctorMetrics: MetricCard[] = [
  {
    title: "Total Patients",
    value: 247,
    change: 12,
    changeType: "increase",
    icon: Users,
    color: "text-blue-500",
    description: "Active patients",
  },
  {
    title: "Appointments Today",
    value: 18,
    change: 3,
    changeType: "increase",
    icon: Calendar,
    color: "text-green-500",
    description: "Scheduled consultations",
  },
  {
    title: "Patient Satisfaction",
    value: "4.8",
    change: 0.2,
    changeType: "increase",
    icon: Star,
    color: "text-yellow-500",
    description: "Average rating",
  },
  {
    title: "Revenue This Month",
    value: "$12,450",
    change: 8,
    changeType: "increase",
    icon: DollarSign,
    color: "text-green-600",
    description: "Consultation fees",
  },
]

const mockHospitalMetrics: MetricCard[] = [
  {
    title: "Bed Occupancy",
    value: "79%",
    change: 5,
    changeType: "increase",
    icon: Building,
    color: "text-blue-500",
    description: "198/250 beds occupied",
  },
  {
    title: "Staff Utilization",
    value: "85%",
    change: -2,
    changeType: "decrease",
    icon: UserCheck,
    color: "text-green-500",
    description: "Active staff ratio",
  },
  {
    title: "Patient Satisfaction",
    value: "4.6",
    change: 0.1,
    changeType: "increase",
    icon: ThumbsUp,
    color: "text-yellow-500",
    description: "Hospital rating",
  },
  {
    title: "Monthly Revenue",
    value: "$485K",
    change: 12,
    changeType: "increase",
    icon: DollarSign,
    color: "text-green-600",
    description: "Total hospital revenue",
  },
]

const appointmentTrends: ChartData[] = [
  { name: "Jan", value: 45 },
  { name: "Feb", value: 52 },
  { name: "Mar", value: 48 },
  { name: "Apr", value: 61 },
  { name: "May", value: 55 },
  { name: "Jun", value: 67 },
]

const patientDemographics: ChartData[] = [
  { name: "18-30", value: 25, color: "#3b82f6" },
  { name: "31-45", value: 35, color: "#10b981" },
  { name: "46-60", value: 28, color: "#f59e0b" },
  { name: "60+", value: 12, color: "#ef4444" },
]

const departmentPerformance: ChartData[] = [
  { name: "Cardiology", value: 92 },
  { name: "Neurology", value: 88 },
  { name: "Orthopedics", value: 85 },
  { name: "Pediatrics", value: 94 },
  { name: "Emergency", value: 78 },
]

export default function AnalyticsDashboard({ userRole, userName, onBack }: AnalyticsDashboardProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const [dateRange, setDateRange] = useState("30days")
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null)

  const getMetrics = () => {
    switch (userRole) {
      case "patient":
        return mockPatientMetrics
      case "doctor":
        return mockDoctorMetrics
      case "hospital":
        return mockHospitalMetrics
      default:
        return []
    }
  }

  const getChangeColor = (changeType: "increase" | "decrease" | "neutral") => {
    switch (changeType) {
      case "increase":
        return "text-green-600"
      case "decrease":
        return "text-red-600"
      case "neutral":
        return "text-gray-600"
    }
  }

  const getChangeIcon = (changeType: "increase" | "decrease" | "neutral") => {
    switch (changeType) {
      case "increase":
        return <TrendingUp className="w-4 h-4" />
      case "decrease":
        return <TrendingDown className="w-4 h-4" />
      case "neutral":
        return <Activity className="w-4 h-4" />
    }
  }

  const metrics = getMetrics()

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border sticky top-0 z-10">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" onClick={onBack}>
                <ChevronRight className="w-5 h-5 rotate-180" />
              </Button>
              <div>
                <h1 className="text-xl font-bold text-foreground">Analytics & Reporting</h1>
                <p className="text-sm text-muted-foreground">
                  {userRole === "patient" && "Personal health insights and trends"}
                  {userRole === "doctor" && "Practice performance and patient analytics"}
                  {userRole === "hospital" && "Hospital operations and business intelligence"}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7days">Last 7 Days</SelectItem>
                  <SelectItem value="30days">Last 30 Days</SelectItem>
                  <SelectItem value="90days">Last 90 Days</SelectItem>
                  <SelectItem value="1year">Last Year</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-1" />
                Export
              </Button>
              <Button variant="outline" size="sm">
                <RefreshCw className="w-4 h-4 mr-1" />
                Refresh
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {metrics.map((metric, index) => (
                <Card
                  key={index}
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => setSelectedMetric(metric.title)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 rounded-lg bg-muted/50 flex items-center justify-center`}>
                        <metric.icon className={`w-6 h-6 ${metric.color}`} />
                      </div>
                      <div className={`flex items-center space-x-1 ${getChangeColor(metric.changeType)}`}>
                        {getChangeIcon(metric.changeType)}
                        <span className="text-sm font-medium">
                          {metric.changeType === "increase" ? "+" : ""}
                          {metric.change}
                          {typeof metric.change === "number" && metric.change > 0 && metric.change < 1 ? "" : "%"}
                        </span>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-foreground mb-1">{metric.value}</h3>
                      <p className="text-sm font-medium text-foreground mb-1">{metric.title}</p>
                      {metric.description && <p className="text-xs text-muted-foreground">{metric.description}</p>}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Appointment Trends */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <LineChart className="w-5 h-5" />
                    <span>
                      {userRole === "patient" && "Health Metrics Trend"}
                      {userRole === "doctor" && "Appointment Trends"}
                      {userRole === "hospital" && "Patient Volume Trends"}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center mb-4">
                    <div className="text-center text-muted-foreground">
                      <BarChart3 className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>Interactive chart would be displayed here</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    {appointmentTrends.slice(0, 3).map((item, index) => (
                      <div key={index} className="text-center">
                        <p className="font-semibold text-foreground">{item.value}</p>
                        <p className="text-muted-foreground">{item.name}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Demographics/Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <PieChart className="w-5 h-5" />
                    <span>
                      {userRole === "patient" && "Health Categories"}
                      {userRole === "doctor" && "Patient Demographics"}
                      {userRole === "hospital" && "Department Distribution"}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {patientDemographics.map((item, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-foreground">{item.name}</span>
                          <span className="text-sm text-muted-foreground">{item.value}%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className="h-2 rounded-full"
                            style={{ width: `${item.value}%`, backgroundColor: item.color }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="w-5 h-5" />
                  <span>Recent Activity</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      action:
                        userRole === "patient"
                          ? "Completed appointment with Dr. Sarah Wilson"
                          : userRole === "doctor"
                            ? "Consultation completed with John Doe"
                            : "New patient admission in Cardiology",
                      time: "2 hours ago",
                      type: "appointment",
                      icon: Calendar,
                    },
                    {
                      action:
                        userRole === "patient"
                          ? "Medication reminder: Take morning vitamins"
                          : userRole === "doctor"
                            ? "Lab results reviewed for Jane Smith"
                            : "Staff shift change in Emergency Department",
                      time: "4 hours ago",
                      type: "medication",
                      icon: Pill,
                    },
                    {
                      action:
                        userRole === "patient"
                          ? "Health score updated: +5 points"
                          : userRole === "doctor"
                            ? "New patient registration: Mike Johnson"
                            : "Equipment maintenance completed in OR-3",
                      time: "6 hours ago",
                      type: "health",
                      icon: Heart,
                    },
                  ].map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-muted/50 rounded-lg">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <activity.icon className="w-4 h-4 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-foreground">{activity.action}</p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Performance Tab */}
          <TabsContent value="performance" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Performance Metrics */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Target className="w-5 h-5" />
                    <span>Performance Metrics</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {departmentPerformance.map((dept, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-foreground">{dept.name}</span>
                        <span className="text-sm text-muted-foreground">{dept.value}%</span>
                      </div>
                      <Progress value={dept.value} className="h-2" />
                      <div className="flex items-center space-x-2">
                        {dept.value >= 90 && <CheckCircle className="w-4 h-4 text-green-500" />}
                        {dept.value >= 80 && dept.value < 90 && <AlertTriangle className="w-4 h-4 text-yellow-500" />}
                        {dept.value < 80 && <AlertTriangle className="w-4 h-4 text-red-500" />}
                        <span className="text-xs text-muted-foreground">
                          {dept.value >= 90 ? "Excellent" : dept.value >= 80 ? "Good" : "Needs Improvement"}
                        </span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Goals & Targets */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Award className="w-5 h-5" />
                    <span>Goals & Achievements</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    {
                      goal:
                        userRole === "patient"
                          ? "Maintain 90% medication adherence"
                          : userRole === "doctor"
                            ? "Achieve 4.5+ patient satisfaction"
                            : "Maintain 80%+ bed occupancy",
                      current: userRole === "patient" ? 92 : userRole === "doctor" ? 4.8 : 79,
                      target: userRole === "patient" ? 90 : userRole === "doctor" ? 4.5 : 80,
                      status: "achieved",
                    },
                    {
                      goal:
                        userRole === "patient"
                          ? "Complete 12 health checkups"
                          : userRole === "doctor"
                            ? "See 200+ patients monthly"
                            : "Reduce wait times to <30min",
                      current: userRole === "patient" ? 8 : userRole === "doctor" ? 247 : 25,
                      target: userRole === "patient" ? 12 : userRole === "doctor" ? 200 : 30,
                      status: userRole === "patient" ? "in-progress" : "achieved",
                    },
                    {
                      goal:
                        userRole === "patient"
                          ? "Improve health score to 90"
                          : userRole === "doctor"
                            ? "Reduce response time to <2h"
                            : "Achieve 95% staff satisfaction",
                      current: userRole === "patient" ? 85 : userRole === "doctor" ? 2.3 : 88,
                      target: userRole === "patient" ? 90 : userRole === "doctor" ? 2 : 95,
                      status: "in-progress",
                    },
                  ].map((goal, index) => (
                    <div key={index} className="p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-foreground">{goal.goal}</h4>
                        <Badge
                          className={
                            goal.status === "achieved" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
                          }
                        >
                          {goal.status === "achieved" ? "Achieved" : "In Progress"}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <span>Current: {goal.current}</span>
                        <span>•</span>
                        <span>Target: {goal.target}</span>
                      </div>
                      <Progress value={Math.min((goal.current / goal.target) * 100, 100)} className="h-2 mt-2" />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Performance Comparison */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart className="w-5 h-5" />
                  <span>Performance Comparison</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <BarChart3 className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Comparative performance chart would be displayed here</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Trends Tab */}
          <TabsContent value="trends" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Health Trends */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5" />
                    <span>
                      {userRole === "patient" && "Health Trends"}
                      {userRole === "doctor" && "Practice Trends"}
                      {userRole === "hospital" && "Hospital Trends"}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    {
                      metric:
                        userRole === "patient"
                          ? "Blood Pressure"
                          : userRole === "doctor"
                            ? "Patient Volume"
                            : "Bed Occupancy",
                      trend: "improving",
                      change: "+5.2%",
                      description: "Steady improvement over last 30 days",
                    },
                    {
                      metric:
                        userRole === "patient"
                          ? "Exercise Frequency"
                          : userRole === "doctor"
                            ? "Consultation Duration"
                            : "Staff Efficiency",
                      trend: "stable",
                      change: "+1.1%",
                      description: "Maintaining consistent levels",
                    },
                    {
                      metric:
                        userRole === "patient"
                          ? "Sleep Quality"
                          : userRole === "doctor"
                            ? "Response Time"
                            : "Patient Satisfaction",
                      trend: "declining",
                      change: "-2.3%",
                      description: "Requires attention and improvement",
                    },
                  ].map((trend, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-3 h-3 rounded-full ${
                            trend.trend === "improving"
                              ? "bg-green-500"
                              : trend.trend === "stable"
                                ? "bg-blue-500"
                                : "bg-red-500"
                          }`}
                        ></div>
                        <div>
                          <p className="font-semibold text-foreground">{trend.metric}</p>
                          <p className="text-xs text-muted-foreground">{trend.description}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p
                          className={`font-semibold ${
                            trend.trend === "improving"
                              ? "text-green-600"
                              : trend.trend === "stable"
                                ? "text-blue-600"
                                : "text-red-600"
                          }`}
                        >
                          {trend.change}
                        </p>
                        <p className="text-xs text-muted-foreground capitalize">{trend.trend}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Predictive Analytics */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Zap className="w-5 h-5" />
                    <span>Predictive Insights</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    {
                      prediction:
                        userRole === "patient"
                          ? "Health score likely to reach 90 by next month"
                          : userRole === "doctor"
                            ? "Patient volume expected to increase by 15%"
                            : "Bed occupancy projected to reach 85%",
                      confidence: 87,
                      impact: "positive",
                    },
                    {
                      prediction:
                        userRole === "patient"
                          ? "Medication adherence may drop without reminders"
                          : userRole === "doctor"
                            ? "Response time may increase during peak hours"
                            : "Staff overtime costs may increase by 10%",
                      confidence: 72,
                      impact: "negative",
                    },
                    {
                      prediction:
                        userRole === "patient"
                          ? "Exercise goals achievable with current progress"
                          : userRole === "doctor"
                            ? "Patient satisfaction likely to improve"
                            : "Equipment maintenance due in 2 weeks",
                      confidence: 94,
                      impact: "neutral",
                    },
                  ].map((insight, index) => (
                    <div key={index} className="p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <p className="text-sm text-foreground flex-1">{insight.prediction}</p>
                        <Badge
                          className={
                            insight.impact === "positive"
                              ? "bg-green-100 text-green-800"
                              : insight.impact === "negative"
                                ? "bg-red-100 text-red-800"
                                : "bg-blue-100 text-blue-800"
                          }
                        >
                          {insight.confidence}% confidence
                        </Badge>
                      </div>
                      <Progress value={insight.confidence} className="h-1" />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Trend Analysis Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <LineChart className="w-5 h-5" />
                  <span>Trend Analysis</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80 bg-muted/20 rounded-lg flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <LineChart className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p className="text-lg font-semibold mb-2">Advanced Trend Analysis</p>
                    <p>Interactive multi-metric trend visualization would be displayed here</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">Generated Reports</h2>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-1" />
                  Filter
                </Button>
                <Button size="sm">
                  <Plus className="w-4 h-4 mr-1" />
                  Generate Report
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title:
                    userRole === "patient"
                      ? "Monthly Health Summary"
                      : userRole === "doctor"
                        ? "Practice Performance Report"
                        : "Hospital Operations Report",
                  type: "PDF",
                  date: "2024-01-20",
                  size: "2.4 MB",
                  status: "completed",
                  description:
                    userRole === "patient"
                      ? "Comprehensive health metrics and recommendations"
                      : userRole === "doctor"
                        ? "Patient statistics and revenue analysis"
                        : "Operational metrics and KPI analysis",
                },
                {
                  title:
                    userRole === "patient"
                      ? "Medication Adherence Report"
                      : userRole === "doctor"
                        ? "Patient Satisfaction Analysis"
                        : "Staff Performance Review",
                  type: "Excel",
                  date: "2024-01-18",
                  size: "1.8 MB",
                  status: "completed",
                  description:
                    userRole === "patient"
                      ? "Detailed medication tracking and compliance"
                      : userRole === "doctor"
                        ? "Patient feedback and ratings analysis"
                        : "Staff productivity and satisfaction metrics",
                },
                {
                  title:
                    userRole === "patient"
                      ? "Appointment History"
                      : userRole === "doctor"
                        ? "Financial Summary"
                        : "Department Analytics",
                  type: "PDF",
                  date: "2024-01-15",
                  size: "956 KB",
                  status: "generating",
                  description:
                    userRole === "patient"
                      ? "Complete appointment and consultation history"
                      : userRole === "doctor"
                        ? "Revenue, expenses, and profitability analysis"
                        : "Department-wise performance and utilization",
                },
              ].map((report, index) => (
                <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                        <FileText className="w-6 h-6 text-blue-600" />
                      </div>
                      <Badge
                        className={
                          report.status === "completed"
                            ? "bg-green-100 text-green-800"
                            : "bg-orange-100 text-orange-800"
                        }
                      >
                        {report.status}
                      </Badge>
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">{report.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{report.description}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                      <span>{report.type}</span>
                      <span>{report.size}</span>
                      <span>{report.date}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {report.status === "completed" && (
                        <>
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </Button>
                          <Button size="sm" variant="outline">
                            <Download className="w-4 h-4 mr-1" />
                            Download
                          </Button>
                        </>
                      )}
                      {report.status === "generating" && (
                        <div className="flex items-center space-x-2">
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          <span className="text-sm">Generating...</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Report Templates */}
            <Card>
              <CardHeader>
                <CardTitle>Report Templates</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    {
                      name:
                        userRole === "patient"
                          ? "Health Summary"
                          : userRole === "doctor"
                            ? "Practice Overview"
                            : "Operations Dashboard",
                      icon: BarChart3,
                    },
                    {
                      name:
                        userRole === "patient"
                          ? "Medication Report"
                          : userRole === "doctor"
                            ? "Patient Analytics"
                            : "Financial Report",
                      icon: PieChart,
                    },
                    {
                      name:
                        userRole === "patient"
                          ? "Appointment History"
                          : userRole === "doctor"
                            ? "Revenue Analysis"
                            : "Staff Report",
                      icon: Calendar,
                    },
                    {
                      name:
                        userRole === "patient"
                          ? "Custom Report"
                          : userRole === "doctor"
                            ? "Custom Analysis"
                            : "Custom Dashboard",
                      icon: Settings,
                    },
                  ].map((template, index) => (
                    <div
                      key={index}
                      className="p-4 bg-muted/50 rounded-lg cursor-pointer hover:bg-muted/70 transition-colors"
                    >
                      <div className="text-center">
                        <template.icon className="w-8 h-8 mx-auto mb-2 text-primary" />
                        <p className="font-semibold text-foreground">{template.name}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Insights Tab */}
          <TabsContent value="insights" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* AI Insights */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Zap className="w-5 h-5" />
                    <span>AI-Powered Insights</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    {
                      insight:
                        userRole === "patient"
                          ? "Your blood pressure readings show improvement after starting the new medication regimen."
                          : userRole === "doctor"
                            ? "Patients with morning appointments show 23% higher satisfaction rates."
                            : "Emergency department efficiency improves by 15% during night shifts.",
                      type: "positive",
                      confidence: 92,
                    },
                    {
                      insight:
                        userRole === "patient"
                          ? "Consider scheduling your next cardiology appointment within 2 weeks based on your current health trends."
                          : userRole === "doctor"
                            ? "Consider extending consultation time for elderly patients to improve satisfaction scores."
                            : "Consider increasing nursing staff during weekend shifts to maintain service quality.",
                      type: "recommendation",
                      confidence: 78,
                    },
                    {
                      insight:
                        userRole === "patient"
                          ? "Your medication adherence has decreased by 8% this month. Setting up reminders could help."
                          : userRole === "doctor"
                            ? "Response time to patient messages has increased. Consider delegating routine queries to nursing staff."
                            : "Equipment utilization in OR-2 is below optimal levels. Consider scheduling adjustments.",
                      type: "warning",
                      confidence: 85,
                    },
                  ].map((insight, index) => (
                    <div key={index} className="p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-start space-x-3">
                        <div
                          className={`w-2 h-2 rounded-full mt-2 ${
                            insight.type === "positive"
                              ? "bg-green-500"
                              : insight.type === "recommendation"
                                ? "bg-blue-500"
                                : "bg-orange-500"
                          }`}
                        ></div>
                        <div className="flex-1">
                          <p className="text-sm text-foreground mb-2">{insight.insight}</p>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline" className="text-xs">
                              {insight.confidence}% confidence
                            </Badge>
                            <Badge
                              className={`text-xs ${
                                insight.type === "positive"
                                  ? "bg-green-100 text-green-800"
                                  : insight.type === "recommendation"
                                    ? "bg-blue-100 text-blue-800"
                                    : "bg-orange-100 text-orange-800"
                              }`}
                            >
                              {insight.type}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Recommendations */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Target className="w-5 h-5" />
                    <span>Personalized Recommendations</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    {
                      title:
                        userRole === "patient"
                          ? "Health Improvement"
                          : userRole === "doctor"
                            ? "Practice Optimization"
                            : "Operational Excellence",
                      recommendations:
                        userRole === "patient"
                          ? [
                              "Increase daily water intake to 8 glasses",
                              "Schedule regular exercise 3x per week",
                              "Set medication reminders for better adherence",
                            ]
                          : userRole === "doctor"
                            ? [
                                "Implement patient portal for routine queries",
                                "Consider telemedicine for follow-up appointments",
                                "Optimize appointment scheduling for better flow",
                              ]
                            : [
                                "Implement predictive maintenance for equipment",
                                "Optimize staff scheduling based on patient flow",
                                "Enhance patient communication systems",
                              ],
                    },
                  ].map((section, index) => (
                    <div key={index}>
                      <h4 className="font-semibold text-foreground mb-3">{section.title}</h4>
                      <div className="space-y-2">
                        {section.recommendations.map((rec, recIndex) => (
                          <div key={recIndex} className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span className="text-sm text-foreground">{rec}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Benchmarking */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Award className="w-5 h-5" />
                  <span>Benchmarking & Comparisons</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    {
                      metric:
                        userRole === "patient"
                          ? "Health Score"
                          : userRole === "doctor"
                            ? "Patient Satisfaction"
                            : "Operational Efficiency",
                      yourValue: userRole === "patient" ? 85 : userRole === "doctor" ? 4.8 : 87,
                      benchmark: userRole === "patient" ? 78 : userRole === "doctor" ? 4.3 : 82,
                      percentile: 78,
                    },
                    {
                      metric:
                        userRole === "patient"
                          ? "Medication Adherence"
                          : userRole === "doctor"
                            ? "Response Time"
                            : "Patient Satisfaction",
                      yourValue: userRole === "patient" ? 92 : userRole === "doctor" ? 2.3 : 4.6,
                      benchmark: userRole === "patient" ? 85 : userRole === "doctor" ? 3.1 : 4.2,
                      percentile: 85,
                    },
                    {
                      metric:
                        userRole === "patient"
                          ? "Appointment Attendance"
                          : userRole === "doctor"
                            ? "Patient Volume"
                            : "Staff Satisfaction",
                      yourValue: userRole === "patient" ? 96 : userRole === "doctor" ? 247 : 88,
                      benchmark: userRole === "patient" ? 89 : userRole === "doctor" ? 180 : 85,
                      percentile: 92,
                    },
                  ].map((benchmark, index) => (
                    <div key={index} className="text-center p-4 bg-muted/50 rounded-lg">
                      <h4 className="font-semibold text-foreground mb-2">{benchmark.metric}</h4>
                      <div className="text-2xl font-bold text-primary mb-1">{benchmark.yourValue}</div>
                      <div className="text-sm text-muted-foreground mb-2">vs {benchmark.benchmark} benchmark</div>
                      <div className="text-xs text-muted-foreground">{benchmark.percentile}th percentile</div>
                      <Progress value={benchmark.percentile} className="h-2 mt-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
