"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Video,
  VideoOff,
  Mic,
  MicOff,
  Phone,
  PhoneOff,
  MessageSquare,
  Send,
  FileText,
  Upload,
  Download,
  Share,
  Clock,
  Users,
  Monitor,
  Settings,
  ChevronRight,
  Search,
  Plus,
  ImageIcon,
  File,
  CheckCircle,
  AlertCircle,
  Star,
  MoreVertical,
  Activity,
} from "lucide-react"

interface TelemedicineSystemProps {
  userRole: "patient" | "doctor" | "hospital"
  userName: string
  onBack: () => void
}

interface VideoCall {
  id: string
  patientId: string
  patientName: string
  doctorId: string
  doctorName: string
  scheduledTime: string
  duration: number
  status: "scheduled" | "in-progress" | "completed" | "cancelled"
  type: "consultation" | "follow-up" | "emergency" | "second-opinion"
  notes?: string
  recordingUrl?: string
}

interface Message {
  id: string
  senderId: string
  senderName: string
  senderRole: "patient" | "doctor" | "nurse" | "admin"
  recipientId: string
  recipientName: string
  content: string
  timestamp: string
  type: "text" | "file" | "image" | "voice"
  fileUrl?: string
  fileName?: string
  isRead: boolean
  isUrgent: boolean
}

interface Consultation {
  id: string
  patientId: string
  patientName: string
  doctorId: string
  doctorName: string
  date: string
  time: string
  duration: number
  type: "video" | "audio" | "chat"
  status: "scheduled" | "in-progress" | "completed" | "cancelled"
  symptoms: string[]
  diagnosis?: string
  prescription?: string
  followUpRequired: boolean
  rating?: number
  feedback?: string
}

const mockVideoCalls: VideoCall[] = [
  {
    id: "vc1",
    patientId: "p1",
    patientName: "John Doe",
    doctorId: "d1",
    doctorName: "Dr. Sarah Wilson",
    scheduledTime: "2024-01-20T14:00:00",
    duration: 30,
    status: "scheduled",
    type: "consultation",
    notes: "Follow-up for hypertension management",
  },
  {
    id: "vc2",
    patientId: "p2",
    patientName: "Jane Smith",
    doctorId: "d1",
    doctorName: "Dr. Sarah Wilson",
    scheduledTime: "2024-01-20T15:30:00",
    duration: 45,
    status: "in-progress",
    type: "follow-up",
  },
  {
    id: "vc3",
    patientId: "p3",
    patientName: "Mike Johnson",
    doctorId: "d1",
    doctorName: "Dr. Sarah Wilson",
    scheduledTime: "2024-01-19T10:00:00",
    duration: 25,
    status: "completed",
    type: "consultation",
    recordingUrl: "/recordings/vc3.mp4",
  },
]

const mockMessages: Message[] = [
  {
    id: "m1",
    senderId: "p1",
    senderName: "John Doe",
    senderRole: "patient",
    recipientId: "d1",
    recipientName: "Dr. Sarah Wilson",
    content: "Hi Dr. Wilson, I've been experiencing some side effects from the new medication.",
    timestamp: "2024-01-20T09:30:00",
    type: "text",
    isRead: true,
    isUrgent: false,
  },
  {
    id: "m2",
    senderId: "d1",
    senderName: "Dr. Sarah Wilson",
    senderRole: "doctor",
    recipientId: "p1",
    recipientName: "John Doe",
    content: "I understand your concern. Can you describe the specific side effects you're experiencing?",
    timestamp: "2024-01-20T09:45:00",
    type: "text",
    isRead: true,
    isUrgent: false,
  },
  {
    id: "m3",
    senderId: "p1",
    senderName: "John Doe",
    senderRole: "patient",
    recipientId: "d1",
    recipientName: "Dr. Sarah Wilson",
    content: "I've been feeling dizzy and nauseous, especially in the mornings.",
    timestamp: "2024-01-20T10:00:00",
    type: "text",
    isRead: false,
    isUrgent: true,
  },
]

