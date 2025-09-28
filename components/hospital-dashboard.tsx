"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Building2,
  Users,
  Calendar,
  Bed,
  Activity,
  AlertTriangle,
  TrendingUp,
  Clock,
  UserCheck,
  Stethoscope,
  Shield,
  Phone,
  Mail,
  MapPin,
  ChevronRight,
  Plus,
  Search,
  Filter,
  MoreVertical,
} from "lucide-react"

interface HospitalDashboardProps {
  userName: string
  onBack: () => void
}

interface Department {
  id: string
  name: string
  head: string
  staff: number
  capacity: number
  occupied: number
  status: "normal" | "busy" | "critical"
  location: string
}

interface StaffMember {
  id: string
  name: string
  role: "doctor" | "nurse" | "admin" | "technician" | "security"
  department: string
  shift: "morning" | "afternoon" | "night"
  status: "on-duty" | "off-duty" | "break" | "emergency"
  phone: string
  email: string
  avatar?: string
  experience: string
}

interface HospitalStats {
  totalBeds: number
  occupiedBeds: number
  totalStaff: number
  onDutyStaff: number
  todayAppointments: number
  emergencyCases: number
  revenue: number
  patientSatisfaction: number
}

const mockDepartments: Department[] = [
  {
    id: "d1",
    name: "Emergency",
    head: "Dr. Sarah Wilson",
    staff: 15,
    capacity: 20,
    occupied: 18,
    status: "critical",
    location: "Ground Floor - Wing A",
  },
  {
    id: "d2",
    name: "Cardiology",
    head: "Dr. Michael Chen",
    staff: 12,
    capacity: 25,
    occupied: 15,
    status: "normal",
    location: "2nd Floor - Wing B",
  },
  {
    id: "d3",
    name: "Pediatrics",
    head: "Dr. Emma Rodriguez",
    staff: 10,
    capacity: 30,
    occupied: 22,
    status: "busy",
    location: "3rd Floor - Wing C",
  },
  {
    id: "d4",
    name: "Surgery",
    head: "Dr. David Johnson",
    staff: 18,
    capacity: 8,
    occupied: 6,
    status: "normal",
    location: "4th Floor - Wing A",
  },
  {
    id: "d5",
    name: "ICU",
    head: "Dr. Lisa Park",
    staff: 20,
    capacity: 15,
    occupied: 12,
    status: "busy",
    location: "5th Floor - Wing B",
  },
]

const mockStaff: StaffMember[] = [
  {
    id: "s1",
    name: "Dr. Sarah Wilson",
    role: "doctor",
    department: "Emergency",
    shift: "morning",
    status: "on-duty",
    phone: "+1 (555) 123-4567",
    email: "s.wilson@hospital.com",
    experience: "15 years",
    avatar: "/doctor-1.jpg",
  },
  {
    id: "s2",
    name: "Nurse Jennifer Adams",
    role: "nurse",
    department: "ICU",
    shift: "night",
    status: "on-duty",
    phone: "+1 (555) 234-5678",
    email: "j.adams@hospital.com",
    experience: "8 years",
    avatar: "/nurse-1.jpg",
  },
  {
    id: "s3",
    name: "Dr. Michael Chen",
    role: "doctor",
    department: "Cardiology",
    shift: "afternoon",
    status: "break",
    phone: "+1 (555) 345-6789",
    email: "m.chen@hospital.com",
    experience: "12 years",
    avatar: "/doctor-2.jpg",
  },
  {
    id: "s4",
    name: "Tech Alex Kumar",
    role: "technician",
    department: "Radiology",
    shift: "morning",
    status: "on-duty",
    phone: "+1 (555) 456-7890",
    email: "a.kumar@hospital.com",
    experience: "5 years",
    avatar: "/tech-1.jpg",
  },
]

const mockStats: HospitalStats = {
  totalBeds: 250,
  occupiedBeds: 198,
  totalStaff: 180,
  onDutyStaff: 95,
  todayAppointments: 156,
  emergencyCases: 23,
  revenue: 125000,
  patientSatisfaction: 4.6,
}

