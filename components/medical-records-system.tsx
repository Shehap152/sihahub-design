"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import {
  FileText,
  Pill,
  Activity,
  Heart,
  Thermometer,
  Weight,
  Ruler,
  Eye,
  Download,
  Upload,
  Plus,
  Search,
  Edit,
  Share,
  Lock,
  Unlock,
  AlertTriangle,
  CheckCircle,
  Clock,
  ChevronRight,
  X,
  Star,
  TrendingUp,
  TrendingDown,
} from "lucide-react"

interface MedicalRecordsSystemProps {
  userRole: "patient" | "doctor" | "hospital"
  userName: string
  patientId?: string
  onBack: () => void
}

interface MedicalRecord {
  id: string
  patientId: string
  doctorId: string
  doctorName: string
  date: string
  type: "consultation" | "lab-result" | "imaging" | "surgery" | "diagnosis" | "prescription" | "vaccination"
  title: string
  description: string
  diagnosis?: string
  treatment?: string
  notes?: string
  attachments?: string[]
  priority: "low" | "medium" | "high" | "critical"
  status: "draft" | "completed" | "reviewed" | "archived"
  tags: string[]
  isPrivate: boolean
}

interface Prescription {
  id: string
  patientId: string
  doctorId: string
  doctorName: string
  medicationName: string
  genericName?: string
  dosage: string
  frequency: string
  duration: string
  instructions: string
  sideEffects?: string[]
  interactions?: string[]
  prescribedDate: string
  startDate: string
  endDate?: string
  status: "active" | "completed" | "discontinued" | "expired"
  refillsRemaining: number
  totalRefills: number
  pharmacy?: string
  cost?: number
  insuranceCovered: boolean
}

interface VitalSigns {
  id: string
  patientId: string
  recordedBy: string
  date: string
  time: string
  bloodPressureSystolic: number
  bloodPressureDiastolic: number
  heartRate: number
  temperature: number
  weight: number
  height: number
  oxygenSaturation: number
  respiratoryRate: number
  bmi: number
  notes?: string
}

interface LabResult {
  id: string
  patientId: string
  testName: string
  testType: "blood" | "urine" | "imaging" | "biopsy" | "other"
  orderedBy: string
  performedBy: string
  date: string
  results: {
    parameter: string
    value: string
    unit: string
    referenceRange: string
    status: "normal" | "abnormal" | "critical"
  }[]
  interpretation?: string
  recommendations?: string
  attachments?: string[]
}

const mockMedicalRecords: MedicalRecord[] = [
  {
    id: "mr1",
    patientId: "p1",
    doctorId: "d1",
    doctorName: "Dr. Sarah Wilson",
    date: "2024-01-20",
    type: "consultation",
    title: "Annual Physical Examination",
    description: "Comprehensive annual health checkup including vital signs, blood work, and physical examination.",
    diagnosis: "Overall good health with mild hypertension",
    treatment: "Lifestyle modifications and blood pressure monitoring",
    notes:
      "Patient reports occasional headaches. Blood pressure slightly elevated. Recommended dietary changes and regular exercise.",
    priority: "medium",
    status: "completed",
    tags: ["annual-checkup", "hypertension", "preventive-care"],
    isPrivate: false,
  },
  {
    id: "mr2",
    patientId: "p1",
    doctorId: "d2",
    doctorName: "Dr. Michael Chen",
    date: "2024-01-15",
    type: "lab-result",
    title: "Complete Blood Count (CBC)",
    description: "Routine blood work to assess overall health and detect various disorders.",
    notes: "All values within normal range except slightly elevated glucose levels.",
    priority: "low",
    status: "reviewed",
    tags: ["blood-work", "routine", "glucose"],
    isPrivate: false,
  },
  {
    id: "mr3",
    patientId: "p1",
    doctorId: "d1",
    doctorName: "Dr. Sarah Wilson",
    date: "2024-01-10",
    type: "prescription",
    title: "Hypertension Medication",
    description: "Prescribed medication for blood pressure management.",
    treatment: "Lisinopril 10mg daily",
    priority: "high",
    status: "completed",
    tags: ["hypertension", "medication", "cardiovascular"],
    isPrivate: false,
  },
]

