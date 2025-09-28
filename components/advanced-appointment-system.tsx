"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import {
  CalendarIcon,
  Clock,
  Video,
  Phone,
  MapPin,
  User,
  ChevronRight,
  Plus,
  Search,
  Filter,
  Edit,
  CheckCircle,
  XCircle,
  AlertCircle,
  Repeat,
  Bell,
  Star,
} from "lucide-react"
import { format } from "date-fns"

interface AdvancedAppointmentSystemProps {
  userRole: "patient" | "doctor" | "hospital"
  userName: string
  onBack: () => void
}

interface AppointmentSlot {
  id: string
  doctorId: string
  doctorName: string
  specialty: string
  date: string
  time: string
  duration: number
  type: "in-person" | "telemedicine" | "phone"
  status: "available" | "booked" | "blocked"
  location?: string
  fee: number
}

interface Appointment {
  id: string
  patientId: string
  patientName: string
  doctorId: string
  doctorName: string
  specialty: string
  date: string
  time: string
  duration: number
  type: "in-person" | "telemedicine" | "phone"
  status: "scheduled" | "confirmed" | "in-progress" | "completed" | "cancelled" | "no-show"
  location?: string
  fee: number
  notes?: string
  symptoms?: string
  priority: "routine" | "urgent" | "emergency"
  reminderSent: boolean
  followUpRequired: boolean
  recurringId?: string
}

interface RecurringAppointment {
  id: string
  patientId: string
  doctorId: string
  frequency: "weekly" | "biweekly" | "monthly" | "quarterly"
  dayOfWeek?: number
  timeSlot: string
  duration: number
  totalSessions: number
  completedSessions: number
  nextAppointment: string
  active: boolean
}

const mockAvailableSlots: AppointmentSlot[] = [
  {
    id: "slot1",
    doctorId: "d1",
    doctorName: "Dr. Sarah Wilson",
    specialty: "Cardiology",
    date: "2024-01-25",
    time: "09:00",
    duration: 30,
    type: "in-person",
    status: "available",
    location: "Room 201",
    fee: 150,
  },
  {
    id: "slot2",
    doctorId: "d1",
    doctorName: "Dr. Sarah Wilson",
    specialty: "Cardiology",
    date: "2024-01-25",
    time: "10:30",
    duration: 30,
    type: "telemedicine",
    status: "available",
    fee: 120,
  },
  {
    id: "slot3",
    doctorId: "d2",
    doctorName: "Dr. Michael Chen",
    specialty: "Internal Medicine",
    date: "2024-01-25",
    time: "14:00",
    duration: 45,
    type: "in-person",
    status: "available",
    location: "Room 105",
    fee: 180,
  },
]

const mockAppointments: Appointment[] = [
  {
    id: "apt1",
    patientId: "p1",
    patientName: "John Smith",
    doctorId: "d1",
    doctorName: "Dr. Sarah Wilson",
    specialty: "Cardiology",
    date: "2024-01-24",
    time: "09:00",
    duration: 30,
    type: "in-person",
    status: "confirmed",
    location: "Room 201",
    fee: 150,
    notes: "Follow-up for hypertension",
    symptoms: "Chest pain, shortness of breath",
    priority: "routine",
    reminderSent: true,
    followUpRequired: false,
  },
  {
    id: "apt2",
    patientId: "p2",
    patientName: "Emma Rodriguez",
    doctorId: "d2",
    doctorName: "Dr. Michael Chen",
    specialty: "Internal Medicine",
    date: "2024-01-24",
    time: "14:30",
    duration: 45,
    type: "telemedicine",
    status: "scheduled",
    fee: 120,
    notes: "Diabetes management consultation",
    priority: "routine",
    reminderSent: false,
    followUpRequired: true,
  },
  {
    id: "apt3",
    patientId: "p3",
    patientName: "David Wilson",
    doctorId: "d1",
    doctorName: "Dr. Sarah Wilson",
    specialty: "Cardiology",
    date: "2024-01-25",
    time: "11:00",
    duration: 60,
    type: "in-person",
    status: "scheduled",
    location: "Room 201",
    fee: 200,
    notes: "Pre-surgery consultation",
    priority: "urgent",
    reminderSent: false,
    followUpRequired: true,
  },
]

