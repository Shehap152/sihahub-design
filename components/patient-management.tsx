"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ChevronRight,
  User,
  Phone,
  Mail,
  Calendar,
  FileText,
  Pill,
  Activity,
  Heart,
  Thermometer,
  Weight,
  Ruler,
  AlertTriangle,
  Plus,
  Edit,
  Save,
  X,
} from "lucide-react"

interface PatientManagementProps {
  patientId: string
  onBack: () => void
}

interface MedicalRecord {
  id: string
  date: string
  type: "consultation" | "lab-result" | "prescription" | "diagnosis"
  title: string
  description: string
  doctor: string
  attachments?: string[]
}

interface Prescription {
  id: string
  medication: string
  dosage: string
  frequency: string
  duration: string
  instructions: string
  prescribedDate: string
  status: "active" | "completed" | "discontinued"
}

interface VitalSigns {
  date: string
  bloodPressure: string
  heartRate: number
  temperature: number
  weight: number
  height: number
  oxygenSaturation: number
}

const mockPatient = {
  id: "p1",
  name: "Sarah Johnson",
  age: 34,
  gender: "Female",
  bloodType: "A+",
  phone: "+1 (555) 123-4567",
  email: "sarah.j@email.com",
  address: "123 Main St, City, State 12345",
  emergencyContact: "John Johnson - +1 (555) 987-6543",
  insurance: "Blue Cross Blue Shield",
  allergies: ["Penicillin", "Shellfish"],
  chronicConditions: ["Hypertension", "Diabetes Type 2"],
  lastVisit: "2024-01-15",
  nextAppointment: "2024-01-25 10:00",
  avatar: "/patient-1.jpg",
}

const mockMedicalRecords: MedicalRecord[] = [
  {
    id: "r1",
    date: "2024-01-15",
    type: "consultation",
    title: "Regular Checkup",
    description: "Patient reports feeling well. Blood pressure slightly elevated. Recommended lifestyle changes.",
    doctor: "Dr. Smith",
  },
  {
    id: "r2",
    date: "2024-01-10",
    type: "lab-result",
    title: "Blood Work Results",
    description:
      "Complete blood count and metabolic panel. All values within normal range except slightly elevated glucose.",
    doctor: "Dr. Smith",
  },
  {
    id: "r3",
    date: "2024-01-05",
    type: "prescription",
    title: "Medication Update",
    description: "Adjusted hypertension medication dosage. Added metformin for glucose control.",
    doctor: "Dr. Smith",
  },
]

const mockPrescriptions: Prescription[] = [
  {
    id: "pr1",
    medication: "Lisinopril",
    dosage: "10mg",
    frequency: "Once daily",
    duration: "Ongoing",
    instructions: "Take in the morning with food",
    prescribedDate: "2024-01-05",
    status: "active",
  },
  {
    id: "pr2",
    medication: "Metformin",
    dosage: "500mg",
    frequency: "Twice daily",
    duration: "Ongoing",
    instructions: "Take with meals to reduce stomach upset",
    prescribedDate: "2024-01-05",
    status: "active",
  },
]

const mockVitalSigns: VitalSigns[] = [
  {
    date: "2024-01-15",
    bloodPressure: "138/88",
    heartRate: 72,
    temperature: 98.6,
    weight: 145,
    height: 165,
    oxygenSaturation: 98,
  },
  {
    date: "2024-01-01",
    bloodPressure: "142/90",
    heartRate: 75,
    temperature: 98.4,
    weight: 147,
    height: 165,
    oxygenSaturation: 97,
  },
]

