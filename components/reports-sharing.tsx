"use client"

import { useState } from "react"
import { ArrowLeft, Download, Share2, QrCode, TrendingUp, Activity, Weight, Calendar, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"

interface ReportsSharingProps {
  userName: string
  onBack: () => void
}

// Mock data for charts
const bloodPressureData = [
  { date: "Jan 1", systolic: 120, diastolic: 80 },
  { date: "Jan 8", systolic: 125, diastolic: 82 },
  { date: "Jan 15", systolic: 118, diastolic: 78 },
  { date: "Jan 22", systolic: 122, diastolic: 81 },
  { date: "Jan 29", systolic: 119, diastolic: 79 },
]

const glucoseData = [
  { date: "Week 1", level: 95 },
  { date: "Week 2", level: 102 },
  { date: "Week 3", level: 88 },
  { date: "Week 4", level: 94 },
]

const weightData = [
  { month: "Oct", weight: 75, bmi: 24.2 },
  { month: "Nov", weight: 74, bmi: 23.9 },
  { month: "Dec", weight: 73, bmi: 23.6 },
  { month: "Jan", weight: 72, bmi: 23.3 },
]

export default function ReportsSharing({ userName, onBack }: ReportsSharingProps) {
  const [currentView, setCurrentView] = useState<"dashboard" | "detailed" | "download" | "share" | "qr">("dashboard")
  const [selectedReport, setSelectedReport] = useState<string>("")
  const [timeframe, setTimeframe] = useState<string>("30")
  const [shareSettings, setShareSettings] = useState({
    fullRecord: false,
    specificReport: true,
    prescriptions: false,
    duration: "7",
    permission: "view",
  })

  const reportTypes = [
    {
      id: "blood-pressure",
      title: "Blood Pressure",
      subtitle: "Trends & Analysis",
      icon: TrendingUp,
      data: bloodPressureData,
      color: "#0D9488",
      stats: { current: "120/80", trend: "↓ 2%", status: "Normal" },
      miniChart: true,
    },
    {
      id: "glucose",
      title: "Glucose Level",
      subtitle: "History & Patterns",
      icon: Activity,
      data: glucoseData,
      color: "#0369A1",
      stats: { current: "95 mg/dL", trend: "↓ 5%", status: "Good" },
      miniChart: true,
    },
    {
      id: "weight",
      title: "Weight & BMI",
      subtitle: "Progress Tracking",
      icon: Weight,
      data: weightData,
      color: "#8B5CF6",
      stats: { current: "72 kg", trend: "↓ 3 kg", status: "Healthy" },
      miniChart: true,
    },
    {
      id: "adherence",
      title: "Adherence Rate",
      subtitle: "Appointments & Meds",
      icon: Calendar,
      data: [
        { category: "Appointments", completed: 8, total: 10 },
        { category: "Medications", completed: 28, total: 30 },
      ],
      color: "#F59E0B",
      stats: { appointments: "80%", medications: "93%", overall: "87%" },
      miniChart: false,
    },
  ]

  const renderDashboard = () => (
    <div className="space-y-6 animate-fade-in-up">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-foreground mb-2">My Health Reports</h1>
        <p className="text-muted-foreground">Quick overview of your health metrics</p>
      </div>

      <div className="grid gap-4">
        {reportTypes.map((report, index) => {
          const Icon = report.icon
          return (
            <Card
              key={report.id}
              className="cursor-pointer card-hover btn-press transition-all duration-300"
              onClick={() => {
                setSelectedReport(report.id)
                setCurrentView("detailed")
              }}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg" style={{ backgroundColor: `${report.color}20` }}>
                      <Icon className="h-5 w-5" style={{ color: report.color }} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{report.title}</h3>
                      <p className="text-sm text-muted-foreground">{report.subtitle}</p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    {report.miniChart ? (
                      <div className="h-16 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={report.data}>
                            <Line
                              type="monotone"
                              dataKey={
                                report.id === "blood-pressure"
                                  ? "systolic"
                                  : report.id === "glucose"
                                    ? "level"
                                    : "weight"
                              }
                              stroke={report.color}
                              strokeWidth={2}
                              dot={false}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    ) : (
                      <div className="flex gap-4 h-16 items-center">
                        <div className="text-center">
                          <div className="text-xs text-muted-foreground">Appointments</div>
                          <div className="text-lg font-bold" style={{ color: report.color }}>
                            {report.stats.appointments}
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-xs text-muted-foreground">Medications</div>
                          <div className="text-lg font-bold" style={{ color: report.color }}>
                            {report.stats.medications}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="text-right ml-4">
                    <div className="text-lg font-bold text-foreground">
                      {report.stats.current || report.stats.overall}
                    </div>
                    <div className="text-sm text-muted-foreground">{report.stats.trend || report.stats.status}</div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-border">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full bg-transparent"
                    style={{ borderColor: report.color, color: report.color }}
                  >
                    View Full Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="mt-8 grid grid-cols-2 gap-3">
        <Button variant="outline" onClick={() => setCurrentView("qr")} className="flex items-center gap-2">
          <QrCode className="h-4 w-4" />
          QR Access
        </Button>
        <Button variant="outline" onClick={() => setCurrentView("share")} className="flex items-center gap-2">
          <Share2 className="h-4 w-4" />
          Share Reports
        </Button>
      </div>
    </div>
  )

  const renderDetailed = () => {
    const report = reportTypes.find((r) => r.id === selectedReport)
    if (!report) return null

    const Icon = report.icon

    return (
      <div className="space-y-6 animate-fade-in-up">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" size="icon" onClick={() => setCurrentView("dashboard")} className="btn-press">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg" style={{ backgroundColor: `${report.color}20` }}>
              <Icon className="h-5 w-5" style={{ color: report.color }} />
            </div>
            <h1 className="text-2xl font-bold text-foreground">{report.title}</h1>
          </div>
        </div>

        <div className="flex gap-2 mb-4">
          <Select value={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">7 days</SelectItem>
              <SelectItem value="30">30 days</SelectItem>
              <SelectItem value="180">6 months</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Card className="card-hover">
          <CardHeader>
            <CardTitle>Detailed Chart</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 w-full mb-6">
              <ResponsiveContainer width="100%" height="100%">
                {report.id === "adherence" ? (
                  <BarChart data={report.data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="completed" fill={report.color} />
                  </BarChart>
                ) : (
                  <LineChart data={report.data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey={report.id === "weight" ? "month" : "date"} />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey={
                        report.id === "blood-pressure" ? "systolic" : report.id === "glucose" ? "level" : "weight"
                      }
                      stroke={report.color}
                      strokeWidth={3}
                    />
                    {report.id === "blood-pressure" && (
                      <Line type="monotone" dataKey="diastolic" stroke="#0369A1" strokeWidth={3} />
                    )}
                  </LineChart>
                )}
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {Object.entries(report.stats)
                .slice(0, 3)
                .map(([key, value]) => (
                  <div key={key} className="text-center">
                    <div className="text-sm text-muted-foreground capitalize">{key.replace(/([A-Z])/g, " $1")}</div>
                    <div className="text-lg font-semibold">{value}</div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-3">
          <Button onClick={() => setCurrentView("download")} className="flex-1 btn-press">
            <Download className="h-4 w-4 mr-2" />
            Download PDF
          </Button>
          <Button variant="outline" onClick={() => setCurrentView("share")} className="flex-1 btn-press">
            <Share2 className="h-4 w-4 mr-2" />
            Share Report
          </Button>
        </div>
      </div>
    )
  }

  const renderDownload = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" onClick={() => setCurrentView("detailed")}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold text-foreground">Export Report</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Select Export Options</CardTitle>
          <CardDescription>Choose what to include in your report</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            {reportTypes.map((report) => (
              <div key={report.id} className="flex items-center space-x-2">
                <Checkbox id={report.id} defaultChecked={report.id === selectedReport} />
                <label
                  htmlFor={report.id}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {report.title}
                </label>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t">
            <label className="text-sm font-medium">Format</label>
            <Select defaultValue="pdf">
              <SelectTrigger className="mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pdf">PDF Document</SelectItem>
                <SelectItem value="csv">CSV Data</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button className="w-full mt-6">
            <Download className="h-4 w-4 mr-2" />
            Download Report
          </Button>
        </CardContent>
      </Card>
    </div>
  )

  const renderShare = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" onClick={() => setCurrentView("detailed")}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold text-foreground">Secure File Sharing</h1>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <QrCode className="h-5 w-5 text-primary" />
            <CardTitle>Share Medical Records</CardTitle>
          </div>
          <CardDescription>Create a secure link to share with healthcare providers</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-3 block">What to share</label>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="full-record"
                    checked={shareSettings.fullRecord}
                    onCheckedChange={(checked) =>
                      setShareSettings((prev) => ({ ...prev, fullRecord: checked as boolean }))
                    }
                  />
                  <label htmlFor="full-record" className="text-sm">
                    Full medical record
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="specific-report"
                    checked={shareSettings.specificReport}
                    onCheckedChange={(checked) =>
                      setShareSettings((prev) => ({ ...prev, specificReport: checked as boolean }))
                    }
                  />
                  <label htmlFor="specific-report" className="text-sm">
                    Specific report only
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="prescriptions"
                    checked={shareSettings.prescriptions}
                    onCheckedChange={(checked) =>
                      setShareSettings((prev) => ({ ...prev, prescriptions: checked as boolean }))
                    }
                  />
                  <label htmlFor="prescriptions" className="text-sm">
                    Current prescriptions
                  </label>
                </div>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Access duration</label>
              <Select
                value={shareSettings.duration}
                onValueChange={(value) => setShareSettings((prev) => ({ ...prev, duration: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">24 hours</SelectItem>
                  <SelectItem value="7">7 days</SelectItem>
                  <SelectItem value="30">30 days</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Permissions</label>
              <Select
                value={shareSettings.permission}
                onValueChange={(value) => setShareSettings((prev) => ({ ...prev, permission: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="view">View only</SelectItem>
                  <SelectItem value="download">View + Download</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button className="w-full">
            <Share2 className="h-4 w-4 mr-2" />
            Generate Secure Link
          </Button>

          <div className="p-4 bg-muted rounded-lg">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <QrCode className="h-4 w-4" />
              Share link created – expires in {shareSettings.duration} days
            </div>
            <div className="mt-2 p-2 bg-background rounded border text-sm font-mono break-all">
              https://sihahub.com/share/abc123xyz789
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderQR = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" onClick={() => setCurrentView("dashboard")}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold text-foreground">QR Code Access</h1>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="text-center space-y-6">
            <div className="mx-auto w-48 h-48 bg-white border-2 border-border rounded-lg flex items-center justify-center">
              <QrCode className="h-32 w-32 text-muted-foreground" />
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Scan this QR to access essential medical info</h3>
              <p className="text-sm text-muted-foreground">
                Only shows critical details (blood type, allergies, medications)
              </p>
            </div>

            <Button variant="outline" className="w-full bg-transparent">
              <QrCode className="h-4 w-4 mr-2" />
              Regenerate QR Code
            </Button>

            <div className="p-4 bg-muted rounded-lg text-left">
              <h4 className="font-medium mb-2">Emergency Information Included:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Blood Type: O+</li>
                <li>• Allergies: Penicillin</li>
                <li>• Current Medications: Lisinopril 10mg</li>
                <li>• Emergency Contact: +1 (555) 123-4567</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-md mx-auto">
        {currentView === "dashboard" && renderDashboard()}
        {currentView === "detailed" && renderDetailed()}
        {currentView === "download" && renderDownload()}
        {currentView === "share" && renderShare()}
        {currentView === "qr" && renderQR()}
      </div>
    </div>
  )
}
