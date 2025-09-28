"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Share2,
  Download,
  Plus,
  FileText,
  Scan,
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
  Search,
  Filter,
  Upload,
  Edit,
  Trash2,
} from "lucide-react"

interface WebMedicalRecordsProps {
  userName: string
  userRole: string
  onBack: () => void
}

export default function WebMedicalRecords({ userName, userRole, onBack }: WebMedicalRecordsProps) {
  const [selectedFile, setSelectedFile] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTab, setSelectedTab] = useState("overview")

  // Mock data for demonstration
  const patientInfo = {
    name: userName,
    age: 32,
    bloodType: "O+",
    profileImage: "/patient-profile.png",
    healthSummary: "No chronic illnesses recorded",
    mrn: "MRN-2024-001234",
    dob: "1992-03-15",
    phone: "+1 (555) 123-4567",
    email: "alex.johnson@email.com",
    address: "123 Main St, City, State 12345",
    emergencyContact: "Jane Johnson - (555) 987-6543",
  }

  const vaccinations = [
    {
      id: "1",
      name: "COVID-19 Booster",
      date: "2024-01-15",
      status: "completed",
      nextDue: null,
      provider: "City Health Center",
      lotNumber: "ABC123",
    },
    {
      id: "2",
      name: "Influenza",
      date: "2023-10-20",
      status: "completed",
      nextDue: "2024-10-20",
      provider: "Family Clinic",
      lotNumber: "FLU456",
    },
    {
      id: "3",
      name: "Tetanus",
      date: "2022-03-10",
      status: "completed",
      nextDue: "2032-03-10",
      provider: "Emergency Care",
      lotNumber: "TET789",
    },
  ]

  const labResults = [
    {
      id: "1",
      test: "Complete Blood Count",
      date: "2024-01-20",
      status: "normal",
      orderedBy: "Dr. Sarah Wilson",
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
      orderedBy: "Dr. Michael Chen",
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
      radiologist: "Dr. Emily Rodriguez",
      facility: "City Medical Center",
    },
    {
      id: "2",
      type: "Abdominal Ultrasound",
      date: "2023-12-15",
      summary: "Normal abdominal organs. No masses or abnormalities detected.",
      radiologist: "Dr. James Park",
      facility: "Diagnostic Imaging Center",
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
      prescriber: "Dr. Sarah Wilson",
      refills: 3,
    },
    {
      id: "2",
      medicine: "Metformin",
      dosage: "500mg",
      frequency: "Twice daily",
      startDate: "2023-12-01",
      endDate: "2024-12-01",
      status: "active",
      prescriber: "Dr. Michael Chen",
      refills: 5,
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
      vitals: {
        bp: "120/80",
        hr: "72",
        temp: "98.6°F",
        weight: "165 lbs",
      },
    },
    {
      id: "2",
      date: "2024-01-15",
      doctor: "Dr. Sarah Johnson",
      specialty: "General Practice",
      hospital: "City Clinic",
      diagnosis: "Annual physical examination",
      notes: "Overall health good. Recommended lifestyle modifications for cholesterol management.",
      vitals: {
        bp: "118/78",
        hr: "68",
        temp: "98.4°F",
        weight: "163 lbs",
      },
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
      <Dialog open={!!selectedFile} onOpenChange={() => setSelectedFile(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              {selectedFile}
            </DialogTitle>
            <DialogDescription>Medical document viewer</DialogDescription>
          </DialogHeader>
          <div className="flex items-center justify-center h-96 bg-muted/30 rounded-lg">
            <div className="text-center">
              <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-lg font-medium text-foreground">{selectedFile}</p>
              <p className="text-sm text-muted-foreground">Document preview would appear here</p>
              <div className="flex items-center justify-center gap-2 mt-4">
                <Button variant="outline" size="sm">
                  <ZoomOut className="w-4 h-4 mr-2" />
                  Zoom Out
                </Button>
                <Button variant="outline" size="sm">
                  <ZoomIn className="w-4 h-4 mr-2" />
                  Zoom In
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Medical Records System</h1>
          <p className="text-muted-foreground">Comprehensive health information management</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search records..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button>
            <Upload className="w-4 h-4 mr-2" />
            Upload Document
          </Button>
        </div>
      </div>

      {/* Patient Overview Card */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Patient Info */}
            <div className="flex items-center space-x-4">
              <Avatar className="w-20 h-20">
                <AvatarImage src={patientInfo.profileImage || "/placeholder.svg"} />
                <AvatarFallback className="bg-primary/10 text-primary text-xl">
                  {patientInfo.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-2xl font-bold text-foreground">{patientInfo.name}</h2>
                <p className="text-muted-foreground">MRN: {patientInfo.mrn}</p>
                <div className="flex items-center gap-4 mt-2">
                  <Badge variant="outline">Age: {patientInfo.age}</Badge>
                  <Badge variant="outline" className="text-red-600">
                    <Heart className="w-3 h-3 mr-1" />
                    {patientInfo.bloodType}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-2">
              <h3 className="font-semibold text-foreground">Contact Information</h3>
              <div className="text-sm space-y-1">
                <p className="text-muted-foreground">DOB: {patientInfo.dob}</p>
                <p className="text-muted-foreground">Phone: {patientInfo.phone}</p>
                <p className="text-muted-foreground">Email: {patientInfo.email}</p>
                <p className="text-muted-foreground">Address: {patientInfo.address}</p>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="space-y-2">
              <h3 className="font-semibold text-foreground">Emergency Contact</h3>
              <p className="text-sm text-muted-foreground">{patientInfo.emergencyContact}</p>
              <div className="flex gap-2 mt-4">
                <Button size="sm" variant="outline">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
                <Button size="sm">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Records
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabbed Content */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="visits">Visits</TabsTrigger>
          <TabsTrigger value="labs">Lab Results</TabsTrigger>
          <TabsTrigger value="radiology">Radiology</TabsTrigger>
          <TabsTrigger value="prescriptions">Medications</TabsTrigger>
          <TabsTrigger value="vaccinations">Vaccines</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {visits.slice(0, 3).map((visit) => (
                  <div key={visit.id} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <User className="h-5 w-5 text-blue-600" />
                    <div className="flex-1">
                      <p className="font-medium">{visit.doctor}</p>
                      <p className="text-sm text-muted-foreground">
                        {visit.date} • {visit.specialty}
                      </p>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => setSelectedTab("visits")}>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Health Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5" />
                  Health Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                    <p className="text-2xl font-bold text-green-600">{vaccinations.length}</p>
                    <p className="text-sm text-muted-foreground">Vaccines</p>
                  </div>
                  <div className="text-center p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                    <p className="text-2xl font-bold text-blue-600">{prescriptions.length}</p>
                    <p className="text-sm text-muted-foreground">Active Meds</p>
                  </div>
                  <div className="text-center p-3 bg-orange-50 dark:bg-orange-950/20 rounded-lg">
                    <p className="text-2xl font-bold text-orange-600">{labResults.length}</p>
                    <p className="text-sm text-muted-foreground">Lab Tests</p>
                  </div>
                  <div className="text-center p-3 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
                    <p className="text-2xl font-bold text-purple-600">{visits.length}</p>
                    <p className="text-sm text-muted-foreground">Visits</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Visits Tab */}
        <TabsContent value="visits" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Medical Visits</h3>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Visit
            </Button>
          </div>

          <div className="grid gap-4">
            {visits.map((visit) => (
              <Card key={visit.id}>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div>
                      <h4 className="font-semibold text-foreground">{visit.doctor}</h4>
                      <p className="text-sm text-muted-foreground">{visit.specialty}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{visit.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{visit.hospital}</span>
                      </div>
                    </div>

                    <div>
                      <h5 className="font-medium mb-2">Diagnosis</h5>
                      <p className="text-sm text-muted-foreground">{visit.diagnosis}</p>
                      <h5 className="font-medium mt-3 mb-2">Notes</h5>
                      <p className="text-sm text-muted-foreground">{visit.notes}</p>
                    </div>

                    <div>
                      <h5 className="font-medium mb-2">Vitals</h5>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>BP: {visit.vitals.bp}</div>
                        <div>HR: {visit.vitals.hr}</div>
                        <div>Temp: {visit.vitals.temp}</div>
                        <div>Weight: {visit.vitals.weight}</div>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Lab Results Tab */}
        <TabsContent value="labs" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Laboratory Results</h3>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Lab Result
            </Button>
          </div>

          <div className="space-y-4">
            {labResults.map((lab) => (
              <Card key={lab.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-base">{lab.test}</CardTitle>
                      <CardDescription>
                        {lab.date} • Ordered by {lab.orderedBy}
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(lab.status)}
                      <Badge className={getStatusColor(lab.status)}>{lab.status}</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Test</TableHead>
                        <TableHead>Value</TableHead>
                        <TableHead>Reference Range</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {lab.values.map((value, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{value.name}</TableCell>
                          <TableCell>{value.value}</TableCell>
                          <TableCell>{value.range}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              {getStatusIcon(value.status)}
                              <span className={`text-xs ${getStatusColor(value.status).split(" ")[0]}`}>
                                {value.status}
                              </span>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" size="sm" onClick={() => setSelectedFile(`${lab.test} - ${lab.date}`)}>
                      <Eye className="w-4 h-4 mr-2" />
                      View Full Report
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Other tabs would follow similar patterns... */}
        <TabsContent value="radiology" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Radiology Reports</h3>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Report
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {radiologyReports.map((report) => (
              <Card key={report.id}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center">
                      <Scan className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold">{report.type}</h4>
                      <p className="text-sm text-muted-foreground">{report.date}</p>
                      <p className="text-sm text-muted-foreground">Dr. {report.radiologist}</p>
                      <p className="text-sm mt-2">{report.summary}</p>
                      <div className="flex gap-2 mt-4">
                        <Button variant="outline" size="sm" onClick={() => setSelectedFile(report.type)}>
                          <Eye className="w-4 h-4 mr-2" />
                          View Image
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Prescriptions Tab */}
        <TabsContent value="prescriptions" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Current Medications</h3>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Medication
            </Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Medication</TableHead>
                <TableHead>Dosage</TableHead>
                <TableHead>Frequency</TableHead>
                <TableHead>Prescriber</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {prescriptions.map((prescription) => (
                <TableRow key={prescription.id}>
                  <TableCell className="font-medium">{prescription.medicine}</TableCell>
                  <TableCell>{prescription.dosage}</TableCell>
                  <TableCell>{prescription.frequency}</TableCell>
                  <TableCell>{prescription.prescriber}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(prescription.status)}>{prescription.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>

        {/* Vaccinations Tab */}
        <TabsContent value="vaccinations" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Vaccination History</h3>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Vaccination
            </Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Vaccine</TableHead>
                <TableHead>Date Given</TableHead>
                <TableHead>Provider</TableHead>
                <TableHead>Next Due</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vaccinations.map((vaccine) => (
                <TableRow key={vaccine.id}>
                  <TableCell className="font-medium">{vaccine.name}</TableCell>
                  <TableCell>{vaccine.date}</TableCell>
                  <TableCell>{vaccine.provider}</TableCell>
                  <TableCell>{vaccine.nextDue || "N/A"}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(vaccine.status)}>{vaccine.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>

        {/* Documents Tab */}
        <TabsContent value="documents" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Medical Documents</h3>
            <Button>
              <Upload className="w-4 h-4 mr-2" />
              Upload Document
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[...labResults, ...radiologyReports].map((doc, index) => (
              <Card
                key={index}
                className="hover-lift cursor-pointer"
                onClick={() => setSelectedFile(doc.test || doc.type)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <FileText className="w-8 h-8 text-blue-600" />
                    <div className="flex-1">
                      <h4 className="font-medium">{doc.test || doc.type}</h4>
                      <p className="text-sm text-muted-foreground">{doc.date}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {selectedFile && (
        <Dialog open={!!selectedFile} onOpenChange={() => setSelectedFile(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                {selectedFile}
              </DialogTitle>
              <DialogDescription>Medical document viewer</DialogDescription>
            </DialogHeader>
            <div className="flex items-center justify-center h-96 bg-muted/30 rounded-lg">
              <div className="text-center">
                <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-lg font-medium text-foreground">{selectedFile}</p>
                <p className="text-sm text-muted-foreground">Document preview would appear here</p>
                <div className="flex items-center justify-center gap-2 mt-4">
                  <Button variant="outline" size="sm">
                    <ZoomOut className="w-4 h-4 mr-2" />
                    Zoom Out
                  </Button>
                  <Button variant="outline" size="sm">
                    <ZoomIn className="w-4 h-4 mr-2" />
                    Zoom In
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
