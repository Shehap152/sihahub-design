"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  Bell,
  Calendar,
  Pill,
  MapPin,
  Shield,
  Clock,
  CheckCircle,
  AlertTriangle,
  Heart,
  Stethoscope,
  Settings,
  MoreVertical,
  Check,
  Droplets,
} from "lucide-react"

interface NotificationsProps {
  userName: string
  onBack: () => void
  onNavigateToBloodDonation?: () => void
  onNavigateToHealthTips?: () => void
}

type NotificationScreen = "list" | "detail" | "reminders" | "settings"

type NotificationType = "appointment" | "medication" | "blood-donation" | "health-alert" | "reminder"

interface Notification {
  id: string
  type: NotificationType
  title: string
  description: string
  timestamp: string
  isRead: boolean
  isUrgent: boolean
  actionData?: {
    appointmentId?: string
    medicationName?: string
    hospitalName?: string
    doctorName?: string
    time?: string
    date?: string
  }
}

interface Reminder {
  id: string
  name: string
  type: "medication" | "vaccination" | "checkup"
  schedule: string
  nextDue: string
  status: "pending" | "completed" | "overdue"
  isRecurring: boolean
}

export default function Notifications({
  userName,
  onBack,
  onNavigateToBloodDonation,
  onNavigateToHealthTips,
}: NotificationsProps) {
  const [currentScreen, setCurrentScreen] = useState<NotificationScreen>("list")
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null)
  const [activeFilter, setActiveFilter] = useState<"all" | "urgent" | "reminders">("all")

  // Mock notifications data
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "blood-donation",
      title: "Urgent Blood Request",
      description: "O+ blood needed at City General Hospital - 3 units required",
      timestamp: "30 minutes ago",
      isRead: false,
      isUrgent: true,
      actionData: {
        hospitalName: "City General Hospital",
      },
    },
    {
      id: "2",
      type: "appointment",
      title: "Appointment Reminder",
      description: "Tomorrow at 2:00 PM with Dr. Sarah Johnson",
      timestamp: "2 hours ago",
      isRead: false,
      isUrgent: false,
      actionData: {
        doctorName: "Dr. Sarah Johnson",
        date: "Tomorrow",
        time: "2:00 PM",
        appointmentId: "apt-123",
      },
    },
    {
      id: "3",
      type: "medication",
      title: "Medication Reminder",
      description: "Time to take your daily vitamins",
      timestamp: "3 hours ago",
      isRead: true,
      isUrgent: false,
      actionData: {
        medicationName: "Daily Vitamins",
        time: "8:00 AM",
      },
    },
    {
      id: "4",
      type: "health-alert",
      title: "Lab Results Available",
      description: "Your recent blood test results are now available for review",
      timestamp: "1 day ago",
      isRead: true,
      isUrgent: false,
    },
    {
      id: "5",
      type: "appointment",
      title: "Appointment Confirmed",
      description: "Your appointment with Dr. Michael Chen has been confirmed",
      timestamp: "2 days ago",
      isRead: true,
      isUrgent: false,
      actionData: {
        doctorName: "Dr. Michael Chen",
        date: "Friday",
        time: "10:30 AM",
        appointmentId: "apt-456",
      },
    },
  ])

  // Mock reminders data
  const [reminders, setReminders] = useState<Reminder[]>([
    {
      id: "1",
      name: "Daily Vitamins",
      type: "medication",
      schedule: "Daily at 8:00 AM",
      nextDue: "Tomorrow 8:00 AM",
      status: "pending",
      isRecurring: true,
    },
    {
      id: "2",
      name: "Blood Pressure Check",
      type: "checkup",
      schedule: "Weekly on Mondays",
      nextDue: "Monday 9:00 AM",
      status: "pending",
      isRecurring: true,
    },
    {
      id: "3",
      name: "Flu Vaccination",
      type: "vaccination",
      schedule: "Annual",
      nextDue: "Due in 2 months",
      status: "pending",
      isRecurring: false,
    },
    {
      id: "4",
      name: "Diabetes Medication",
      type: "medication",
      schedule: "Twice daily",
      nextDue: "Today 6:00 PM",
      status: "overdue",
      isRecurring: true,
    },
  ])

  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case "appointment":
        return Calendar
      case "medication":
        return Pill
      case "blood-donation":
        return MapPin
      case "health-alert":
        return Shield
      case "reminder":
        return Bell
      default:
        return Bell
    }
  }

  const getNotificationColor = (type: NotificationType, isUrgent: boolean) => {
    if (isUrgent) return "text-red-500"
    switch (type) {
      case "appointment":
        return "text-blue-500"
      case "medication":
        return "text-orange-500"
      case "blood-donation":
        return "text-red-500"
      case "health-alert":
        return "text-teal-500"
      default:
        return "text-gray-500"
    }
  }

  const filteredNotifications = notifications.filter((notification) => {
    if (activeFilter === "urgent") return notification.isUrgent
    if (activeFilter === "reminders") return notification.type === "reminder"
    return true
  })

  const urgentNotifications = notifications.filter((n) => n.isUrgent && !n.isRead)
  const unreadCount = notifications.filter((n) => !n.isRead).length

  const handleNotificationClick = (notification: Notification) => {
    setSelectedNotification(notification)
    setCurrentScreen("detail")
    // Mark as read
    setNotifications((prev) => prev.map((n) => (n.id === notification.id ? { ...n, isRead: true } : n)))
  }

  const handleMarkAsCompleted = (reminderId: string) => {
    setReminders((prev) => prev.map((r) => (r.id === reminderId ? { ...r, status: "completed" } : r)))
  }

  const handleSnoozeReminder = (reminderId: string) => {
    // In a real app, this would reschedule the reminder
    alert("Reminder snoozed for 1 hour")
  }

  const handleNotificationAction = (notification: Notification) => {
    if (notification.type === "blood-donation" && onNavigateToBloodDonation) {
      onNavigateToBloodDonation()
    } else if (notification.type === "medication" && onNavigateToHealthTips) {
      onNavigateToHealthTips()
    }
    // Mark as read when action is taken
    setNotifications((prev) => prev.map((n) => (n.id === notification.id ? { ...n, isRead: true } : n)))
  }

  // Notifications List Screen
  if (currentScreen === "list") {
    return (
      <div className="min-h-screen bg-neutral">
        {/* Header */}
        <div className="bg-card border-b border-border sticky top-0 z-10">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Button variant="ghost" size="icon" onClick={onBack}>
                  <ArrowLeft className="w-5 h-5" />
                </Button>
                <div>
                  <h1 className="text-xl font-bold text-foreground">Notifications</h1>
                  <p className="text-sm text-muted-foreground">
                    {unreadCount > 0 ? `${unreadCount} unread notifications` : "All caught up!"}
                  </p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setCurrentScreen("settings")}>
                <Settings className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        <div className="px-6 py-6 space-y-6">
          {/* Filter Tabs */}
          <div className="flex items-center space-x-2">
            <Button
              variant={activeFilter === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveFilter("all")}
              className={activeFilter === "all" ? "bg-teal-500 hover:bg-teal-600" : ""}
            >
              All
              {unreadCount > 0 && (
                <Badge className="ml-2 bg-red-500 text-white text-xs px-1.5 py-0.5">{unreadCount}</Badge>
              )}
            </Button>
            <Button
              variant={activeFilter === "urgent" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveFilter("urgent")}
              className={activeFilter === "urgent" ? "bg-red-500 hover:bg-red-600" : ""}
            >
              <AlertTriangle className="w-4 h-4 mr-1" />
              Urgent
              {urgentNotifications.length > 0 && (
                <Badge className="ml-2 bg-white text-red-500 text-xs px-1.5 py-0.5">{urgentNotifications.length}</Badge>
              )}
            </Button>
            <Button
              variant={activeFilter === "reminders" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveFilter("reminders")}
              className={activeFilter === "reminders" ? "bg-blue-500 hover:bg-blue-600" : ""}
            >
              Reminders
            </Button>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-4">
            <Card
              className="border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => setCurrentScreen("reminders")}
            >
              <CardContent className="p-4 text-center">
                <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <p className="font-semibold text-foreground">Reminders</p>
                <p className="text-xs text-muted-foreground mt-1">Manage your reminders</p>
              </CardContent>
            </Card>

            <Card
              className="border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => setCurrentScreen("settings")}
            >
              <CardContent className="p-4 text-center">
                <div className="w-12 h-12 bg-gray-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Settings className="w-6 h-6 text-white" />
                </div>
                <p className="font-semibold text-foreground">Settings</p>
                <p className="text-xs text-muted-foreground mt-1">Notification preferences</p>
              </CardContent>
            </Card>
          </div>

          {/* Urgent Alerts Banner */}
          {urgentNotifications.length > 0 && (
            <Card className="border-0 shadow-sm bg-red-50 border-l-4 border-l-red-500">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <AlertTriangle className="w-5 h-5 text-red-500" />
                  <div className="flex-1">
                    <p className="font-semibold text-red-900">Urgent Attention Required</p>
                    <p className="text-sm text-red-700">
                      You have {urgentNotifications.length} urgent notification
                      {urgentNotifications.length > 1 ? "s" : ""} that need immediate attention.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Notifications List */}
          <div className="space-y-3">
            {filteredNotifications.map((notification) => {
              const IconComponent = getNotificationIcon(notification.type)
              const iconColor = getNotificationColor(notification.type, notification.isUrgent)

              return (
                <Card
                  key={notification.id}
                  className={`border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer ${
                    !notification.isRead ? "bg-blue-50 border-l-4 border-l-blue-500" : ""
                  } ${notification.isUrgent ? "bg-red-50 border-l-4 border-l-red-500" : ""}`}
                  onClick={() => handleNotificationClick(notification)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <div
                        className={`w-10 h-10 ${
                          notification.isUrgent
                            ? "bg-red-500"
                            : notification.type === "appointment"
                              ? "bg-blue-500"
                              : notification.type === "medication"
                                ? "bg-orange-500"
                                : notification.type === "blood-donation"
                                  ? "bg-red-500"
                                  : "bg-teal-500"
                        } rounded-full flex items-center justify-center`}
                      >
                        <IconComponent className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold text-foreground text-sm">{notification.title}</h3>
                            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                              {notification.description}
                            </p>
                            <div className="flex items-center space-x-2 mt-2">
                              <Clock className="w-3 h-3 text-muted-foreground" />
                              <span className="text-xs text-muted-foreground">{notification.timestamp}</span>
                              {notification.isUrgent && <Badge className="bg-red-500 text-white text-xs">URGENT</Badge>}
                              {!notification.isRead && <div className="w-2 h-2 bg-blue-500 rounded-full"></div>}
                            </div>
                          </div>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {filteredNotifications.length === 0 && (
            <div className="text-center py-12">
              <Bell className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No notifications</h3>
              <p className="text-muted-foreground">
                {activeFilter === "urgent"
                  ? "No urgent notifications at the moment"
                  : activeFilter === "reminders"
                    ? "No reminder notifications"
                    : "You're all caught up!"}
              </p>
            </div>
          )}
        </div>
      </div>
    )
  }

  // Notification Detail Screen
  if (currentScreen === "detail" && selectedNotification) {
    const IconComponent = getNotificationIcon(selectedNotification.type)

    return (
      <div className="min-h-screen bg-neutral">
        {/* Header */}
        <div className="bg-card border-b border-border sticky top-0 z-10">
          <div className="px-6 py-4">
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="icon" onClick={() => setCurrentScreen("list")}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-xl font-bold text-foreground">Notification Details</h1>
                <p className="text-sm text-muted-foreground">{selectedNotification.timestamp}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 py-6 space-y-6">
          {/* Notification Header */}
          <Card
            className={`border-0 shadow-sm ${
              selectedNotification.isUrgent
                ? "border-l-4 border-l-red-500 bg-red-50"
                : "border-l-4 border-l-teal-500 bg-teal-50"
            }`}
          >
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div
                  className={`w-16 h-16 ${
                    selectedNotification.isUrgent
                      ? "bg-red-500"
                      : selectedNotification.type === "appointment"
                        ? "bg-blue-500"
                        : selectedNotification.type === "medication"
                          ? "bg-orange-500"
                          : selectedNotification.type === "blood-donation"
                            ? "bg-red-500"
                            : "bg-teal-500"
                  } rounded-full flex items-center justify-center`}
                >
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-foreground mb-2">{selectedNotification.title}</h2>
                  <p className="text-muted-foreground leading-relaxed">{selectedNotification.description}</p>
                  {selectedNotification.isUrgent && (
                    <Badge className="bg-red-500 text-white mt-3">URGENT ATTENTION REQUIRED</Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Details */}
          {selectedNotification.actionData && (
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {selectedNotification.actionData.doctorName && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Doctor</span>
                    <span className="text-sm font-semibold text-foreground">
                      {selectedNotification.actionData.doctorName}
                    </span>
                  </div>
                )}
                {selectedNotification.actionData.hospitalName && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Hospital</span>
                    <span className="text-sm font-semibold text-foreground">
                      {selectedNotification.actionData.hospitalName}
                    </span>
                  </div>
                )}
                {selectedNotification.actionData.date && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Date</span>
                    <span className="text-sm font-semibold text-foreground">
                      {selectedNotification.actionData.date}
                    </span>
                  </div>
                )}
                {selectedNotification.actionData.time && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Time</span>
                    <span className="text-sm font-semibold text-foreground">
                      {selectedNotification.actionData.time}
                    </span>
                  </div>
                )}
                {selectedNotification.actionData.medicationName && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Medication</span>
                    <span className="text-sm font-semibold text-foreground">
                      {selectedNotification.actionData.medicationName}
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Action Buttons */}
          <div className="space-y-3">
            {selectedNotification.type === "appointment" && (
              <Button className="w-full bg-blue-500 hover:bg-blue-600">
                <Calendar className="w-5 h-5 mr-2" />
                View Appointment
              </Button>
            )}
            {selectedNotification.type === "medication" && (
              <>
                <Button
                  className="w-full bg-orange-500 hover:bg-orange-600"
                  onClick={() => handleNotificationAction(selectedNotification)}
                >
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Mark as Taken
                </Button>
                <Button variant="outline" className="w-full bg-transparent" onClick={onNavigateToHealthTips}>
                  <Pill className="w-5 h-5 mr-2" />
                  Learn About Medications
                </Button>
              </>
            )}
            {selectedNotification.type === "blood-donation" && (
              <Button
                className="w-full bg-red-500 hover:bg-red-600"
                onClick={() => handleNotificationAction(selectedNotification)}
              >
                <Droplets className="w-5 h-5 mr-2" />
                Donate Now
              </Button>
            )}
            {selectedNotification.type === "health-alert" && (
              <Button className="w-full bg-teal-500 hover:bg-teal-600">
                <Stethoscope className="w-5 h-5 mr-2" />
                View Results
              </Button>
            )}
          </div>
        </div>
      </div>
    )
  }

  // Reminders Screen
  if (currentScreen === "reminders") {
    return (
      <div className="min-h-screen bg-neutral">
        {/* Header */}
        <div className="bg-card border-b border-border sticky top-0 z-10">
          <div className="px-6 py-4">
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="icon" onClick={() => setCurrentScreen("list")}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-xl font-bold text-foreground">Reminders</h1>
                <p className="text-sm text-muted-foreground">Manage your health reminders</p>
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 py-6 space-y-6">
          {/* Reminders List */}
          <div className="space-y-3">
            {reminders.map((reminder) => (
              <Card
                key={reminder.id}
                className={`border-0 shadow-sm ${
                  reminder.status === "overdue"
                    ? "bg-red-50 border-l-4 border-l-red-500"
                    : reminder.status === "pending"
                      ? "bg-orange-50 border-l-4 border-l-orange-500"
                      : "bg-green-50 border-l-4 border-l-green-500"
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <div
                        className={`w-10 h-10 ${
                          reminder.type === "medication"
                            ? "bg-orange-500"
                            : reminder.type === "vaccination"
                              ? "bg-blue-500"
                              : "bg-teal-500"
                        } rounded-full flex items-center justify-center`}
                      >
                        {reminder.type === "medication" && <Pill className="w-5 h-5 text-white" />}
                        {reminder.type === "vaccination" && <Shield className="w-5 h-5 text-white" />}
                        {reminder.type === "checkup" && <Stethoscope className="w-5 h-5 text-white" />}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground">{reminder.name}</h3>
                        <p className="text-sm text-muted-foreground">{reminder.schedule}</p>
                        <p className="text-sm text-muted-foreground mt-1">Next: {reminder.nextDue}</p>
                        <div className="flex items-center space-x-2 mt-2">
                          {reminder.status === "overdue" && (
                            <Badge className="bg-red-500 text-white text-xs">OVERDUE</Badge>
                          )}
                          {reminder.status === "pending" && (
                            <Badge className="bg-orange-100 text-orange-700 text-xs">PENDING</Badge>
                          )}
                          {reminder.status === "completed" && (
                            <Badge className="bg-green-100 text-green-700 text-xs">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              COMPLETED
                            </Badge>
                          )}
                          {reminder.isRecurring && (
                            <Badge variant="secondary" className="text-xs">
                              Recurring
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {reminder.status !== "completed" && (
                        <>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleSnoozeReminder(reminder.id)}
                            className="text-xs"
                          >
                            Snooze
                          </Button>
                          <Button
                            size="sm"
                            className="bg-teal-500 hover:bg-teal-600 text-xs"
                            onClick={() => handleMarkAsCompleted(reminder.id)}
                          >
                            <Check className="w-3 h-3 mr-1" />
                            Done
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Settings Screen
  if (currentScreen === "settings") {
    return (
      <div className="min-h-screen bg-neutral">
        {/* Header */}
        <div className="bg-card border-b border-border sticky top-0 z-10">
          <div className="px-6 py-4">
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="icon" onClick={() => setCurrentScreen("list")}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-xl font-bold text-foreground">Notification Settings</h1>
                <p className="text-sm text-muted-foreground">Manage your notification preferences</p>
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 py-6 space-y-6">
          {/* Notification Types */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Notification Types</CardTitle>
              <CardDescription>Choose which notifications you want to receive</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { type: "Appointments", icon: Calendar, enabled: true },
                { type: "Medications", icon: Pill, enabled: true },
                { type: "Blood Donations", icon: Heart, enabled: true },
                { type: "Health Alerts", icon: Shield, enabled: false },
                { type: "Reminders", icon: Clock, enabled: true },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <item.icon className="w-5 h-5 text-muted-foreground" />
                    <span className="font-medium text-foreground">{item.type}</span>
                  </div>
                  <div
                    className={`w-12 h-6 rounded-full ${
                      item.enabled ? "bg-teal-500" : "bg-gray-300"
                    } relative cursor-pointer transition-colors`}
                  >
                    <div
                      className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                        item.enabled ? "translate-x-6" : "translate-x-0.5"
                      }`}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quiet Hours */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Quiet Hours</CardTitle>
              <CardDescription>Set times when you don't want to receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-medium text-foreground">Enable Quiet Hours</span>
                <div className="w-12 h-6 rounded-full bg-teal-500 relative cursor-pointer">
                  <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 translate-x-6" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-muted-foreground">From</label>
                  <input
                    type="time"
                    defaultValue="22:00"
                    className="w-full mt-1 p-2 border border-border rounded-lg bg-card text-foreground"
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">To</label>
                  <input
                    type="time"
                    defaultValue="07:00"
                    className="w-full mt-1 p-2 border border-border rounded-lg bg-card text-foreground"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Emergency Notifications */}
          <Card className="border-0 shadow-sm bg-red-50 border-l-4 border-l-red-500">
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5" />
                <div>
                  <p className="font-semibold text-red-900 mb-2">Emergency Notifications</p>
                  <p className="text-sm text-red-800">
                    Emergency and urgent health notifications will always be delivered, even during quiet hours.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return null
}
