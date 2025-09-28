"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Calendar,
  Clock,
  Users,
  Search,
  Filter,
  ChevronRight,
  Phone,
  Video,
  MessageSquare,
  AlertCircle,
  Plus,
  Eye,
  Edit,
  Activity,
} from "lucide-react"

interface DoctorDashboardProps {
  userName: string
  onBack: () => void
}

interface Patient {
  id: string
  name: string
  age: number
  gender: string
  bloodType: string
  phone: string
  email: string
  lastVisit: string
  nextAppointment?: string
  condition: string
  status: "stable" | "critical" | "recovering" | "follow-up"
  avatar?: string
}

interface Appointment {
  id: string
  patientName: string
  patientId: string
  time: string
  date: string
  type: "consultation" | "follow-up" | "emergency" | "telemedicine"
  status: "scheduled" | "in-progress" | "completed" | "cancelled"
  duration: number
  notes?: string
}

const mockPatients: Patient[] = [
  {
    id: "p1",
    name: "Sarah Johnson",
    age: 34,
    gender: "Female",
    bloodType: "A+",
    phone: "+1 (555) 123-4567",
    email: "sarah.j@email.com",
    lastVisit: "2024-01-15",
    nextAppointment: "2024-01-25 10:00",
    condition: "Hypertension",
    status: "stable",
    avatar: "/patient-1.jpg",
  },
  {
    id: "p2",
    name: "Michael Chen",
    age: 45,
    gender: "Male",
    bloodType: "O-",
    phone: "+1 (555) 234-5678",
    email: "m.chen@email.com",
    lastVisit: "2024-01-20",
    nextAppointment: "2024-01-24 14:30",
    condition: "Diabetes Type 2",
    status: "follow-up",
    avatar: "/patient-2.jpg",
  },
  {
    id: "p3",
    name: "Emma Rodriguez",
    age: 28,
    gender: "Female",
    bloodType: "B+",
    phone: "+1 (555) 345-6789",
    email: "emma.r@email.com",
    lastVisit: "2024-01-22",
    condition: "Migraine",
    status: "recovering",
    avatar: "/patient-3.jpg",
  },
  {
    id: "p4",
    name: "David Wilson",
    age: 52,
    gender: "Male",
    bloodType: "AB+",
    phone: "+1 (555) 456-7890",
    email: "d.wilson@email.com",
    lastVisit: "2024-01-23",
    condition: "Post-surgery recovery",
    status: "critical",
    avatar: "/patient-4.jpg",
  },
]

const mockAppointments: Appointment[] = [
  {
    id: "a1",
    patientName: "Sarah Johnson",
    patientId: "p1",
    time: "09:00",
    date: "2024-01-24",
    type: "consultation",
    status: "scheduled",
    duration: 30,
    notes: "Regular checkup for hypertension",
  },
  {
    id: "a2",
    patientName: "Michael Chen",
    patientId: "p2",
    time: "10:30",
    date: "2024-01-24",
    type: "follow-up",
    status: "scheduled",
    duration: 20,
    notes: "Diabetes management review",
  },
  {
    id: "a3",
    patientName: "Emma Rodriguez",
    patientId: "p3",
    time: "14:00",
    date: "2024-01-24",
    type: "telemedicine",
    status: "scheduled",
    duration: 15,
    notes: "Migraine follow-up consultation",
  },
  {
    id: "a4",
    patientName: "David Wilson",
    patientId: "p4",
    time: "15:30",
    date: "2024-01-24",
    type: "consultation",
    status: "in-progress",
    duration: 45,
    notes: "Post-surgery evaluation",
  },
]

