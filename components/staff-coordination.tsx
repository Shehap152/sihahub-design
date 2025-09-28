"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Calendar,
  Users,
  MessageSquare,
  Bell,
  AlertTriangle,
  CheckCircle,
  XCircle,
  ChevronRight,
  Plus,
  Send,
  Phone,
  Video,
  UserCheck,
  Stethoscope,
  Shield,
  Activity,
} from "lucide-react"

interface StaffCoordinationProps {
  onBack: () => void
}

interface ShiftSchedule {
  id: string
  staffId: string
  staffName: string
  role: string
  department: string
  date: string
  shift: "morning" | "afternoon" | "night"
  startTime: string
  endTime: string
  status: "scheduled" | "confirmed" | "absent" | "replaced"
}

interface Announcement {
  id: string
  title: string
  message: string
  priority: "low" | "medium" | "high" | "urgent"
  department?: string
  author: string
  timestamp: string
  read: boolean
}

interface StaffRequest {
  id: string
  requesterId: string
  requesterName: string
  type: "shift-swap" | "time-off" | "overtime" | "emergency-cover"
  description: string
  date: string
  status: "pending" | "approved" | "denied"
  timestamp: string
}

const mockSchedule: ShiftSchedule[] = [
  {
    id: "sh1",
    staffId: "s1",
    staffName: "Dr. Sarah Wilson",
    role: "doctor",
    department: "Emergency",
    date: "2024-01-24",
    shift: "morning",
    startTime: "06:00",
    endTime: "14:00",
    status: "confirmed",
  },
  {
    id: "sh2",
    staffId: "s2",
    staffName: "Nurse Jennifer Adams",
    role: "nurse",
    department: "ICU",
    date: "2024-01-24",
    shift: "night",
    startTime: "22:00",
    endTime: "06:00",
    status: "scheduled",
  },
  {
    id: "sh3",
    staffId: "s3",
    staffName: "Dr. Michael Chen",
    role: "doctor",
    department: "Cardiology",
    date: "2024-01-24",
    shift: "afternoon",
    startTime: "14:00",
    endTime: "22:00",
    status: "confirmed",
  },
]

const mockAnnouncements: Announcement[] = [
  {
    id: "a1",
    title: "New COVID-19 Protocols",
    message:
      "Updated safety protocols are now in effect. All staff must complete the new training module by end of week.",
    priority: "high",
    department: "All Departments",
    author: "Hospital Administration",
    timestamp: "2024-01-24 08:00",
    read: false,
  },
  {
    id: "a2",
    title: "Equipment Maintenance Schedule",
    message: "MRI Machine #2 will be offline for maintenance on January 26th from 2:00 PM to 6:00 PM.",
    priority: "medium",
    department: "Radiology",
    author: "Maintenance Team",
    timestamp: "2024-01-23 15:30",
    read: true,
  },
  {
    id: "a3",
    title: "Emergency Drill",
    message: "Fire safety drill scheduled for January 25th at 10:00 AM. All departments must participate.",
    priority: "urgent",
    author: "Safety Coordinator",
    timestamp: "2024-01-23 09:15",
    read: false,
  },
]

const mockRequests: StaffRequest[] = [
  {
    id: "r1",
    requesterId: "s2",
    requesterName: "Nurse Jennifer Adams",
    type: "shift-swap",
    description: "Need to swap night shift on Jan 25th with day shift due to family emergency.",
    date: "2024-01-25",
    status: "pending",
    timestamp: "2024-01-23 14:20",
  },
  {
    id: "r2",
    requesterId: "s4",
    requesterName: "Tech Alex Kumar",
    type: "time-off",
    description: "Requesting time off for medical appointment on Jan 26th afternoon.",
    date: "2024-01-26",
    status: "approved",
    timestamp: "2024-01-22 11:45",
  },
]