const mockPrescriptions: Prescription[] = [
  {
    id: "rx1",
    patientId: "p1",
    doctorId: "d1",
    doctorName: "Dr. Sarah Wilson",
    medicationName: "Lisinopril",
    genericName: "Lisinopril",
    dosage: "10mg",
    frequency: "Once daily",
    duration: "Ongoing",
    instructions: "Take in the morning with food. Monitor blood pressure regularly.",
    sideEffects: ["Dry cough", "Dizziness", "Fatigue"],
    interactions: ["NSAIDs", "Potassium supplements"],
    prescribedDate: "2024-01-10",
    startDate: "2024-01-10",
    status: "active",
    refillsRemaining: 5,
    totalRefills: 6,
    pharmacy: "City Pharmacy",
    cost: 25.99,
    insuranceCovered: true,
  },
  {
    id: "rx2",
    patientId: "p1",
    doctorId: "d2",
    doctorName: "Dr. Michael Chen",
    medicationName: "Metformin",
    genericName: "Metformin HCl",
    dosage: "500mg",
    frequency: "Twice daily",
    duration: "3 months",
    instructions: "Take with meals to reduce stomach upset. Monitor blood glucose levels.",
    sideEffects: ["Nausea", "Diarrhea", "Metallic taste"],
    prescribedDate: "2024-01-15",
    startDate: "2024-01-15",
    endDate: "2024-04-15",
    status: "active",
    refillsRemaining: 2,
    totalRefills: 3,
    pharmacy: "Health Plus Pharmacy",
    cost: 15.5,
    insuranceCovered: true,
  },
]

const mockVitalSigns: VitalSigns[] = [
  {
    id: "vs1",
    patientId: "p1",
    recordedBy: "Nurse Jennifer Adams",
    date: "2024-01-20",
    time: "09:30",
    bloodPressureSystolic: 138,
    bloodPressureDiastolic: 88,
    heartRate: 72,
    temperature: 98.6,
    weight: 165,
    height: 170,
    oxygenSaturation: 98,
    respiratoryRate: 16,
    bmi: 27.7,
    notes: "Patient appears comfortable, no acute distress",
  },
  {
    id: "vs2",
    patientId: "p1",
    recordedBy: "Dr. Sarah Wilson",
    date: "2024-01-10",
    time: "14:15",
    bloodPressureSystolic: 142,
    bloodPressureDiastolic: 90,
    heartRate: 75,
    temperature: 98.4,
    weight: 167,
    height: 170,
    oxygenSaturation: 97,
    respiratoryRate: 18,
    bmi: 28.0,
  },
]

const mockLabResults: LabResult[] = [
  {
    id: "lab1",
    patientId: "p1",
    testName: "Complete Blood Count (CBC)",
    testType: "blood",
    orderedBy: "Dr. Sarah Wilson",
    performedBy: "City Lab Services",
    date: "2024-01-15",
    results: [
      {
        parameter: "White Blood Cells",
        value: "7.2",
        unit: "K/uL",
        referenceRange: "4.0-11.0",
        status: "normal",
      },
      {
        parameter: "Red Blood Cells",
        value: "4.5",
        unit: "M/uL",
        referenceRange: "4.2-5.4",
        status: "normal",
      },
      {
        parameter: "Hemoglobin",
        value: "14.2",
        unit: "g/dL",
        referenceRange: "12.0-16.0",
        status: "normal",
      },
      {
        parameter: "Glucose",
        value: "110",
        unit: "mg/dL",
        referenceRange: "70-99",
        status: "abnormal",
      },
    ],
    interpretation: "Overall normal blood count with slightly elevated glucose levels.",
    recommendations: "Monitor glucose levels and consider dietary modifications.",
  },
]