export default function DoctorDashboard({ userName, onBack }: DoctorDashboardProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null)
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)

  const getStatusColor = (status: Patient["status"]) => {
    switch (status) {
      case "stable":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
      case "critical":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
      case "recovering":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
      case "follow-up":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
    }
  }

  const getAppointmentTypeColor = (type: Appointment["type"]) => {
    switch (type) {
      case "consultation":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
      case "follow-up":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
      case "emergency":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
      case "telemedicine":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
    }
  }

  const filteredPatients = mockPatients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.condition.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const todayAppointments = mockAppointments.filter((apt) => apt.date === "2024-01-24")
  const upcomingAppointments = todayAppointments.filter((apt) => apt.status === "scheduled")
  const inProgressAppointments = todayAppointments.filter((apt) => apt.status === "in-progress")

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
                <h1 className="text-xl font-bold text-foreground">Doctor Dashboard</h1>
                <p className="text-sm text-muted-foreground">Welcome back, Dr. {userName}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                <Activity className="w-3 h-3 mr-1" />
                Online
              </Badge>
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

      <div className="px-6 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="patients">Patients</TabsTrigger>
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                      <Calendar className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">{todayAppointments.length}</p>
                      <p className="text-xs text-muted-foreground">Today's Appointments</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                      <Users className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">{mockPatients.length}</p>
                      <p className="text-xs text-muted-foreground">Total Patients</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                      <Clock className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">{inProgressAppointments.length}</p>
                      <p className="text-xs text-muted-foreground">In Progress</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
                      <AlertCircle className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">
                        {mockPatients.filter((p) => p.status === "critical").length}
                      </p>
                      <p className="text-xs text-muted-foreground">Critical Patients</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Today's Schedule */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5" />
                  <span>Today's Schedule</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {todayAppointments.map((appointment) => (
                  <div key={appointment.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-8 bg-primary rounded-full" />
                      <div>
                        <p className="font-semibold text-foreground">{appointment.patientName}</p>
                        <p className="text-sm text-muted-foreground">
                          {appointment.time} • {appointment.duration} min
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getAppointmentTypeColor(appointment.type)}>{appointment.type}</Badge>
                      {appointment.type === "telemedicine" && (
                        <Button size="sm" variant="outline">
                          <Video className="w-4 h-4 mr-1" />
                          Join
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Critical Patients Alert */}
            <Card className="border-red-200 bg-red-50 dark:bg-red-900/10 dark:border-red-800">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-red-700 dark:text-red-400">
                  <AlertCircle className="w-5 h-5" />
                  <span>Critical Patients Requiring Attention</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {mockPatients
                  .filter((patient) => patient.status === "critical")
                  .map((patient) => (
                    <div
                      key={patient.id}
                      className="flex items-center justify-between p-3 bg-white dark:bg-card rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={patient.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{patient.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold text-foreground">{patient.name}</p>
                          <p className="text-sm text-muted-foreground">{patient.condition}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="outline">
                          <Phone className="w-4 h-4 mr-1" />
                          Call
                        </Button>
                        <Button size="sm">
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Button>
                      </div>
                    </div>
                  ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Patients Tab */}
          <TabsContent value="patients" className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search patients..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button variant="outline" size="icon">
                  <Filter className="w-4 h-4" />
                </Button>
              </div>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Patient
              </Button>
            </div>

            <div className="grid gap-4">
              {filteredPatients.map((patient) => (
                <Card key={patient.id} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={patient.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{patient.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold text-foreground">{patient.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {patient.age} years • {patient.gender} • {patient.bloodType}
                          </p>
                          <p className="text-sm text-muted-foreground">{patient.condition}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge className={getStatusColor(patient.status)}>{patient.status}</Badge>
                        <div className="flex items-center space-x-1">
                          <Button size="sm" variant="outline">
                            <Phone className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <MessageSquare className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Appointments Tab */}
          <TabsContent value="appointments" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">Appointment Management</h2>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Schedule Appointment
              </Button>
            </div>

            <div className="grid gap-4">
              {mockAppointments.map((appointment) => (
                <Card key={appointment.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Clock className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">{appointment.patientName}</h3>
                          <p className="text-sm text-muted-foreground">
                            {appointment.date} at {appointment.time} • {appointment.duration} min
                          </p>
                          {appointment.notes && (
                            <p className="text-sm text-muted-foreground mt-1">{appointment.notes}</p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge className={getAppointmentTypeColor(appointment.type)}>{appointment.type}</Badge>
                        <div className="flex items-center space-x-1">
                          {appointment.type === "telemedicine" && (
                            <Button size="sm" variant="outline">
                              <Video className="w-4 h-4 mr-1" />
                              Join
                            </Button>
                          )}
                          <Button size="sm" variant="outline">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Schedule Tab */}
          <TabsContent value="schedule" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">Weekly Schedule</h2>
              <div className="flex items-center space-x-2">
                <Button variant="outline">Previous Week</Button>
                <Button variant="outline">Next Week</Button>
              </div>
            </div>

            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-7 gap-4 mb-4">
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                    <div key={day} className="text-center">
                      <p className="font-semibold text-foreground">{day}</p>
                      <p className="text-sm text-muted-foreground">
                        Jan {20 + ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].indexOf(day)}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-4">
                  {Array.from({ length: 7 }, (_, i) => (
                    <div key={i} className="space-y-2">
                      {i === 3 && ( // Thursday - show appointments
                        <>
                          <div className="bg-blue-100 dark:bg-blue-900/20 p-2 rounded text-xs">
                            <p className="font-semibold">9:00 AM</p>
                            <p>Sarah Johnson</p>
                          </div>
                          <div className="bg-green-100 dark:bg-green-900/20 p-2 rounded text-xs">
                            <p className="font-semibold">10:30 AM</p>
                            <p>Michael Chen</p>
                          </div>
                          <div className="bg-purple-100 dark:bg-purple-900/20 p-2 rounded text-xs">
                            <p className="font-semibold">2:00 PM</p>
                            <p>Emma Rodriguez</p>
                          </div>
                        </>
                      )}
                      {i === 4 && ( // Friday
                        <div className="bg-orange-100 dark:bg-orange-900/20 p-2 rounded text-xs">
                          <p className="font-semibold">11:00 AM</p>
                          <p>Follow-up calls</p>
                        </div>
                      )}
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