export default function PatientManagement({ patientId, onBack }: PatientManagementProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const [isEditing, setIsEditing] = useState(false)
  const [newNote, setNewNote] = useState("")

  const getRecordTypeColor = (type: MedicalRecord["type"]) => {
    switch (type) {
      case "consultation":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
      case "lab-result":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
      case "prescription":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400"
      case "diagnosis":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
    }
  }

  const getPrescriptionStatusColor = (status: Prescription["status"]) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
      case "completed":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
      case "discontinued":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
    }
  }

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
                <Avatar className="w-12 h-12">
                  <AvatarImage src={mockPatient.avatar || "/placeholder.svg"} />
                  <AvatarFallback>{mockPatient.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-xl font-bold text-foreground">{mockPatient.name}</h1>
                  <p className="text-sm text-muted-foreground">
                    {mockPatient.age} years • {mockPatient.gender} • {mockPatient.bloodType}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Phone className="w-4 h-4 mr-1" />
                Call
              </Button>
              <Button variant="outline" size="sm">
                <Mail className="w-4 h-4 mr-1" />
                Email
              </Button>
              <Button size="sm">
                <Calendar className="w-4 h-4 mr-1" />
                Schedule
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="records">Records</TabsTrigger>
            <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
            <TabsTrigger value="vitals">Vitals</TabsTrigger>
            <TabsTrigger value="notes">Notes</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Patient Info Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center space-x-2">
                    <User className="w-5 h-5" />
                    <span>Patient Information</span>
                  </span>
                  <Button variant="outline" size="sm" onClick={() => setIsEditing(!isEditing)}>
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Phone</Label>
                    <p className="text-foreground">{mockPatient.phone}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Email</Label>
                    <p className="text-foreground">{mockPatient.email}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Insurance</Label>
                    <p className="text-foreground">{mockPatient.insurance}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Emergency Contact</Label>
                    <p className="text-foreground">{mockPatient.emergencyContact}</p>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Address</Label>
                  <p className="text-foreground">{mockPatient.address}</p>
                </div>
              </CardContent>
            </Card>

            {/* Medical Summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <AlertTriangle className="w-5 h-5 text-orange-500" />
                    <span>Allergies</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {mockPatient.allergies.map((allergy, index) => (
                      <Badge key={index} variant="outline" className="bg-red-50 text-red-700 border-red-200">
                        {allergy}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Activity className="w-5 h-5 text-blue-500" />
                    <span>Chronic Conditions</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {mockPatient.chronicConditions.map((condition, index) => (
                      <Badge key={index} variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        {condition}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Latest Vitals */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Heart className="w-5 h-5 text-red-500" />
                  <span>Latest Vital Signs</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-red-100 dark:bg-red-900/20 rounded-lg flex items-center justify-center">
                      <Activity className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Blood Pressure</p>
                      <p className="font-semibold text-foreground">{mockVitalSigns[0].bloodPressure}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                      <Heart className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Heart Rate</p>
                      <p className="font-semibold text-foreground">{mockVitalSigns[0].heartRate} bpm</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center">
                      <Thermometer className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Temperature</p>
                      <p className="font-semibold text-foreground">{mockVitalSigns[0].temperature}°F</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Medical Records Tab */}
          <TabsContent value="records" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">Medical Records</h2>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Record
              </Button>
            </div>

            <div className="space-y-4">
              {mockMedicalRecords.map((record) => (
                <Card key={record.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          <FileText className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="font-semibold text-foreground">{record.title}</h3>
                            <Badge className={getRecordTypeColor(record.type)}>{record.type}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{record.description}</p>
                          <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                            <span>{record.date}</span>
                            <span>•</span>
                            <span>{record.doctor}</span>
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Prescriptions Tab */}
          <TabsContent value="prescriptions" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">Current Prescriptions</h2>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                New Prescription
              </Button>
            </div>

            <div className="space-y-4">
              {mockPrescriptions.map((prescription) => (
                <Card key={prescription.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                          <Pill className="w-5 h-5 text-purple-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="font-semibold text-foreground">{prescription.medication}</h3>
                            <Badge className={getPrescriptionStatusColor(prescription.status)}>
                              {prescription.status}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-muted-foreground">Dosage: </span>
                              <span className="text-foreground">{prescription.dosage}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Frequency: </span>
                              <span className="text-foreground">{prescription.frequency}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Duration: </span>
                              <span className="text-foreground">{prescription.duration}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Prescribed: </span>
                              <span className="text-foreground">{prescription.prescribedDate}</span>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mt-2">{prescription.instructions}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          Refill
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Vitals Tab */}
          <TabsContent value="vitals" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">Vital Signs History</h2>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Record Vitals
              </Button>
            </div>

            <div className="space-y-4">
              {mockVitalSigns.map((vitals, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-foreground">{vitals.date}</h3>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <div className="flex items-center space-x-3">
                        <Activity className="w-5 h-5 text-red-500" />
                        <div>
                          <p className="text-sm text-muted-foreground">Blood Pressure</p>
                          <p className="font-semibold text-foreground">{vitals.bloodPressure}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Heart className="w-5 h-5 text-blue-500" />
                        <div>
                          <p className="text-sm text-muted-foreground">Heart Rate</p>
                          <p className="font-semibold text-foreground">{vitals.heartRate} bpm</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Thermometer className="w-5 h-5 text-orange-500" />
                        <div>
                          <p className="text-sm text-muted-foreground">Temperature</p>
                          <p className="font-semibold text-foreground">{vitals.temperature}°F</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Weight className="w-5 h-5 text-green-500" />
                        <div>
                          <p className="text-sm text-muted-foreground">Weight</p>
                          <p className="font-semibold text-foreground">{vitals.weight} lbs</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Ruler className="w-5 h-5 text-purple-500" />
                        <div>
                          <p className="text-sm text-muted-foreground">Height</p>
                          <p className="font-semibold text-foreground">{vitals.height} cm</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Activity className="w-5 h-5 text-teal-500" />
                        <div>
                          <p className="text-sm text-muted-foreground">O2 Saturation</p>
                          <p className="font-semibold text-foreground">{vitals.oxygenSaturation}%</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Notes Tab */}
          <TabsContent value="notes" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">Clinical Notes</h2>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Add New Note</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Enter clinical notes, observations, or treatment plans..."
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  rows={4}
                />
                <div className="flex items-center space-x-2">
                  <Button>
                    <Save className="w-4 h-4 mr-2" />
                    Save Note
                  </Button>
                  <Button variant="outline" onClick={() => setNewNote("")}>
                    <X className="w-4 h-4 mr-2" />
                    Clear
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-semibold text-foreground">Follow-up Assessment</p>
                      <p className="text-sm text-muted-foreground">January 15, 2024 • Dr. Smith</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="text-sm text-foreground">
                    Patient shows good compliance with medication regimen. Blood pressure readings have improved since
                    last visit. Continue current medications and schedule follow-up in 3 months. Recommended dietary
                    modifications discussed.
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