export default function StaffCoordination({ onBack }: StaffCoordinationProps) {
  const [activeTab, setActiveTab] = useState("schedule")
  const [newAnnouncement, setNewAnnouncement] = useState("")
  const [announcementPriority, setAnnouncementPriority] = useState<"low" | "medium" | "high" | "urgent">("medium")

  const getShiftStatusColor = (status: ShiftSchedule["status"]) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
      case "scheduled":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
      case "absent":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
      case "replaced":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
    }
  }

  const getPriorityColor = (priority: Announcement["priority"]) => {
    switch (priority) {
      case "urgent":
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

  const getRequestStatusColor = (status: StaffRequest["status"]) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
      case "pending":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400"
      case "denied":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
    }
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "doctor":
        return <Stethoscope className="w-4 h-4" />
      case "nurse":
        return <UserCheck className="w-4 h-4" />
      case "admin":
        return <Shield className="w-4 h-4" />
      case "technician":
        return <Activity className="w-4 h-4" />
      default:
        return <Users className="w-4 h-4" />
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
              <div>
                <h1 className="text-xl font-bold text-foreground">Staff Coordination</h1>
                <p className="text-sm text-muted-foreground">Manage schedules, communications & requests</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Bell className="w-4 h-4 mr-1" />
                Alerts
              </Button>
              <Button size="sm">
                <Plus className="w-4 h-4 mr-1" />
                Quick Action
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
            <TabsTrigger value="announcements">Announcements</TabsTrigger>
            <TabsTrigger value="requests">Requests</TabsTrigger>
            <TabsTrigger value="communication">Communication</TabsTrigger>
          </TabsList>

          {/* Schedule Tab */}
          <TabsContent value="schedule" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">Today's Schedule</h2>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Calendar className="w-4 h-4 mr-1" />
                  View Calendar
                </Button>
                <Button size="sm">
                  <Plus className="w-4 h-4 mr-1" />
                  Add Shift
                </Button>
              </div>
            </div>

            <div className="grid gap-4">
              {mockSchedule.map((shift) => (
                <Card key={shift.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                          {getRoleIcon(shift.role)}
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">{shift.staffName}</h3>
                          <p className="text-sm text-muted-foreground capitalize">
                            {shift.role} • {shift.department}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {shift.startTime} - {shift.endTime} ({shift.shift} shift)
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge className={getShiftStatusColor(shift.status)}>{shift.status}</Badge>
                        <div className="flex items-center space-x-1">
                          <Button size="sm" variant="outline">
                            <Phone className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <MessageSquare className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Shift Coverage Alerts */}
            <Card className="border-orange-200 bg-orange-50 dark:bg-orange-900/10 dark:border-orange-800">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-orange-700 dark:text-orange-400">
                  <AlertTriangle className="w-5 h-5" />
                  <span>Coverage Alerts</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-white dark:bg-card rounded-lg">
                    <div>
                      <p className="font-semibold text-foreground">ICU Night Shift - Short Staffed</p>
                      <p className="text-sm text-muted-foreground">Need 1 additional nurse for tonight's shift</p>
                    </div>
                    <Button size="sm">Find Coverage</Button>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white dark:bg-card rounded-lg">
                    <div>
                      <p className="font-semibold text-foreground">Emergency Department - Overtime Available</p>
                      <p className="text-sm text-muted-foreground">Extra shift available for Jan 26th morning</p>
                    </div>
                    <Button size="sm" variant="outline">
                      Post Opening
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Announcements Tab */}
          <TabsContent value="announcements" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">Hospital Announcements</h2>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                New Announcement
              </Button>
            </div>

            {/* Create Announcement */}
            <Card>
              <CardHeader>
                <CardTitle>Create Announcement</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="priority">Priority Level</Label>
                    <Select value={announcementPriority} onValueChange={setAnnouncementPriority}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="urgent">Urgent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="department">Target Department</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Departments</SelectItem>
                        <SelectItem value="emergency">Emergency</SelectItem>
                        <SelectItem value="icu">ICU</SelectItem>
                        <SelectItem value="surgery">Surgery</SelectItem>
                        <SelectItem value="cardiology">Cardiology</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Enter your announcement message..."
                    value={newAnnouncement}
                    onChange={(e) => setNewAnnouncement(e.target.value)}
                    rows={3}
                  />
                </div>
                <Button>
                  <Send className="w-4 h-4 mr-2" />
                  Send Announcement
                </Button>
              </CardContent>
            </Card>

            {/* Announcements List */}
            <div className="space-y-4">
              {mockAnnouncements.map((announcement) => (
                <Card key={announcement.id} className={!announcement.read ? "border-l-4 border-l-primary" : ""}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="font-semibold text-foreground">{announcement.title}</h3>
                          <Badge className={getPriorityColor(announcement.priority)}>{announcement.priority}</Badge>
                          {!announcement.read && <Badge variant="outline">New</Badge>}
                        </div>
                        <p className="text-sm text-foreground mb-2">{announcement.message}</p>
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                          <span>{announcement.author}</span>
                          <span>•</span>
                          <span>{announcement.timestamp}</span>
                          {announcement.department && (
                            <>
                              <span>•</span>
                              <span>{announcement.department}</span>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {announcement.priority === "urgent" && (
                          <Button size="sm" variant="outline">
                            Acknowledge
                          </Button>
                        )}
                        <Button size="sm" variant="ghost">
                          <Bell className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Requests Tab */}
          <TabsContent value="requests" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">Staff Requests</h2>
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="bg-orange-50 text-orange-700">
                  {mockRequests.filter((r) => r.status === "pending").length} Pending
                </Badge>
              </div>
            </div>

            <div className="space-y-4">
              {mockRequests.map((request) => (
                <Card key={request.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="font-semibold text-foreground">{request.requesterName}</h3>
                          <Badge variant="outline" className="capitalize">
                            {request.type.replace("-", " ")}
                          </Badge>
                          <Badge className={getRequestStatusColor(request.status)}>{request.status}</Badge>
                        </div>
                        <p className="text-sm text-foreground mb-2">{request.description}</p>
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                          <span>Requested: {request.timestamp}</span>
                          <span>•</span>
                          <span>Date: {request.date}</span>
                        </div>
                      </div>
                      {request.status === "pending" && (
                        <div className="flex items-center space-x-2">
                          <Button size="sm" variant="outline">
                            <XCircle className="w-4 h-4 mr-1" />
                            Deny
                          </Button>
                          <Button size="sm">
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Approve
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Communication Tab */}
          <TabsContent value="communication" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">Team Communication</h2>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Start Group Chat
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Send Department Message
                  </Button>
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <Phone className="w-4 h-4 mr-2" />
                    Emergency Call All
                  </Button>
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <Video className="w-4 h-4 mr-2" />
                    Start Team Meeting
                  </Button>
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <Bell className="w-4 h-4 mr-2" />
                    Send Alert
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Active Conversations</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-3 p-2 hover:bg-muted/50 rounded-lg cursor-pointer">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="bg-blue-100 text-blue-600">ER</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-semibold text-foreground text-sm">Emergency Team</p>
                      <p className="text-xs text-muted-foreground">New patient incoming...</p>
                    </div>
                    <Badge className="bg-red-100 text-red-800 text-xs">3</Badge>
                  </div>
                  <div className="flex items-center space-x-3 p-2 hover:bg-muted/50 rounded-lg cursor-pointer">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="bg-green-100 text-green-600">ICU</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-semibold text-foreground text-sm">ICU Staff</p>
                      <p className="text-xs text-muted-foreground">Shift handover notes</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-2 hover:bg-muted/50 rounded-lg cursor-pointer">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="bg-purple-100 text-purple-600">SU</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-semibold text-foreground text-sm">Surgery Team</p>
                      <p className="text-xs text-muted-foreground">Tomorrow's schedule</p>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800 text-xs">1</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Emergency Contacts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-foreground">Hospital Security</span>
                      <Button size="sm" variant="outline">
                        <Phone className="w-4 h-4 mr-1" />
                        Call
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-foreground">Maintenance</span>
                      <Button size="sm" variant="outline">
                        <Phone className="w-4 h-4 mr-1" />
                        Call
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-foreground">IT Support</span>
                      <Button size="sm" variant="outline">
                        <Phone className="w-4 h-4 mr-1" />
                        Call
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-foreground">Administration</span>
                      <Button size="sm" variant="outline">
                        <Phone className="w-4 h-4 mr-1" />
                        Call
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-foreground">Pharmacy</span>
                      <Button size="sm" variant="outline">
                        <Phone className="w-4 h-4 mr-1" />
                        Call
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-foreground">Lab Services</span>
                      <Button size="sm" variant="outline">
                        <Phone className="w-4 h-4 mr-1" />
                        Call
                      </Button>
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
