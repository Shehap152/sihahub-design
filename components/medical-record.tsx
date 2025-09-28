"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  Share2,
  Download,
  Plus,
  FileText,
  Syringe,
  TestTube,
  Scan,
  Pill,
  Scissors,
  Heart,
  Calendar,
  User,
  MapPin,
  ChevronRight,
  CheckCircle,
  AlertCircle,
  XCircle,
  Eye,
  ZoomIn,
  ZoomOut,
} from "lucide-react"

interface MedicalRecordProps {
  userName: string
  onBack: () => void
}

export default function MedicalRecord({ userName, onBack }: MedicalRecordProps) {
  const [selectedFile, setSelectedFile] = useState<string | null>(null)
  const [expandedVisit, setExpandedVisit] = useState<string | null>(null)

  // Mock data for demonstration
  const patientInfo = {
    name: userName,
    age: 32,
    bloodType: "O+",
    profileImage: "/patient-profile.png",
    healthSummary: "No chronic illnesses recorded",
  }

  const vaccinations = [
    {
      id: "1",
      name: "COVID-19 Booster",
      date: "2024-01-15",
      status: "completed",
      nextDue: null,
    },
    {
      id: "2",
      name: "Influenza",
      date: "2023-10-20",
      status: "completed",
      nextDue: "2024-10-20",
    },
    {
      id: "3",
      name: "Tetanus",
      date: "2022-03-10",
      status: "completed",
      nextDue: "2032-03-10",
    },
  ]

  const labResults = [
    {
      id: "1",
      test: "Complete Blood Count",
      date: "2024-01-20",
      status: "normal",
      values: [
        { name: "Hemoglobin", value: "14.2 g/dL", range: "12.0-15.5", status: "normal" },
        { name: "White Blood Cells", value: "6.8 K/uL", range: "4.5-11.0", status: "normal" },
        { name: "Platelets", value: "285 K/uL", range: "150-450", status: "normal" },
      ],
    },
    {
      id: "2",
      test: "Lipid Panel",
      date: "2024-01-18",
      status: "abnormal",
      values: [
        { name: "Total Cholesterol", value: "220 mg/dL", range: "<200", status: "high" },
        { name: "HDL Cholesterol", value: "45 mg/dL", range: ">40", status: "normal" },
        { name: "LDL Cholesterol", value: "145 mg/dL", range: "<100", status: "high" },
      ],
    },
  ]

  const radiologyReports = [
    {
      id: "1",
      type: "Chest X-Ray",
      date: "2024-01-10",
      summary: "Normal chest radiograph. No acute cardiopulmonary abnormalities.",
      thumbnail: "/chest-xray.png",
    },
    {
      id: "2",
      type: "Abdominal Ultrasound",
      date: "2023-12-15",
      summary: "Normal abdominal organs. No masses or abnormalities detected.",
      thumbnail: "/ultrasound-scan.jpg",
    },
  ]

  const prescriptions = [
    {
      id: "1",
      medicine: "Lisinopril",
      dosage: "10mg",
      frequency: "Once daily",
      startDate: "2024-01-15",
      endDate: "2024-07-15",
      status: "active",
    },
    {
      id: "2",
      medicine: "Metformin",
      dosage: "500mg",
      frequency: "Twice daily",
      startDate: "2023-12-01",
      endDate: "2024-12-01",
      status: "active",
    },
  ]

  const surgeries = [
    {
      id: "1",
      name: "Appendectomy",
      date: "2020-08-15",
      doctor: "Dr. Sarah Wilson",
      hospital: "City General Hospital",
      notes: "Laparoscopic appendectomy. No complications. Full recovery.",
    },
  ]

  const chronicConditions = [
    {
      id: "1",
      condition: "Hypertension",
      diagnosedDate: "2023-06-15",
      status: "Controlled",
      notes: "Well controlled with medication. Regular monitoring required.",
    },
  ]

  const visits = [
    {
      id: "1",
      date: "2024-01-20",
      doctor: "Dr. Michael Chen",
      specialty: "Cardiology",
      hospital: "Heart Center",
      diagnosis: "Routine cardiac check-up",
      notes: "Blood pressure well controlled. Continue current medication.",
      prescriptions: ["Lisinopril 10mg"],
      attachments: ["ECG Report", "Blood Pressure Log"],
    },
    {
      id: "2",
      date: "2024-01-15",
      doctor: "Dr. Sarah Johnson",
      specialty: "General Practice",
      hospital: "City Clinic",
      diagnosis: "Annual physical examination",
      notes: "Overall health good. Recommended lifestyle modifications for cholesterol management.",
      prescriptions: ["Multivitamin"],
      attachments: ["Lab Results", "Physical Exam Notes"],
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "normal":
      case "completed":
      case "active":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case "abnormal":
      case "high":
        return <AlertCircle className="w-4 h-4 text-orange-500" />
      case "critical":
        return <XCircle className="w-4 h-4 text-red-500" />
      default:
        return <CheckCircle className="w-4 h-4 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "normal":
      case "completed":
      case "active":
        return "text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-950"
      case "abnormal":
      case "high":
        return "text-orange-600 bg-orange-50 dark:text-orange-400 dark:bg-orange-950"
      case "critical":
        return "text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-950"
      default:
        return "text-muted-foreground bg-muted"
    }
  }

  if (selectedFile) {
    return (
      <div className="min-h-screen bg-neutral">
        {/* File Viewer Header */}
        <div className="bg-card border-b border-border">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="icon" onClick={() => setSelectedFile(null)}>
                  <ArrowLeft className="w-5 h-5" />
                </Button>
                <div>
                  <h1 className="text-lg font-semibold text-foreground">{selectedFile}</h1>
                  <p className="text-sm text-muted-foreground">Medical Document</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="icon">
                  <ZoomOut className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <ZoomIn className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Download className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* File Viewer Content */}
        <div className="p-6">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-8">
              <div className="flex items-center justify-center h-96 bg-muted/30 rounded-lg">
                <div className="text-center">
                  <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-lg font-medium text-foreground">{selectedFile}</p>
                  <p className="text-sm text-muted-foreground">Document preview would appear here</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-neutral">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" onClick={onBack}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-xl font-bold text-foreground">Medical Record</h1>
                <p className="text-sm text-muted-foreground">Complete health history</p>
              </div>
            </div>
            <Button className="bg-teal-500 hover:bg-teal-600">
              <Share2 className="w-4 h-4 mr-2" />
              Share Record
            </Button>
          </div>
        </div>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* Patient Overview */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center space-x-6">
              <Avatar className="w-20 h-20">
                <AvatarImage src={patientInfo.profileImage || "/placeholder.svg"} />
                <AvatarFallback className="bg-primary/10 text-primary text-xl">
                  {patientInfo.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-foreground">{patientInfo.name}</h2>
                <div className="flex items-center space-x-4 mt-2">
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Age: {patientInfo.age}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Heart className="w-4 h-4 text-red-500" />
                    <span className="text-sm text-muted-foreground">Blood Type: {patientInfo.bloodType}</span>
                  </div>
                </div>
                <div className="mt-3">
                  <p className="text-sm text-muted-foreground">Health Summary:</p>
                  <p className="text-sm font-medium text-foreground">{patientInfo.healthSummary}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabbed Navigation */}
        <Tabs defaultValue="visits" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-7">
            <TabsTrigger value="visits" className="text-xs">
              <Calendar className="w-4 h-4 mr-1" />
              Visits
            </TabsTrigger>
            <TabsTrigger value="vaccinations" className="text-xs">
              <Syringe className="w-4 h-4 mr-1" />
              Vaccines
            </TabsTrigger>
            <TabsTrigger value="labs" className="text-xs">
              <TestTube className="w-4 h-4 mr-1" />
              Labs
            </TabsTrigger>
            <TabsTrigger value="radiology" className="text-xs">
              <Scan className="w-4 h-4 mr-1" />
              Radiology
            </TabsTrigger>
            <TabsTrigger value="prescriptions" className="text-xs">
              <Pill className="w-4 h-4 mr-1" />
              Meds
            </TabsTrigger>
            <TabsTrigger value="surgeries" className="text-xs">
              <Scissors className="w-4 h-4 mr-1" />
              Surgery
            </TabsTrigger>
            <TabsTrigger value="conditions" className="text-xs">
              <Heart className="w-4 h-4 mr-1" />
              Conditions
            </TabsTrigger>
          </TabsList>

          {/* Visits Timeline */}
          <TabsContent value="visits" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground">Medical Visits Timeline</h3>
              <Badge variant="secondary">{visits.length} visits</Badge>
            </div>
            <div className="space-y-4">
              {visits.map((visit) => (
                <Card key={visit.id} className="border-0 shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4 flex-1">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <User className="w-6 h-6 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h4 className="font-semibold text-foreground">{visit.doctor}</h4>
                            <Badge variant="outline" className="text-xs">
                              {visit.specialty}
                            </Badge>
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-2">
                            <div className="flex items-center space-x-1">
                              <MapPin className="w-4 h-4" />
                              <span>{visit.hospital}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-4 h-4" />
                              <span>{visit.date}</span>
                            </div>
                          </div>
                          <p className="text-sm font-medium text-foreground mb-2">{visit.diagnosis}</p>
                          {expandedVisit === visit.id && (
                            <div className="space-y-3 mt-4 p-4 bg-muted/30 rounded-lg">
                              <div>
                                <p className="text-sm font-medium text-foreground mb-1">Notes:</p>
                                <p className="text-sm text-muted-foreground">{visit.notes}</p>
                              </div>
                              {visit.prescriptions.length > 0 && (
                                <div>
                                  <p className="text-sm font-medium text-foreground mb-1">Prescriptions:</p>
                                  <div className="flex flex-wrap gap-2">
                                    {visit.prescriptions.map((prescription, index) => (
                                      <Badge key={index} variant="secondary" className="text-xs">
                                        {prescription}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              )}
                              {visit.attachments.length > 0 && (
                                <div>
                                  <p className="text-sm font-medium text-foreground mb-1">Attachments:</p>
                                  <div className="flex flex-wrap gap-2">
                                    {visit.attachments.map((attachment, index) => (
                                      <Button
                                        key={index}
                                        variant="outline"
                                        size="sm"
                                        className="text-xs bg-transparent"
                                        onClick={() => setSelectedFile(attachment)}
                                      >
                                        <FileText className="w-3 h-3 mr-1" />
                                        {attachment}
                                      </Button>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setExpandedVisit(expandedVisit === visit.id ? null : visit.id)}
                      >
                        {expandedVisit === visit.id ? "Less" : "More"}
                        <ChevronRight
                          className={`w-4 h-4 ml-1 transition-transform ${
                            expandedVisit === visit.id ? "rotate-90" : ""
                          }`}
                        />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Vaccinations */}
          <TabsContent value="vaccinations" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground">Vaccination History</h3>
              <Badge variant="secondary">{vaccinations.length} vaccines</Badge>
            </div>
            <div className="grid gap-4">
              {vaccinations.map((vaccine) => (
                <Card key={vaccine.id} className="border-0 shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                          <Syringe className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground">{vaccine.name}</h4>
                          <p className="text-sm text-muted-foreground">Administered: {vaccine.date}</p>
                          {vaccine.nextDue && <p className="text-xs text-orange-600">Next due: {vaccine.nextDue}</p>}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(vaccine.status)}
                        <Badge className={getStatusColor(vaccine.status)}>{vaccine.status}</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Lab Results */}
          <TabsContent value="labs" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground">Laboratory Results</h3>
              <Badge variant="secondary">{labResults.length} tests</Badge>
            </div>
            <div className="space-y-4">
              {labResults.map((lab) => (
                <Card key={lab.id} className="border-0 shadow-sm">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-base">{lab.test}</CardTitle>
                        <CardDescription>Date: {lab.date}</CardDescription>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(lab.status)}
                        <Badge className={getStatusColor(lab.status)}>{lab.status}</Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {lab.values.map((value, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                        <div>
                          <p className="font-medium text-foreground">{value.name}</p>
                          <p className="text-sm text-muted-foreground">Reference: {value.range}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-foreground">{value.value}</p>
                          <div className="flex items-center space-x-1">
                            {getStatusIcon(value.status)}
                            <span className={`text-xs ${getStatusColor(value.status).split(" ")[0]}`}>
                              {value.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full bg-transparent"
                      onClick={() => setSelectedFile(`${lab.test} - ${lab.date}`)}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View Full Report
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Radiology Reports */}
          <TabsContent value="radiology" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground">Radiology Reports</h3>
              <Badge variant="secondary">{radiologyReports.length} scans</Badge>
            </div>
            <div className="grid gap-4">
              {radiologyReports.map((report) => (
                <Card key={report.id} className="border-0 shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-4">
                      <div
                        className="w-20 h-20 bg-muted rounded-lg flex items-center justify-center cursor-pointer hover:bg-muted/80 transition-colors"
                        onClick={() => setSelectedFile(report.type)}
                      >
                        <Scan className="w-8 h-8 text-muted-foreground" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground">{report.type}</h4>
                        <p className="text-sm text-muted-foreground mb-2">Date: {report.date}</p>
                        <p className="text-sm text-foreground">{report.summary}</p>
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-3 bg-transparent"
                          onClick={() => setSelectedFile(report.type)}
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          View Image
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Prescriptions */}
          <TabsContent value="prescriptions" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground">Current Prescriptions</h3>
              <Badge variant="secondary">{prescriptions.length} medications</Badge>
            </div>
            <div className="grid gap-4">
              {prescriptions.map((prescription) => (
                <Card key={prescription.id} className="border-0 shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                          <Pill className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground">{prescription.medicine}</h4>
                          <p className="text-sm text-muted-foreground">
                            {prescription.dosage} • {prescription.frequency}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {prescription.startDate} - {prescription.endDate}
                          </p>
                        </div>
                      </div>
                      <Badge className={getStatusColor(prescription.status)}>{prescription.status}</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Surgeries */}
          <TabsContent value="surgeries" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground">Surgical History</h3>
              <Badge variant="secondary">{surgeries.length} procedures</Badge>
            </div>
            <div className="grid gap-4">
              {surgeries.map((surgery) => (
                <Card key={surgery.id} className="border-0 shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                        <Scissors className="w-6 h-6 text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground">{surgery.name}</h4>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                          <span>Date: {surgery.date}</span>
                          <span>Dr: {surgery.doctor}</span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{surgery.hospital}</p>
                        <p className="text-sm text-foreground mt-2">{surgery.notes}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Chronic Conditions */}
          <TabsContent value="conditions" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground">Chronic Conditions</h3>
              <Badge variant="secondary">{chronicConditions.length} conditions</Badge>
            </div>
            <div className="grid gap-4">
              {chronicConditions.map((condition) => (
                <Card key={condition.id} className="border-0 shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                        <Heart className="w-6 h-6 text-orange-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="font-semibold text-foreground">{condition.condition}</h4>
                          <Badge className={getStatusColor(condition.status.toLowerCase())}>{condition.status}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">Diagnosed: {condition.diagnosedDate}</p>
                        <p className="text-sm text-foreground">{condition.notes}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Floating Action Buttons */}
        <div className="fixed bottom-6 right-6 flex flex-col space-y-3">
          <Button className="bg-blue-500 hover:bg-blue-600 rounded-full w-14 h-14 shadow-lg">
            <Download className="w-6 h-6" />
          </Button>
          <Button className="bg-teal-500 hover:bg-teal-600 rounded-full w-14 h-14 shadow-lg">
            <Plus className="w-6 h-6" />
          </Button>
        </div>
      </div>
    </div>
  )
}