export default function MedicalRecordsSystem({ userRole, userName, patientId, onBack }: MedicalRecordsSystemProps) {
  const [activeTab, setActiveTab] = useState("records")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedRecord, setSelectedRecord] = useState<MedicalRecord | null>(null)
  const [selectedPrescription, setSelectedPrescription] = useState<Prescription | null>(null)
  const [showNewRecordModal, setShowNewRecordModal] = useState(false)
  const [filterType, setFilterType] = useState<string>("all")
  const [filterStatus, setFilterStatus] = useState<string>("all")

  const getRecordTypeColor = (type: MedicalRecord["type"]) => {
    switch (type) {
      case "consultation":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
      case "lab-result":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
      case "imaging":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400"
      case "surgery":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
      case "diagnosis":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400"
      case "prescription":
        return "bg-pink-100 text-pink-800 dark:bg-pink-900/20 dark:text-pink-400"
      case "vaccination":
        return "bg-teal-100 text-teal-800 dark:bg-teal-900/20 dark:text-teal-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
    }
  }

  const getPriorityColor = (priority: MedicalRecord["priority"]) => {
    switch (priority) {
      case "critical":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
      case "high":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400"
      case "medium":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
      case "low":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
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
      case "expired":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
    }
  }

  const getLabResultStatusColor = (status: "normal" | "abnormal" | "critical") => {
    switch (status) {
      case "normal":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
      case "abnormal":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400"
      case "critical":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
    }
  }

  const filteredRecords = mockMedicalRecords.filter((record) => {
    const matchesSearch =
      record.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.doctorName.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = filterType === "all" || record.type === filterType
    const matchesStatus = filterStatus === "all" || record.status === filterStatus
    return matchesSearch && matchesType && matchesStatus
  })

  const activePrescriptions = mockPrescriptions.filter((rx) => rx.status === "active")
  const expiringSoon = activePrescriptions.filter((rx) => rx.refillsRemaining <= 1)

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
                <h1 className="text-xl font-bold text-foreground">Medical Records & Prescriptions</h1>
                <p className="text-sm text-muted-foreground">Comprehensive health data management</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Upload className="w-4 h-4 mr-1" />
                Import
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-1" />
                Export
              </Button>
              <Button size="sm" onClick={() => setShowNewRecordModal(true)}>
                <Plus className="w-4 h-4 mr-1" />
                New Record
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="records">Medical Records</TabsTrigger>
            <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
            <TabsTrigger value="vitals">Vital Signs</TabsTrigger>
            <TabsTrigger value="lab-results">Lab Results</TabsTrigger>
            <TabsTrigger value="analytics">Health Analytics</TabsTrigger>
          </TabsList>

          {/* Medical Records Tab */}
          <TabsContent value="records" className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search medical records..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="consultation">Consultation</SelectItem>
                    <SelectItem value="lab-result">Lab Result</SelectItem>
                    <SelectItem value="imaging">Imaging</SelectItem>
                    <SelectItem value="surgery">Surgery</SelectItem>
                    <SelectItem value="diagnosis">Diagnosis</SelectItem>
                    <SelectItem value="prescription">Prescription</SelectItem>
                    <SelectItem value="vaccination">Vaccination</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="reviewed">Reviewed</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="bg-blue-50 text-blue-700">
                  {filteredRecords.length} Records
                </Badge>
              </div>
            </div>

            <div className="grid gap-4">
              {filteredRecords.map((record) => (
                <Card
                  key={record.id}
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => setSelectedRecord(record)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                          <FileText className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="font-semibold text-foreground">{record.title}</h3>
                            <Badge className={getRecordTypeColor(record.type)}>{record.type}</Badge>
                            <Badge className={getPriorityColor(record.priority)}>{record.priority}</Badge>
                            {record.isPrivate && <Lock className="w-4 h-4 text-muted-foreground" />}
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{record.description}</p>
                          <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                            <span>{record.date}</span>
                            <span>•</span>
                            <span>{record.doctorName}</span>
                            <span>•</span>
                            <span className="capitalize">{record.status}</span>
                          </div>
                          {record.tags.length > 0 && (
                            <div className="flex items-center space-x-1 mt-2">
                              {record.tags.slice(0, 3).map((tag) => (
                                <Badge key={tag} variant="outline" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                              {record.tags.length > 3 && (
                                <Badge variant="outline" className="text-xs">
                                  +{record.tags.length - 3}
                                </Badge>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Share className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
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
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="bg-green-50 text-green-700">
                  {activePrescriptions.length} Active
                </Badge>
                {expiringSoon.length > 0 && (
                  <Badge variant="outline" className="bg-orange-50 text-orange-700">
                    {expiringSoon.length} Expiring Soon
                  </Badge>
                )}
                <Button size="sm">
                  <Plus className="w-4 h-4 mr-1" />
                  New Prescription
                </Button>
              </div>
            </div>

            {/* Expiring Soon Alert */}
            {expiringSoon.length > 0 && (
              <Card className="border-orange-200 bg-orange-50 dark:bg-orange-900/10 dark:border-orange-800">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-orange-700 dark:text-orange-400">
                    <AlertTriangle className="w-5 h-5" />
                    <span>Prescriptions Requiring Attention</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {expiringSoon.map((prescription) => (
                      <div
                        key={prescription.id}
                        className="flex items-center justify-between p-3 bg-white dark:bg-card rounded-lg"
                      >
                        <div>
                          <p className="font-semibold text-foreground">{prescription.medicationName}</p>
                          <p className="text-sm text-muted-foreground">
                            {prescription.refillsRemaining} refill{prescription.refillsRemaining !== 1 ? "s" : ""}{" "}
                            remaining
                          </p>
                        </div>
                        <Button size="sm">Request Refill</Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="grid gap-4">
              {mockPrescriptions.map((prescription) => (
                <Card
                  key={prescription.id}
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => setSelectedPrescription(prescription)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                          <Pill className="w-6 h-6 text-purple-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="font-semibold text-foreground">{prescription.medicationName}</h3>
                            <Badge className={getPrescriptionStatusColor(prescription.status)}>
                              {prescription.status}
                            </Badge>
                            {prescription.insuranceCovered && (
                              <Badge variant="outline" className="bg-green-50 text-green-700">
                                Covered
                              </Badge>
                            )}
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm mb-2">
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
                              <span className="text-muted-foreground">Refills: </span>
                              <span className="text-foreground">
                                {prescription.refillsRemaining}/{prescription.totalRefills}
                              </span>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground">{prescription.instructions}</p>
                          <div className="flex items-center space-x-4 text-xs text-muted-foreground mt-2">
                            <span>Prescribed: {prescription.prescribedDate}</span>
                            <span>•</span>
                            <span>{prescription.doctorName}</span>
                            {prescription.pharmacy && (
                              <>
                                <span>•</span>
                                <span>{prescription.pharmacy}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {prescription.cost && (
                          <div className="text-right">
                            <p className="font-semibold text-foreground">${prescription.cost}</p>
                          </div>
                        )}
                        <div className="flex items-center space-x-1">
                          <Button size="sm" variant="outline">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            Refill
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Vital Signs Tab */}
          <TabsContent value="vitals" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">Vital Signs History</h2>
              <Button size="sm">
                <Plus className="w-4 h-4 mr-1" />
                Record Vitals
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Latest Vitals Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>Latest Readings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockVitalSigns[0] && (
                    <>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Activity className="w-4 h-4 text-red-500" />
                          <span className="text-sm text-foreground">Blood Pressure</span>
                        </div>
                        <span className="font-semibold text-foreground">
                          {mockVitalSigns[0].bloodPressureSystolic}/{mockVitalSigns[0].bloodPressureDiastolic}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Heart className="w-4 h-4 text-blue-500" />
                          <span className="text-sm text-foreground">Heart Rate</span>
                        </div>
                        <span className="font-semibold text-foreground">{mockVitalSigns[0].heartRate} bpm</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Thermometer className="w-4 h-4 text-orange-500" />
                          <span className="text-sm text-foreground">Temperature</span>
                        </div>
                        <span className="font-semibold text-foreground">{mockVitalSigns[0].temperature}°F</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Weight className="w-4 h-4 text-green-500" />
                          <span className="text-sm text-foreground">Weight</span>
                        </div>
                        <span className="font-semibold text-foreground">{mockVitalSigns[0].weight} lbs</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Ruler className="w-4 h-4 text-purple-500" />
                          <span className="text-sm text-foreground">BMI</span>
                        </div>
                        <span className="font-semibold text-foreground">{mockVitalSigns[0].bmi}</span>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>

              {/* Trends */}
              <Card>
                <CardHeader>
                  <CardTitle>Health Trends</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground">Blood Pressure</span>
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="w-4 h-4 text-red-500" />
                      <span className="text-sm text-red-600">Slightly High</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground">Weight</span>
                    <div className="flex items-center space-x-2">
                      <TrendingDown className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-green-600">Improving</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground">Heart Rate</span>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-green-600">Normal</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Vitals History */}
            <div className="space-y-4">
              {mockVitalSigns.map((vitals, index) => (
                <Card key={vitals.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-foreground">
                          {vitals.date} at {vitals.time}
                        </h3>
                        <p className="text-sm text-muted-foreground">Recorded by {vitals.recordedBy}</p>
                      </div>
                      <Button size="sm" variant="outline">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="flex items-center space-x-3">
                        <Activity className="w-5 h-5 text-red-500" />
                        <div>
                          <p className="text-sm text-muted-foreground">Blood Pressure</p>
                          <p className="font-semibold text-foreground">
                            {vitals.bloodPressureSystolic}/{vitals.bloodPressureDiastolic}
                          </p>
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
                    </div>
                    {vitals.notes && (
                      <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                        <p className="text-sm text-foreground">{vitals.notes}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Lab Results Tab */}
          <TabsContent value="lab-results" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">Laboratory Results</h2>
              <Button size="sm">
                <Plus className="w-4 h-4 mr-1" />
                Add Lab Result
              </Button>
            </div>

            <div className="space-y-4">
              {mockLabResults.map((labResult) => (
                <Card key={labResult.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>{labResult.testName}</CardTitle>
                        <p className="text-sm text-muted-foreground">
                          {labResult.date} • Ordered by {labResult.orderedBy}
                        </p>
                      </div>
                      <Badge className={getRecordTypeColor("lab-result")}>{labResult.testType}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-3">
                      {labResult.results.map((result, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                          <div>
                            <p className="font-semibold text-foreground">{result.parameter}</p>
                            <p className="text-sm text-muted-foreground">Reference: {result.referenceRange}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-foreground">
                              {result.value} {result.unit}
                            </p>
                            <Badge className={getLabResultStatusColor(result.status)} size="sm">
                              {result.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                    {labResult.interpretation && (
                      <div className="p-3 bg-blue-50 dark:bg-blue-900/10 rounded-lg">
                        <h4 className="font-semibold text-foreground mb-2">Interpretation</h4>
                        <p className="text-sm text-foreground">{labResult.interpretation}</p>
                      </div>
                    )}
                    {labResult.recommendations && (
                      <div className="p-3 bg-orange-50 dark:bg-orange-900/10 rounded-lg">
                        <h4 className="font-semibold text-foreground mb-2">Recommendations</h4>
                        <p className="text-sm text-foreground">{labResult.recommendations}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Health Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">Health Analytics & Insights</h2>
              <Select defaultValue="6months">
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1month">Last Month</SelectItem>
                  <SelectItem value="3months">Last 3 Months</SelectItem>
                  <SelectItem value="6months">Last 6 Months</SelectItem>
                  <SelectItem value="1year">Last Year</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="w-5 h-5" />
                    <span>Records Summary</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground">Total Records</span>
                    <span className="font-semibold text-foreground">{mockMedicalRecords.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground">Consultations</span>
                    <span className="font-semibold text-foreground">
                      {mockMedicalRecords.filter((r) => r.type === "consultation").length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground">Lab Results</span>
                    <span className="font-semibold text-foreground">
                      {mockMedicalRecords.filter((r) => r.type === "lab-result").length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground">Prescriptions</span>
                    <span className="font-semibold text-foreground">
                      {mockMedicalRecords.filter((r) => r.type === "prescription").length}
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Pill className="w-5 h-5" />
                    <span>Medication Status</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground">Active Prescriptions</span>
                    <span className="font-semibold text-foreground">{activePrescriptions.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground">Expiring Soon</span>
                    <span className="font-semibold text-orange-600">{expiringSoon.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground">Insurance Covered</span>
                    <span className="font-semibold text-foreground">
                      {mockPrescriptions.filter((rx) => rx.insuranceCovered).length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground">Monthly Cost</span>
                    <span className="font-semibold text-foreground">
                      ${mockPrescriptions.reduce((sum, rx) => sum + (rx.cost || 0), 0).toFixed(2)}
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Activity className="w-5 h-5" />
                    <span>Health Score</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-foreground mb-2">78</div>
                    <div className="flex items-center justify-center space-x-1">
                      {Array.from({ length: 5 }, (_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < 4 ? "text-yellow-500 fill-current" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">Good Health Status</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Vitals Stability</span>
                      <span>85%</span>
                    </div>
                    <Progress value={85} className="h-2" />
                    <div className="flex items-center justify-between text-sm">
                      <span>Medication Adherence</span>
                      <span>92%</span>
                    </div>
                    <Progress value={92} className="h-2" />
                    <div className="flex items-center justify-between text-sm">
                      <span>Preventive Care</span>
                      <span>67%</span>
                    </div>
                    <Progress value={67} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Health Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle>Personalized Health Recommendations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/10 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-foreground">Blood Pressure Management</h4>
                      <p className="text-sm text-muted-foreground">
                        Your recent readings show slight elevation. Consider reducing sodium intake and increasing
                        physical activity.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-green-50 dark:bg-green-900/10 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-foreground">Medication Adherence</h4>
                      <p className="text-sm text-muted-foreground">
                        Great job maintaining your medication schedule! Continue taking medications as prescribed.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-orange-50 dark:bg-orange-900/10 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <Clock className="w-5 h-5 text-orange-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-foreground">Preventive Care</h4>
                      <p className="text-sm text-muted-foreground">
                        Schedule your annual physical exam and consider updating your vaccinations.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Record Details Modal */}
      {selectedRecord && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{selectedRecord.title}</CardTitle>
                  <div className="flex items-center space-x-2 mt-2">
                    <Badge className={getRecordTypeColor(selectedRecord.type)}>{selectedRecord.type}</Badge>
                    <Badge className={getPriorityColor(selectedRecord.priority)}>{selectedRecord.priority}</Badge>
                    <Badge variant="outline" className="capitalize">
                      {selectedRecord.status}
                    </Badge>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setSelectedRecord(null)}>
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Date</Label>
                  <p className="text-foreground">{selectedRecord.date}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Doctor</Label>
                  <p className="text-foreground">{selectedRecord.doctorName}</p>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium text-muted-foreground">Description</Label>
                <p className="text-foreground">{selectedRecord.description}</p>
              </div>

              {selectedRecord.diagnosis && (
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Diagnosis</Label>
                  <p className="text-foreground">{selectedRecord.diagnosis}</p>
                </div>
              )}

              {selectedRecord.treatment && (
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Treatment</Label>
                  <p className="text-foreground">{selectedRecord.treatment}</p>
                </div>
              )}

              {selectedRecord.notes && (
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Notes</Label>
                  <p className="text-foreground">{selectedRecord.notes}</p>
                </div>
              )}

              {selectedRecord.tags.length > 0 && (
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Tags</Label>
                  <div className="flex items-center space-x-2 mt-1">
                    {selectedRecord.tags.map((tag) => (
                      <Badge key={tag} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share className="w-4 h-4 mr-1" />
                    Share
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-1" />
                    Download
                  </Button>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    {selectedRecord.isPrivate ? <Lock className="w-4 h-4 mr-1" /> : <Unlock className="w-4 h-4 mr-1" />}
                    {selectedRecord.isPrivate ? "Private" : "Shared"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