export default function HospitalDashboard({ userName, onBack }: HospitalDashboardProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const [searchQuery, setSearchQuery] = useState("")

  const getDepartmentStatusColor = (status: Department["status"]) => {
    switch (status) {
      case "normal":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
      case "busy":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400"
      case "critical":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
    }
  }

  const getStaffStatusColor = (status: StaffMember["status"]) => {
    switch (status) {
      case "on-duty":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
      case "off-duty":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
      case "break":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400"
      case "emergency":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
    }
  }

  const getRoleIcon = (role: StaffMember["role"]) => {
    switch (role) {
      case "doctor":
        return <Stethoscope className="w-4 h-4" />
      case "nurse":
        return <UserCheck className="w-4 h-4" />
      case "admin":
        return <Shield className="w-4 h-4" />
      case "technician":
        return <Activity className="w-4 h-4" />
      case "security":
        return <Shield className="w-4 h-4" />
      default:
        return <Users className="w-4 h-4" />
    }
  }

  const bedOccupancyRate = Math.round((mockStats.occupiedBeds / mockStats.totalBeds) * 100)
  const staffUtilization = Math.round((mockStats.onDutyStaff / mockStats.totalStaff) * 100)

  const filteredStaff = mockStaff.filter(
    (staff) =>
      staff.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      staff.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      staff.role.toLowerCase().includes(searchQuery.toLowerCase()),
  )

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
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-foreground">Hospital Management</h1>
                  <p className="text-sm text-muted-foreground">City General Hospital</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                <Activity className="w-3 h-3 mr-1" />
                Operational
              </Badge>
              <Avatar className="w-10 h-10">
                <AvatarImage src="/admin-profile.png" />
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
            <TabsTrigger value="departments">Departments</TabsTrigger>
            <TabsTrigger value="staff">Staff</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                      <Bed className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">{mockStats.occupiedBeds}</p>
                      <p className="text-xs text-muted-foreground">Occupied Beds</p>
                      <p className="text-xs text-muted-foreground">of {mockStats.totalBeds}</p>
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
                      <p className="text-2xl font-bold text-foreground">{mockStats.onDutyStaff}</p>
                      <p className="text-xs text-muted-foreground">On Duty</p>
                      <p className="text-xs text-muted-foreground">of {mockStats.totalStaff}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                      <Calendar className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">{mockStats.todayAppointments}</p>
                      <p className="text-xs text-muted-foreground">Today's Appointments</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
                      <AlertTriangle className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">{mockStats.emergencyCases}</p>
                      <p className="text-xs text-muted-foreground">Emergency Cases</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Capacity Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Bed className="w-5 h-5" />
                    <span>Bed Occupancy</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Occupancy Rate</span>
                    <span className="text-sm font-semibold text-foreground">{bedOccupancyRate}%</span>
                  </div>
                  <Progress value={bedOccupancyRate} className="h-2" />
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Occupied</p>
                      <p className="font-semibold text-foreground">{mockStats.occupiedBeds}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Available</p>
                      <p className="font-semibold text-foreground">{mockStats.totalBeds - mockStats.occupiedBeds}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="w-5 h-5" />
                    <span>Staff Utilization</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">On Duty</span>
                    <span className="text-sm font-semibold text-foreground">{staffUtilization}%</span>
                  </div>
                  <Progress value={staffUtilization} className="h-2" />
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">On Duty</p>
                      <p className="font-semibold text-foreground">{mockStats.onDutyStaff}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Off Duty</p>
                      <p className="font-semibold text-foreground">{mockStats.totalStaff - mockStats.onDutyStaff}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Department Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Building2 className="w-5 h-5" />
                  <span>Department Status</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {mockDepartments.map((dept) => (
                  <div key={dept.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-8 bg-primary rounded-full" />
                      <div>
                        <p className="font-semibold text-foreground">{dept.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {dept.occupied}/{dept.capacity} beds • {dept.staff} staff
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getDepartmentStatusColor(dept.status)}>{dept.status}</Badge>
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Performance Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Daily Revenue</p>
                      <p className="text-xl font-bold text-foreground">${mockStats.revenue.toLocaleString()}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                      <Clock className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Avg Wait Time</p>
                      <p className="text-xl font-bold text-foreground">18 min</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg flex items-center justify-center">
                      <Activity className="w-5 h-5 text-yellow-600" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Patient Satisfaction</p>
                      <p className="text-xl font-bold text-foreground">{mockStats.patientSatisfaction}/5.0</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Departments Tab */}
          <TabsContent value="departments" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">Department Management</h2>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Department
              </Button>
            </div>

            <div className="grid gap-4">
              {mockDepartments.map((dept) => (
                <Card key={dept.id} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Building2 className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground text-lg">{dept.name}</h3>
                          <p className="text-sm text-muted-foreground">Head: {dept.head}</p>
                          <p className="text-sm text-muted-foreground">{dept.location}</p>
                        </div>
                      </div>
                      <div className="text-right space-y-2">
                        <Badge className={getDepartmentStatusColor(dept.status)}>{dept.status}</Badge>
                        <div className="text-sm text-muted-foreground">
                          <p>
                            Beds: {dept.occupied}/{dept.capacity}
                          </p>
                          <p>Staff: {dept.staff}</p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-muted-foreground">Bed Occupancy</span>
                        <span className="font-semibold text-foreground">
                          {Math.round((dept.occupied / dept.capacity) * 100)}%
                        </span>
                      </div>
                      <Progress value={(dept.occupied / dept.capacity) * 100} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Staff Tab */}
          <TabsContent value="staff" className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search staff..."
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
                Add Staff
              </Button>
            </div>

            <div className="grid gap-4">
              {filteredStaff.map((staff) => (
                <Card key={staff.id} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={staff.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{staff.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold text-foreground">{staff.name}</h3>
                            <div className="flex items-center space-x-1 text-muted-foreground">
                              {getRoleIcon(staff.role)}
                              <span className="text-sm capitalize">{staff.role}</span>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground">{staff.department}</p>
                          <p className="text-sm text-muted-foreground">{staff.experience} experience</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="text-right">
                          <Badge className={getStaffStatusColor(staff.status)}>{staff.status}</Badge>
                          <p className="text-sm text-muted-foreground mt-1 capitalize">{staff.shift} shift</p>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Button size="sm" variant="outline">
                            <Phone className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Mail className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Resources Tab */}
          <TabsContent value="resources" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">Resource Management</h2>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Resource
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Equipment Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground">MRI Machines</span>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="bg-green-50 text-green-700">
                        2/3 Available
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground">CT Scanners</span>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="bg-green-50 text-green-700">
                        4/4 Available
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground">X-Ray Machines</span>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="bg-orange-50 text-orange-700">
                        5/6 Available
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground">Ventilators</span>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="bg-red-50 text-red-700">
                        8/12 Available
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Inventory Levels</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-foreground">Surgical Supplies</span>
                      <span className="text-sm font-semibold text-foreground">85%</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-foreground">Medications</span>
                      <span className="text-sm font-semibold text-foreground">92%</span>
                    </div>
                    <Progress value={92} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-foreground">PPE Equipment</span>
                      <span className="text-sm font-semibold text-foreground">67%</span>
                    </div>
                    <Progress value={67} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-foreground">Blood Bank</span>
                      <span className="text-sm font-semibold text-foreground">78%</span>
                    </div>
                    <Progress value={78} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Facility Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <MapPin className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="font-semibold text-foreground">Main Campus</p>
                        <p className="text-sm text-muted-foreground">123 Medical Center Drive, City, State 12345</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="font-semibold text-foreground">Main Line</p>
                        <p className="text-sm text-muted-foreground">+1 (555) 123-HOSP</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <AlertTriangle className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="font-semibold text-foreground">Emergency</p>
                        <p className="text-sm text-muted-foreground">+1 (555) 911-EMRG</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <p className="font-semibold text-foreground mb-2">Operating Hours</p>
                      <div className="text-sm text-muted-foreground space-y-1">
                        <p>Emergency: 24/7</p>
                        <p>Outpatient: 6:00 AM - 10:00 PM</p>
                        <p>Visiting Hours: 8:00 AM - 8:00 PM</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