const mockConsultations: Consultation[] = [
  {
    id: "c1",
    patientId: "p1",
    patientName: "John Doe",
    doctorId: "d1",
    doctorName: "Dr. Sarah Wilson",
    date: "2024-01-20",
    time: "14:00",
    duration: 30,
    type: "video",
    status: "scheduled",
    symptoms: ["headache", "dizziness", "fatigue"],
    followUpRequired: true,
  },
  {
    id: "c2",
    patientId: "p2",
    patientName: "Jane Smith",
    doctorId: "d1",
    doctorName: "Dr. Sarah Wilson",
    date: "2024-01-19",
    time: "10:00",
    duration: 45,
    type: "video",
    status: "completed",
    symptoms: ["chest pain", "shortness of breath"],
    diagnosis: "Anxiety-related symptoms",
    prescription: "Prescribed relaxation techniques and follow-up in 2 weeks",
    followUpRequired: true,
    rating: 5,
    feedback: "Very helpful consultation, doctor was very understanding",
  },
]

export default function TelemedicineSystem({ userRole, userName, onBack }: TelemedicineSystemProps) {
  const [activeTab, setActiveTab] = useState("video-calls")
  const [selectedCall, setSelectedCall] = useState<VideoCall | null>(null)
  const [selectedConsultation, setSelectedConsultation] = useState<Consultation | null>(null)
  const [isInCall, setIsInCall] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOff, setIsVideoOff] = useState(false)
  const [newMessage, setNewMessage] = useState("")
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null)

  const getCallStatusColor = (status: VideoCall["status"]) => {
    switch (status) {
      case "scheduled":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
      case "in-progress":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
      case "completed":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
      case "cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
    }
  }

  const getCallTypeColor = (type: VideoCall["type"]) => {
    switch (type) {
      case "consultation":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400"
      case "follow-up":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
      case "emergency":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
      case "second-opinion":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
    }
  }

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString()
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
                <h1 className="text-xl font-bold text-foreground">Telemedicine & Communication</h1>
                <p className="text-sm text-muted-foreground">Virtual healthcare platform</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-1" />
                Settings
              </Button>
              <Button size="sm">
                <Plus className="w-4 h-4 mr-1" />
                New Consultation
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="video-calls">Video Calls</TabsTrigger>
            <TabsTrigger value="messaging">Messaging</TabsTrigger>
            <TabsTrigger value="consultations">Consultations</TabsTrigger>
            <TabsTrigger value="file-sharing">File Sharing</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Video Calls Tab */}
          <TabsContent value="video-calls" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">Video Calls</h2>
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="bg-green-50 text-green-700">
                  {mockVideoCalls.filter((call) => call.status === "in-progress").length} Active
                </Badge>
                <Badge variant="outline" className="bg-blue-50 text-blue-700">
                  {mockVideoCalls.filter((call) => call.status === "scheduled").length} Scheduled
                </Badge>
                <Button size="sm">
                  <Video className="w-4 h-4 mr-1" />
                  Start Call
                </Button>
              </div>
            </div>

            {/* Active Call Interface */}
            {isInCall && (
              <Card className="border-green-200 bg-green-50 dark:bg-green-900/10 dark:border-green-800">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="font-semibold text-foreground">Call in Progress</span>
                      <Badge className="bg-green-100 text-green-800">00:15:32</Badge>
                    </div>
                    <Button variant="destructive" size="sm" onClick={() => setIsInCall(false)}>
                      <PhoneOff className="w-4 h-4 mr-1" />
                      End Call
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    {/* Video Feed */}
                    <div className="aspect-video bg-gray-900 rounded-lg relative overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center text-white">
                          <Avatar className="w-20 h-20 mx-auto mb-2">
                            <AvatarImage src="/patient-profile.png" />
                            <AvatarFallback>JD</AvatarFallback>
                          </Avatar>
                          <p className="text-sm">John Doe</p>
                        </div>
                      </div>
                      <div className="absolute bottom-2 left-2">
                        <Badge variant="secondary">Patient</Badge>
                      </div>
                    </div>

                    <div className="aspect-video bg-gray-900 rounded-lg relative overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center text-white">
                          <Avatar className="w-20 h-20 mx-auto mb-2">
                            <AvatarImage src="/doctor-profile.png" />
                            <AvatarFallback>SW</AvatarFallback>
                          </Avatar>
                          <p className="text-sm">Dr. Sarah Wilson</p>
                        </div>
                      </div>
                      <div className="absolute bottom-2 left-2">
                        <Badge variant="secondary">Doctor</Badge>
                      </div>
                    </div>
                  </div>

                  {/* Call Controls */}
                  <div className="flex items-center justify-center space-x-4">
                    <Button
                      variant={isMuted ? "destructive" : "outline"}
                      size="icon"
                      onClick={() => setIsMuted(!isMuted)}
                    >
                      {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                    </Button>
                    <Button
                      variant={isVideoOff ? "destructive" : "outline"}
                      size="icon"
                      onClick={() => setIsVideoOff(!isVideoOff)}
                    >
                      {isVideoOff ? <VideoOff className="w-4 h-4" /> : <Video className="w-4 h-4" />}
                    </Button>
                    <Button variant="outline" size="icon">
                      <Monitor className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <MessageSquare className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Scheduled Calls */}
            <div className="space-y-4">
              {mockVideoCalls.map((call) => (
                <Card
                  key={call.id}
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => setSelectedCall(call)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                          <Video className="w-6 h-6 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="font-semibold text-foreground">
                              {userRole === "doctor" ? call.patientName : call.doctorName}
                            </h3>
                            <Badge className={getCallStatusColor(call.status)}>{call.status}</Badge>
                            <Badge className={getCallTypeColor(call.type)}>{call.type}</Badge>
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm mb-2">
                            <div>
                              <span className="text-muted-foreground">Scheduled: </span>
                              <span className="text-foreground">
                                {formatDate(call.scheduledTime)} at {formatTime(call.scheduledTime)}
                              </span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Duration: </span>
                              <span className="text-foreground">{call.duration} minutes</span>
                            </div>
                          </div>
                          {call.notes && <p className="text-sm text-muted-foreground">{call.notes}</p>}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {call.status === "scheduled" && (
                          <Button size="sm" onClick={() => setIsInCall(true)}>
                            <Video className="w-4 h-4 mr-1" />
                            Join
                          </Button>
                        )}
                        {call.status === "completed" && call.recordingUrl && (
                          <Button size="sm" variant="outline">
                            <Download className="w-4 h-4 mr-1" />
                            Recording
                          </Button>
                        )}
                        <Button size="sm" variant="outline">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Messaging Tab */}
          <TabsContent value="messaging" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">Secure Messaging</h2>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input placeholder="Search conversations..." className="pl-10 w-64" />
                </div>
                <Button size="sm">
                  <MessageSquare className="w-4 h-4 mr-1" />
                  New Message
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Conversations List */}
              <Card className="lg:col-span-1">
                <CardHeader>
                  <CardTitle>Conversations</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="space-y-1">
                    {Array.from(
                      new Set(mockMessages.map((m) => (userRole === "doctor" ? m.senderId : m.recipientId))),
                    ).map((conversationId, index) => {
                      const lastMessage = mockMessages
                        .filter((m) => m.senderId === conversationId || m.recipientId === conversationId)
                        .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())[0]
                      const unreadCount = mockMessages.filter(
                        (m) => (m.senderId === conversationId || m.recipientId === conversationId) && !m.isRead,
                      ).length

                      return (
                        <div
                          key={conversationId}
                          className={`p-3 cursor-pointer hover:bg-muted/50 border-b ${
                            selectedConversation === conversationId ? "bg-muted" : ""
                          }`}
                          onClick={() => setSelectedConversation(conversationId)}
                        >
                          <div className="flex items-center space-x-3">
                            <Avatar className="w-10 h-10">
                              <AvatarImage src={`/${lastMessage.senderRole}-profile.png`} />
                              <AvatarFallback>{lastMessage.senderName.charAt(0).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <p className="font-semibold text-sm text-foreground truncate">
                                  {lastMessage.senderName}
                                </p>
                                <span className="text-xs text-muted-foreground">
                                  {formatTime(lastMessage.timestamp)}
                                </span>
                              </div>
                              <p className="text-sm text-muted-foreground truncate">{lastMessage.content}</p>
                              <div className="flex items-center justify-between mt-1">
                                <Badge variant="outline" className="text-xs">
                                  {lastMessage.senderRole}
                                </Badge>
                                {unreadCount > 0 && (
                                  <Badge className="bg-red-500 text-white text-xs">{unreadCount}</Badge>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Chat Interface */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>{selectedConversation ? "Dr. Sarah Wilson" : "Select a conversation"}</CardTitle>
                    {selectedConversation && (
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="outline">
                          <Video className="w-4 h-4 mr-1" />
                          Video Call
                        </Button>
                        <Button size="sm" variant="outline">
                          <Phone className="w-4 h-4 mr-1" />
                          Voice Call
                        </Button>
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {selectedConversation ? (
                    <>
                      {/* Messages */}
                      <div className="h-96 overflow-y-auto space-y-4 p-4 bg-muted/20 rounded-lg">
                        {mockMessages
                          .filter((m) => m.senderId === selectedConversation || m.recipientId === selectedConversation)
                          .map((message) => (
                            <div
                              key={message.id}
                              className={`flex ${
                                message.senderId === selectedConversation ? "justify-start" : "justify-end"
                              }`}
                            >
                              <div
                                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                                  message.senderId === selectedConversation
                                    ? "bg-card text-foreground"
                                    : "bg-primary text-primary-foreground"
                                }`}
                              >
                                <div className="flex items-center space-x-2 mb-1">
                                  <span className="text-xs font-semibold">{message.senderName}</span>
                                  {message.isUrgent && <AlertCircle className="w-3 h-3 text-red-500" />}
                                </div>
                                <p className="text-sm">{message.content}</p>
                                <div className="flex items-center justify-between mt-1">
                                  <span className="text-xs opacity-70">{formatTime(message.timestamp)}</span>
                                  {message.senderId !== selectedConversation && (
                                    <CheckCircle className="w-3 h-3 opacity-70" />
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>

                      {/* Message Input */}
                      <div className="flex items-center space-x-2">
                        <Button size="icon" variant="outline">
                          <ImageIcon className="w-4 h-4" />
                        </Button>
                        <Button size="icon" variant="outline">
                          <ImageIcon className="w-4 h-4" />
                        </Button>
                        <Input
                          placeholder="Type your message..."
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          className="flex-1"
                        />
                        <Button size="icon">
                          <Send className="w-4 h-4" />
                        </Button>
                      </div>
                    </>
                  ) : (
                    <div className="h-96 flex items-center justify-center text-muted-foreground">
                      <div className="text-center">
                        <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p>Select a conversation to start messaging</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Consultations Tab */}
          <TabsContent value="consultations" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">Remote Consultations</h2>
              <div className="flex items-center space-x-2">
                <Select defaultValue="all">
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="video">Video</SelectItem>
                    <SelectItem value="audio">Audio</SelectItem>
                    <SelectItem value="chat">Chat</SelectItem>
                  </SelectContent>
                </Select>
                <Button size="sm">
                  <Plus className="w-4 h-4 mr-1" />
                  Schedule Consultation
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              {mockConsultations.map((consultation) => (
                <Card
                  key={consultation.id}
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => setSelectedConsultation(consultation)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                          {consultation.type === "video" && <Video className="w-6 h-6 text-purple-600" />}
                          {consultation.type === "audio" && <Phone className="w-6 h-6 text-purple-600" />}
                          {consultation.type === "chat" && <MessageSquare className="w-6 h-6 text-purple-600" />}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="font-semibold text-foreground">
                              {userRole === "doctor" ? consultation.patientName : consultation.doctorName}
                            </h3>
                            <Badge className={getCallStatusColor(consultation.status)}>{consultation.status}</Badge>
                            <Badge variant="outline" className="capitalize">
                              {consultation.type}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm mb-2">
                            <div>
                              <span className="text-muted-foreground">Date: </span>
                              <span className="text-foreground">
                                {consultation.date} at {consultation.time}
                              </span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Duration: </span>
                              <span className="text-foreground">{consultation.duration} minutes</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="text-sm text-muted-foreground">Symptoms:</span>
                            <div className="flex items-center space-x-1">
                              {consultation.symptoms.slice(0, 3).map((symptom) => (
                                <Badge key={symptom} variant="outline" className="text-xs">
                                  {symptom}
                                </Badge>
                              ))}
                              {consultation.symptoms.length > 3 && (
                                <Badge variant="outline" className="text-xs">
                                  +{consultation.symptoms.length - 3}
                                </Badge>
                              )}
                            </div>
                          </div>
                          {consultation.diagnosis && (
                            <p className="text-sm text-muted-foreground">
                              <span className="font-semibold">Diagnosis:</span> {consultation.diagnosis}
                            </p>
                          )}
                          {consultation.rating && (
                            <div className="flex items-center space-x-1 mt-2">
                              <span className="text-sm text-muted-foreground">Rating:</span>
                              {Array.from({ length: 5 }, (_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < consultation.rating! ? "text-yellow-500 fill-current" : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {consultation.status === "scheduled" && (
                          <Button size="sm">
                            {consultation.type === "video" && <Video className="w-4 h-4 mr-1" />}
                            {consultation.type === "audio" && <Phone className="w-4 h-4 mr-1" />}
                            {consultation.type === "chat" && <MessageSquare className="w-4 h-4 mr-1" />}
                            Start
                          </Button>
                        )}
                        {consultation.followUpRequired && (
                          <Badge variant="outline" className="bg-orange-50 text-orange-700">
                            Follow-up Required
                          </Badge>
                        )}
                        <Button size="sm" variant="outline">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* File Sharing Tab */}
          <TabsContent value="file-sharing" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">Secure File Sharing</h2>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-1" />
                  Download All
                </Button>
                <Button size="sm">
                  <Upload className="w-4 h-4 mr-1" />
                  Upload Files
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Recent Files */}
              <Card className="md:col-span-2 lg:col-span-2">
                <CardHeader>
                  <CardTitle>Recent Files</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    {
                      name: "Lab Results - Blood Work.pdf",
                      type: "pdf",
                      size: "2.4 MB",
                      uploadedBy: "Dr. Sarah Wilson",
                      uploadedAt: "2024-01-20T10:30:00",
                      shared: true,
                    },
                    {
                      name: "X-Ray Chest.jpg",
                      type: "image",
                      size: "1.8 MB",
                      uploadedBy: "Radiology Dept",
                      uploadedAt: "2024-01-19T15:45:00",
                      shared: false,
                    },
                    {
                      name: "Prescription.pdf",
                      type: "pdf",
                      size: "156 KB",
                      uploadedBy: "Dr. Sarah Wilson",
                      uploadedAt: "2024-01-19T09:15:00",
                      shared: true,
                    },
                  ].map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                          {file.type === "pdf" && <FileText className="w-5 h-5 text-blue-600" />}
                          {file.type === "image" && <ImageIcon className="w-5 h-5 text-blue-600" />}
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">{file.name}</p>
                          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <span>{file.size}</span>
                            <span>•</span>
                            <span>{file.uploadedBy}</span>
                            <span>•</span>
                            <span>{formatDate(file.uploadedAt)}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {file.shared && (
                          <Badge variant="outline" className="bg-green-50 text-green-700">
                            Shared
                          </Badge>
                        )}
                        <Button size="sm" variant="outline">
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Share className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* File Categories */}
              <Card>
                <CardHeader>
                  <CardTitle>File Categories</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { name: "Lab Results", count: 12, icon: FileText, color: "text-blue-600" },
                    { name: "Medical Images", count: 8, icon: ImageIcon, color: "text-green-600" },
                    { name: "Prescriptions", count: 15, icon: File, color: "text-purple-600" },
                    { name: "Reports", count: 6, icon: FileText, color: "text-orange-600" },
                  ].map((category) => (
                    <div
                      key={category.name}
                      className="flex items-center justify-between p-2 hover:bg-muted/50 rounded-lg cursor-pointer"
                    >
                      <div className="flex items-center space-x-3">
                        <category.icon className={`w-5 h-5 ${category.color}`} />
                        <span className="font-medium text-foreground">{category.name}</span>
                      </div>
                      <Badge variant="outline">{category.count}</Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Upload Area */}
            <Card className="border-dashed border-2 border-muted-foreground/25">
              <CardContent className="p-8">
                <div className="text-center">
                  <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">Upload Medical Files</h3>
                  <p className="text-muted-foreground mb-4">
                    Drag and drop files here or click to browse. Supports PDF, JPG, PNG, DICOM files.
                  </p>
                  <Button>
                    <Upload className="w-4 h-4 mr-2" />
                    Choose Files
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">Telemedicine Analytics</h2>
              <Select defaultValue="30days">
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
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Video className="w-5 h-5" />
                    <span>Total Consultations</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-foreground mb-2">156</div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Badge className="bg-green-100 text-green-800">+12%</Badge>
                    <span className="text-muted-foreground">vs last month</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Clock className="w-5 h-5" />
                    <span>Avg Duration</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-foreground mb-2">28m</div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Badge className="bg-blue-100 text-blue-800">+2m</Badge>
                    <span className="text-muted-foreground">vs last month</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="w-5 h-5" />
                    <span>Patient Satisfaction</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-foreground mb-2">4.8</div>
                  <div className="flex items-center space-x-1">
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < 5 ? "text-yellow-500 fill-current" : "text-gray-300"}`} />
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MessageSquare className="w-5 h-5" />
                    <span>Messages Sent</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-foreground mb-2">1,247</div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Badge className="bg-purple-100 text-purple-800">+18%</Badge>
                    <span className="text-muted-foreground">vs last month</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Consultation Types Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Consultation Types Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-4">
                    {[
                      { type: "Video Calls", count: 89, percentage: 57, color: "bg-blue-500" },
                      { type: "Audio Calls", count: 45, percentage: 29, color: "bg-green-500" },
                      { type: "Chat Only", count: 22, percentage: 14, color: "bg-purple-500" },
                    ].map((item) => (
                      <div key={item.type} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-foreground">{item.type}</span>
                          <span className="text-sm text-muted-foreground">{item.count}</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${item.color}`}
                            style={{ width: `${item.percentage}%` }}
                          ></div>
                        </div>
                        <div className="text-xs text-muted-foreground">{item.percentage}% of total</div>
                      </div>
                    ))}
                  </div>
                  <div className="md:col-span-2">
                    <div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center">
                      <div className="text-center text-muted-foreground">
                        <Activity className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p>Consultation trends chart would be displayed here</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Performance Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Response Times</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { metric: "Avg Response Time", value: "2.3 minutes", status: "good" },
                    { metric: "First Response", value: "45 seconds", status: "excellent" },
                    { metric: "Resolution Time", value: "18 minutes", status: "good" },
                  ].map((item) => (
                    <div key={item.metric} className="flex items-center justify-between">
                      <span className="text-sm text-foreground">{item.metric}</span>
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold text-foreground">{item.value}</span>
                        <div
                          className={`w-2 h-2 rounded-full ${
                            item.status === "excellent"
                              ? "bg-green-500"
                              : item.status === "good"
                                ? "bg-blue-500"
                                : "bg-orange-500"
                          }`}
                        ></div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Platform Usage</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { platform: "Web Browser", usage: 68, color: "bg-blue-500" },
                    { platform: "Mobile App", usage: 28, color: "bg-green-500" },
                    { platform: "Desktop App", usage: 4, color: "bg-purple-500" },
                  ].map((item) => (
                    <div key={item.platform} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-foreground">{item.platform}</span>
                        <span className="text-sm text-muted-foreground">{item.usage}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className={`h-2 rounded-full ${item.color}`} style={{ width: `${item.usage}%` }}></div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