const mockRecurringAppointments: RecurringAppointment[] = [
  {
    id: "rec1",
    patientId: "p1",
    doctorId: "d1",
    frequency: "monthly",
    timeSlot: "09:00",
    duration: 30,
    totalSessions: 12,
    completedSessions: 3,
    nextAppointment: "2024-02-24",
    active: true,
  },
]

export default function AdvancedAppointmentSystem({ userRole, userName, onBack }: AdvancedAppointmentSystemProps) {
  const [activeTab, setActiveTab] = useState("appointments")
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [selectedSlot, setSelectedSlot] = useState<AppointmentSlot | null>(null)

  const getStatusColor = (status: Appointment["status"]) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
      case "scheduled":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
      case "in-progress":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400"
      case "completed":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
      case "cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
      case "no-show":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
    }
  }

  const getPriorityColor = (priority: Appointment["priority"]) => {
    switch (priority) {
      case "emergency":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
      case "urgent":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400"
      case "routine":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
    }
  }

  const getTypeIcon = (type: Appointment["type"]) => {
    switch (type) {
      case "telemedicine":
        return <Video className="w-4 h-4" />
      case "phone":
        return <Phone className="w-4 h-4" />
      case "in-person":
        return <MapPin className="w-4 h-4" />
      default:
        return <User className="w-4 h-4" />
    }
  }

  const filteredAppointments = mockAppointments.filter(
    (apt) =>
      apt.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.doctorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.specialty.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const todayAppointments = filteredAppointments.filter((apt) => apt.date === "2024-01-24")
  const upcomingAppointments = filteredAppointments.filter((apt) => apt.date > "2024-01-24")

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
                <h1 className="text-xl font-bold text-foreground">Advanced Appointment System</h1>
                <p className="text-sm text-muted-foreground">Comprehensive scheduling & management</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Bell className="w-4 h-4 mr-1" />
                Reminders
              </Button>
              <Button size="sm" onClick={() => setShowBookingModal(true)}>
                <Plus className="w-4 h-4 mr-1" />
                Book Appointment
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
            <TabsTrigger value="availability">Availability</TabsTrigger>
            <TabsTrigger value="recurring">Recurring</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Appointments Tab */}
          <TabsContent value="appointments" className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search appointments..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button variant="outline" size="icon">
                  <Filter className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="bg-blue-50 text-blue-700">
                  {todayAppointments.length} Today
                </Badge>
                <Badge variant="outline" className="bg-green-50 text-green-700">
                  {upcomingAppointments.length} Upcoming
                </Badge>
              </div>
            </div>

            {/* Today's Appointments */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CalendarIcon className="w-5 h-5" />
                  <span>Today's Appointments</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {todayAppointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="flex items-center justify-between p-4 bg-muted/50 rounded-lg cursor-pointer hover:bg-muted/70 transition-colors"
                    onClick={() => setSelectedAppointment(appointment)}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        {getTypeIcon(appointment.type)}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold text-foreground">
                            {userRole === "patient" ? appointment.doctorName : appointment.patientName}
                          </h3>
                          <Badge className={getPriorityColor(appointment.priority)}>{appointment.priority}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {appointment.time} • {appointment.duration} min • {appointment.specialty}
                        </p>
                        {appointment.location && (
                          <p className="text-sm text-muted-foreground flex items-center">
                            <MapPin className="w-3 h-3 mr-1" />
                            {appointment.location}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge className={getStatusColor(appointment.status)}>{appointment.status}</Badge>
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
                ))}
                {todayAppointments.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <CalendarIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No appointments scheduled for today</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Upcoming Appointments */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="w-5 h-5" />
                  <span>Upcoming Appointments</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {upcomingAppointments.slice(0, 5).map((appointment) => (
                  <div
                    key={appointment.id}
                    className="flex items-center justify-between p-4 bg-muted/50 rounded-lg cursor-pointer hover:bg-muted/70 transition-colors"
                    onClick={() => setSelectedAppointment(appointment)}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        {getTypeIcon(appointment.type)}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold text-foreground">
                            {userRole === "patient" ? appointment.doctorName : appointment.patientName}
                          </h3>
                          <Badge className={getPriorityColor(appointment.priority)}>{appointment.priority}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {appointment.date} at {appointment.time} • {appointment.duration} min
                        </p>
                        <p className="text-sm text-muted-foreground">{appointment.specialty}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge className={getStatusColor(appointment.status)}>{appointment.status}</Badge>
                      {!appointment.reminderSent && (
                        <Button size="sm" variant="outline">
                          <Bell className="w-4 h-4 mr-1" />
                          Remind
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
                {upcomingAppointments.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <Clock className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No upcoming appointments</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Schedule Tab */}
          <TabsContent value="schedule" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">Schedule Management</h2>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <CalendarIcon className="w-4 h-4 mr-1" />
                  Export
                </Button>
                <Button size="sm">
                  <Plus className="w-4 h-4 mr-1" />
                  Block Time
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-1">
                <CardHeader>
                  <CardTitle>Calendar</CardTitle>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border"
                  />
                </CardContent>
              </Card>

              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>
                    Schedule for {selectedDate ? format(selectedDate, "MMMM d, yyyy") : "Select a date"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Time slots for selected date */}
                    <div className="grid gap-2">
                      {Array.from({ length: 10 }, (_, i) => {
                        const hour = 9 + i
                        const timeSlot = `${hour.toString().padStart(2, "0")}:00`
                        const appointment = mockAppointments.find(
                          (apt) =>
                            apt.date === format(selectedDate || new Date(), "yyyy-MM-dd") && apt.time === timeSlot,
                        )

                        return (
                          <div
                            key={timeSlot}
                            className={`p-3 rounded-lg border ${
                              appointment
                                ? "bg-primary/10 border-primary/20"
                                : "bg-muted/30 border-muted hover:bg-muted/50 cursor-pointer"
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-medium text-foreground">{timeSlot}</span>
                              {appointment ? (
                                <div className="flex items-center space-x-2">
                                  <span className="text-sm text-foreground">
                                    {userRole === "patient" ? appointment.doctorName : appointment.patientName}
                                  </span>
                                  <Badge className={getStatusColor(appointment.status)} size="sm">
                                    {appointment.status}
                                  </Badge>
                                </div>
                              ) : (
                                <Button size="sm" variant="outline">
                                  Book Slot
                                </Button>
                              )}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Availability Tab */}
          <TabsContent value="availability" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">Available Slots</h2>
              <div className="flex items-center space-x-2">
                <Select defaultValue="all">
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="in-person">In-Person</SelectItem>
                    <SelectItem value="telemedicine">Telemedicine</SelectItem>
                    <SelectItem value="phone">Phone</SelectItem>
                  </SelectContent>
                </Select>
                <Button size="sm">
                  <Plus className="w-4 h-4 mr-1" />
                  Add Availability
                </Button>
              </div>
            </div>

            <div className="grid gap-4">
              {mockAvailableSlots.map((slot) => (
                <Card key={slot.id} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                          {getTypeIcon(slot.type)}
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">{slot.doctorName}</h3>
                          <p className="text-sm text-muted-foreground">{slot.specialty}</p>
                          <p className="text-sm text-muted-foreground">
                            {slot.date} at {slot.time} • {slot.duration} min
                          </p>
                          {slot.location && (
                            <p className="text-sm text-muted-foreground flex items-center">
                              <MapPin className="w-3 h-3 mr-1" />
                              {slot.location}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="text-right">
                          <p className="font-semibold text-foreground">${slot.fee}</p>
                          <Badge variant="outline" className="bg-green-50 text-green-700">
                            Available
                          </Badge>
                        </div>
                        <Button
                          size="sm"
                          onClick={() => {
                            setSelectedSlot(slot)
                            setShowBookingModal(true)
                          }}
                        >
                          Book Now
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Recurring Tab */}
          <TabsContent value="recurring" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">Recurring Appointments</h2>
              <Button size="sm">
                <Plus className="w-4 h-4 mr-1" />
                Setup Recurring
              </Button>
            </div>

            <div className="grid gap-4">
              {mockRecurringAppointments.map((recurring) => (
                <Card key={recurring.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                          <Repeat className="w-6 h-6 text-purple-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">Monthly Checkup</h3>
                          <p className="text-sm text-muted-foreground">
                            Every {recurring.frequency} • {recurring.timeSlot} • {recurring.duration} min
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Progress: {recurring.completedSessions}/{recurring.totalSessions} sessions
                          </p>
                          <p className="text-sm text-muted-foreground">Next: {recurring.nextAppointment}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge
                          variant="outline"
                          className={recurring.active ? "bg-green-50 text-green-700" : "bg-gray-50 text-gray-700"}
                        >
                          {recurring.active ? "Active" : "Paused"}
                        </Badge>
                        <div className="flex items-center space-x-1">
                          <Button size="sm" variant="outline">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            {recurring.active ? "Pause" : "Resume"}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">Appointment Analytics</h2>
              <Select defaultValue="month">
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="quarter">This Quarter</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                      <CalendarIcon className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">156</p>
                      <p className="text-xs text-muted-foreground">Total Appointments</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">142</p>
                      <p className="text-xs text-muted-foreground">Completed</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
                      <XCircle className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">8</p>
                      <p className="text-xs text-muted-foreground">Cancelled</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                      <AlertCircle className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">6</p>
                      <p className="text-xs text-muted-foreground">No-Shows</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Appointment Types</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-blue-500" />
                      <span className="text-sm text-foreground">In-Person</span>
                    </div>
                    <span className="text-sm font-semibold text-foreground">68%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Video className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-foreground">Telemedicine</span>
                    </div>
                    <span className="text-sm font-semibold text-foreground">28%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-purple-500" />
                      <span className="text-sm text-foreground">Phone</span>
                    </div>
                    <span className="text-sm font-semibold text-foreground">4%</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Patient Satisfaction</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Star className="w-5 h-5 text-yellow-500 fill-current" />
                    <span className="text-2xl font-bold text-foreground">4.8</span>
                    <span className="text-sm text-muted-foreground">/ 5.0</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Based on 142 completed appointments</p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>5 stars</span>
                      <span>78%</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>4 stars</span>
                      <span>18%</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>3 stars</span>
                      <span>3%</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>2 stars</span>
                      <span>1%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Appointment Details Modal */}
      {selectedAppointment && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Appointment Details</CardTitle>
                <Button variant="ghost" size="icon" onClick={() => setSelectedAppointment(null)}>
                  <XCircle className="w-5 h-5" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Patient</Label>
                  <p className="text-foreground">{selectedAppointment.patientName}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Doctor</Label>
                  <p className="text-foreground">{selectedAppointment.doctorName}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Date & Time</Label>
                  <p className="text-foreground">
                    {selectedAppointment.date} at {selectedAppointment.time}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Duration</Label>
                  <p className="text-foreground">{selectedAppointment.duration} minutes</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Type</Label>
                  <div className="flex items-center space-x-2">
                    {getTypeIcon(selectedAppointment.type)}
                    <span className="text-foreground capitalize">{selectedAppointment.type}</span>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Status</Label>
                  <Badge className={getStatusColor(selectedAppointment.status)}>{selectedAppointment.status}</Badge>
                </div>
              </div>

              {selectedAppointment.symptoms && (
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Symptoms</Label>
                  <p className="text-foreground">{selectedAppointment.symptoms}</p>
                </div>
              )}

              {selectedAppointment.notes && (
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Notes</Label>
                  <p className="text-foreground">{selectedAppointment.notes}</p>
                </div>
              )}

              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm">
                    <Bell className="w-4 h-4 mr-1" />
                    Send Reminder
                  </Button>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <XCircle className="w-4 h-4 mr-1" />
                    Cancel
                  </Button>
                  {selectedAppointment.type === "telemedicine" && (
                    <Button size="sm">
                      <Video className="w-4 h-4 mr-1" />
                      Join Call
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
