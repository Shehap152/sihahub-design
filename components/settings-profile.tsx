"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { useToast } from "@/hooks/use-toast"
import {
  ArrowLeft,
  User,
  Shield,
  Bell,
  ChevronRight,
  Edit,
  Eye,
  EyeOff,
  Smartphone,
  Monitor,
  Trash2,
  Moon,
  Sun,
  Palette,
  SettingsIcon,
  Languages,
  Info,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface SettingsProfileProps {
  userName: string
  userRole: string
  onBack: () => void
}

export default function SettingsProfile({ userName, userRole, onBack }: SettingsProfileProps) {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const { toast } = useToast()
  const [currentView, setCurrentView] = useState<
    "main" | "profile" | "privacy" | "notifications" | "language" | "support" | "appearance"
  >("main")
  const [isEditing, setIsEditing] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [profileData, setProfileData] = useState({
    name: userName,
    phone: "+1 (555) 123-4567",
    email: "alex.johnson@email.com",
    dateOfBirth: "1990-05-15",
    gender: "male",
    bloodType: "O+",
  })
  const [privacySettings, setPrivacySettings] = useState({
    shareRecords: false,
    twoFactor: true,
  })
  const [notificationSettings, setNotificationSettings] = useState({
    appointments: true,
    medications: true,
    vaccinations: true,
    bloodDonation: false,
    healthTips: true,
    quietHours: false,
  })
  const [accessibilitySettings, setAccessibilitySettings] = useState({
    fontSize: "medium",
    highContrast: false,
    voiceAssistance: false,
  })

  const menuSections = [
    {
      title: "Account",
      items: [
        {
          id: "profile",
          icon: User,
          title: "Profile Management",
          description: "Personal information and account details",
          color: "#0D9488",
        },
      ],
    },
    {
      title: "Security & Privacy",
      items: [
        {
          id: "privacy",
          icon: Shield,
          title: "Privacy & Security",
          description: "Data protection and security settings",
          color: "#DC2626",
        },
      ],
    },
    {
      title: "Preferences",
      items: [
        {
          id: "notifications",
          icon: Bell,
          title: "Notifications",
          description: "Alert preferences and quiet hours",
          color: "#0369A1",
        },
        {
          id: "appearance",
          icon: Palette,
          title: "Appearance",
          description: "Theme and display preferences",
          color: "#8B5CF6",
        },
        {
          id: "language",
          icon: Languages,
          title: "Language & Accessibility",
          description: "Language and accessibility options",
          color: "#059669",
        },
      ],
    },
    {
      title: "Support",
      items: [
        {
          id: "support",
          icon: Info,
          title: "About & Support",
          description: "Help, terms, and app information",
          color: "#6B7280",
        },
      ],
    },
  ]

  const activeSessions = [
    { device: "iPhone 14", location: "New York, NY", lastActive: "Active now", current: true },
    { device: "MacBook Pro", location: "New York, NY", lastActive: "2 hours ago", current: false },
    { device: "iPad Air", location: "Boston, MA", lastActive: "1 day ago", current: false },
  ]

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSaveProfile = () => {
    setIsEditing(false)
    toast({
      title: "Success",
      description: "Profile updated successfully!",
    })
  }

  const handlePasswordUpdate = () => {
    toast({
      title: "Success",
      description: "Password updated successfully!",
    })
  }

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme)
    toast({
      title: "Theme Updated",
      description: `Switched to ${newTheme === "system" ? "system preference" : newTheme + " mode"}`,
    })
  }

  const renderMain = () => (
    <div className="space-y-6 animate-fade-in-up">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-foreground mb-2">Settings</h1>
        <p className="text-muted-foreground">Manage your account and preferences</p>
      </div>

      {menuSections.map((section, sectionIndex) => (
        <div key={section.title} className="space-y-3" style={{ animationDelay: `${sectionIndex * 0.1}s` }}>
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider px-1">{section.title}</h2>
          <div className="space-y-2">
            {section.items.map((item, itemIndex) => {
              const Icon = item.icon
              return (
                <Card
                  key={item.id}
                  className="cursor-pointer card-hover btn-press transition-all duration-300"
                  onClick={() => setCurrentView(item.id as any)}
                  style={{ animationDelay: `${(sectionIndex * section.items.length + itemIndex) * 0.05}s` }}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg" style={{ backgroundColor: `${item.color}20` }}>
                          <Icon className="h-5 w-5" style={{ color: item.color }} />
                        </div>
                        <div>
                          <h3 className="font-medium text-foreground">{item.title}</h3>
                          <p className="text-sm text-muted-foreground">{item.description}</p>
                        </div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )

  const renderAppearance = () => (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" onClick={() => setCurrentView("main")} className="btn-press">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/30">
            <Palette className="h-5 w-5 text-purple-600 dark:text-purple-400" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Appearance</h1>
        </div>
      </div>

      <Card className="card-hover">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <SettingsIcon className="h-5 w-5" />
            Theme Settings
          </CardTitle>
          <CardDescription>Choose your preferred theme - changes apply instantly</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {mounted && (
            <div className="p-3 bg-muted/50 rounded-lg">
              <div className="text-sm text-muted-foreground">
                Current theme:{" "}
                <span className="font-medium capitalize text-foreground">
                  {theme === "system" ? `System (${resolvedTheme})` : theme}
                </span>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 gap-3">
            <Button
              variant={theme === "light" ? "default" : "outline"}
              onClick={() => handleThemeChange("light")}
              className={`flex items-center gap-3 h-auto p-4 justify-start transition-all duration-300 ${
                theme === "light"
                  ? "ring-2 ring-primary ring-offset-2 ring-offset-background shadow-lg scale-[1.02]"
                  : "hover:bg-muted hover:shadow-md hover:scale-[1.01]"
              }`}
            >
              <div className={`p-2 rounded-lg ${theme === "light" ? "bg-primary-foreground/20" : "bg-muted"}`}>
                <Sun className={`h-5 w-5 ${theme === "light" ? "text-primary-foreground" : "text-foreground"}`} />
              </div>
              <div className="text-left">
                <div className="font-medium">Light Mode</div>
                <div className="text-sm opacity-80">Clean and bright interface</div>
              </div>
            </Button>

            <Button
              variant={theme === "dark" ? "default" : "outline"}
              onClick={() => handleThemeChange("dark")}
              className={`flex items-center gap-3 h-auto p-4 justify-start transition-all duration-300 ${
                theme === "dark"
                  ? "ring-2 ring-primary ring-offset-2 ring-offset-background shadow-lg scale-[1.02]"
                  : "hover:bg-muted hover:shadow-md hover:scale-[1.01]"
              }`}
            >
              <div className={`p-2 rounded-lg ${theme === "dark" ? "bg-primary-foreground/20" : "bg-muted"}`}>
                <Moon className={`h-5 w-5 ${theme === "dark" ? "text-primary-foreground" : "text-foreground"}`} />
              </div>
              <div className="text-left">
                <div className="font-medium">Dark Mode</div>
                <div className="text-sm opacity-80">Easy on the eyes</div>
              </div>
            </Button>

            <Button
              variant={theme === "system" ? "default" : "outline"}
              onClick={() => handleThemeChange("system")}
              className={`flex items-center gap-3 h-auto p-4 justify-start transition-all duration-300 ${
                theme === "system"
                  ? "ring-2 ring-primary ring-offset-2 ring-offset-background shadow-lg scale-[1.02]"
                  : "hover:bg-muted hover:shadow-md hover:scale-[1.01]"
              }`}
            >
              <div className={`p-2 rounded-lg ${theme === "system" ? "bg-primary-foreground/20" : "bg-muted"}`}>
                <Monitor className={`h-5 w-5 ${theme === "system" ? "text-primary-foreground" : "text-foreground"}`} />
              </div>
              <div className="text-left">
                <div className="font-medium">System</div>
                <div className="text-sm opacity-80">Follow device settings</div>
              </div>
            </Button>
          </div>

          {mounted && (
            <div className="mt-6 p-4 border rounded-lg bg-card">
              <h4 className="text-sm font-medium mb-3 text-foreground">Color Preview</h4>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-primary"></div>
                  <span className="text-sm text-foreground">Primary</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-secondary"></div>
                  <span className="text-sm text-foreground">Secondary</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-muted"></div>
                  <span className="text-sm text-foreground">Muted</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-card border"></div>
                  <span className="text-sm text-foreground">Card</span>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )

  const renderProfile = () => (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" onClick={() => setCurrentView("main")} className="btn-press">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold text-foreground">Profile Management</h1>
      </div>

      <Card className="card-hover">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src="/professional-headshot.png" />
                <AvatarFallback>
                  {userName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-lg font-semibold">{userName}</h3>
                <Badge variant="secondary">{userRole}</Badge>
              </div>
            </div>
            <Button variant="outline" onClick={() => setIsEditing(!isEditing)} className="btn-press">
              <Edit className="h-4 w-4 mr-2" />
              {isEditing ? "Cancel" : "Edit Profile"}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={profileData.name}
                disabled={!isEditing}
                onChange={(e) => setProfileData((prev) => ({ ...prev, name: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={profileData.phone}
                disabled={!isEditing}
                onChange={(e) => setProfileData((prev) => ({ ...prev, phone: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={profileData.email}
                disabled={!isEditing}
                onChange={(e) => setProfileData((prev) => ({ ...prev, email: e.target.value }))}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="dob">Date of Birth</Label>
                <Input
                  id="dob"
                  type="date"
                  value={profileData.dateOfBirth}
                  disabled={!isEditing}
                  onChange={(e) => setProfileData((prev) => ({ ...prev, dateOfBirth: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="gender">Gender</Label>
                <Select
                  value={profileData.gender}
                  disabled={!isEditing}
                  onValueChange={(value) => setProfileData((prev) => ({ ...prev, gender: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                    <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="bloodType">Blood Type</Label>
              <Select
                value={profileData.bloodType}
                disabled={!isEditing}
                onValueChange={(value) => setProfileData((prev) => ({ ...prev, bloodType: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="A+">A+</SelectItem>
                  <SelectItem value="A-">A-</SelectItem>
                  <SelectItem value="B+">B+</SelectItem>
                  <SelectItem value="B-">B-</SelectItem>
                  <SelectItem value="AB+">AB+</SelectItem>
                  <SelectItem value="AB-">AB-</SelectItem>
                  <SelectItem value="O+">O+</SelectItem>
                  <SelectItem value="O-">O-</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {isEditing && (
            <Button className="w-full btn-press" onClick={handleSaveProfile}>
              Save Changes
            </Button>
          )}
        </CardContent>
      </Card>

      <Card className="card-hover">
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
          <CardDescription>Update your account password</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="current-password">Current Password</Label>
            <div className="relative">
              <Input
                id="current-password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter current password"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 btn-press"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>
          <div>
            <Label htmlFor="new-password">New Password</Label>
            <Input id="new-password" type="password" placeholder="Enter new password" />
          </div>
          <div>
            <Label htmlFor="confirm-password">Confirm New Password</Label>
            <Input id="confirm-password" type="password" placeholder="Confirm new password" />
          </div>
          <Button className="w-full btn-press" onClick={handlePasswordUpdate}>
            Update Password
          </Button>
        </CardContent>
      </Card>
    </div>
  )

  const renderPrivacy = () => (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" onClick={() => setCurrentView("main")} className="btn-press">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold text-foreground">Privacy & Security</h1>
      </div>

      <Card className="card-hover">
        <CardHeader>
          <CardTitle>Privacy Settings</CardTitle>
          <CardDescription>Control how your data is shared</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="share-records">Allow sharing medical records</Label>
              <p className="text-sm text-muted-foreground">Enable sharing with healthcare providers</p>
            </div>
            <Switch
              id="share-records"
              checked={privacySettings.shareRecords}
              onCheckedChange={(checked) => {
                setPrivacySettings((prev) => ({ ...prev, shareRecords: checked }))
                toast({
                  title: "Privacy Setting Updated",
                  description: checked ? "Medical record sharing enabled" : "Medical record sharing disabled",
                })
              }}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="two-factor">Enable 2FA</Label>
              <p className="text-sm text-muted-foreground">Two-factor authentication for extra security</p>
            </div>
            <Switch
              id="two-factor"
              checked={privacySettings.twoFactor}
              onCheckedChange={(checked) => {
                setPrivacySettings((prev) => ({ ...prev, twoFactor: checked }))
                toast({
                  title: "Security Setting Updated",
                  description: checked ? "Two-factor authentication enabled" : "Two-factor authentication disabled",
                })
              }}
            />
          </div>
        </CardContent>
      </Card>

      <Card className="card-hover">
        <CardHeader>
          <CardTitle>Active Sessions</CardTitle>
          <CardDescription>Manage devices with access to your account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {activeSessions.map((session, index) => (
            <div key={index} className="flex items-center justify-between p-3 border rounded-lg card-hover">
              <div className="flex items-center gap-3">
                {session.device.includes("iPhone") || session.device.includes("iPad") ? (
                  <Smartphone className="h-5 w-5 text-muted-foreground" />
                ) : (
                  <Monitor className="h-5 w-5 text-muted-foreground" />
                )}
                <div>
                  <div className="font-medium flex items-center gap-2">
                    {session.device}
                    {session.current && (
                      <Badge variant="secondary" className="text-xs">
                        Current
                      </Badge>
                    )}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {session.location} • {session.lastActive}
                  </div>
                </div>
              </div>
              {!session.current && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="btn-press"
                  onClick={() =>
                    toast({
                      title: "Session Terminated",
                      description: "Session terminated",
                    })
                  }
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="card-hover">
        <CardHeader>
          <CardTitle>Data Consents</CardTitle>
          <CardDescription>Manage what you've shared and with whom</CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="outline" className="w-full bg-transparent btn-press">
            Manage Consents
          </Button>
        </CardContent>
      </Card>
    </div>
  )

  const renderNotifications = () => (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" onClick={() => setCurrentView("main")} className="btn-press">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold text-foreground">Notifications</h1>
      </div>

      <Card className="card-hover">
        <CardHeader>
          <CardTitle>Notification Preferences</CardTitle>
          <CardDescription>Choose what alerts you want to receive</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.entries(notificationSettings).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <div>
                <Label htmlFor={key} className="capitalize">
                  {key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                </Label>
                <p className="text-sm text-muted-foreground">
                  {key === "appointments" && "Reminders for upcoming appointments"}
                  {key === "medications" && "Medication reminders and refill alerts"}
                  {key === "vaccinations" && "Vaccination schedule notifications"}
                  {key === "bloodDonation" && "Blood donation requests and updates"}
                  {key === "healthTips" && "Daily health tips and recommendations"}
                  {key === "quietHours" && "Do not disturb during specified hours"}
                </p>
              </div>
              <Switch
                id={key}
                checked={value}
                onCheckedChange={(checked) => {
                  setNotificationSettings((prev) => ({ ...prev, [key]: checked }))
                  toast({
                    title: "Notification Setting Updated",
                    description: `${key} notifications ${checked ? "enabled" : "disabled"}`,
                  })
                }}
              />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="card-hover">
        <CardHeader>
          <CardTitle>Quiet Hours</CardTitle>
          <CardDescription>Set times when you don't want to receive notifications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="quiet-start">Start Time</Label>
              <Input id="quiet-start" type="time" defaultValue="22:00" />
            </div>
            <div>
              <Label htmlFor="quiet-end">End Time</Label>
              <Input id="quiet-end" type="time" defaultValue="07:00" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderLanguage = () => (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" onClick={() => setCurrentView("main")} className="btn-press">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold text-foreground">Language & Accessibility</h1>
      </div>

      <Card className="card-hover">
        <CardHeader>
          <CardTitle>Language Settings</CardTitle>
          <CardDescription>Choose your preferred language</CardDescription>
        </CardHeader>
        <CardContent>
          <Select defaultValue="en">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="ar">العربية (Arabic)</SelectItem>
              <SelectItem value="es">Español (Spanish)</SelectItem>
              <SelectItem value="fr">Français (French)</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <Card className="card-hover">
        <CardHeader>
          <CardTitle>Accessibility Options</CardTitle>
          <CardDescription>Customize the app for better accessibility</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="font-size">Font Size</Label>
            <Select
              value={accessibilitySettings.fontSize}
              onValueChange={(value) => {
                setAccessibilitySettings((prev) => ({ ...prev, fontSize: value }))
                toast({
                  title: "Accessibility Updated",
                  description: `Font size changed to ${value}`,
                })
              }}
            >
              <SelectTrigger className="mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="small">Small</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="large">Large</SelectItem>
                <SelectItem value="extra-large">Extra Large</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="high-contrast">High-contrast mode</Label>
              <p className="text-sm text-muted-foreground">Increase contrast for better visibility</p>
            </div>
            <Switch
              id="high-contrast"
              checked={accessibilitySettings.highContrast}
              onCheckedChange={(checked) => {
                setAccessibilitySettings((prev) => ({ ...prev, highContrast: checked }))
                toast({
                  title: "Accessibility Updated",
                  description: checked ? "High contrast mode enabled" : "High contrast mode disabled",
                })
              }}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="voice-assistance">Voice assistance</Label>
              <p className="text-sm text-muted-foreground">Enable voice commands and feedback</p>
            </div>
            <Switch
              id="voice-assistance"
              checked={accessibilitySettings.voiceAssistance}
              onCheckedChange={(checked) => {
                setAccessibilitySettings((prev) => ({ ...prev, voiceAssistance: checked }))
                toast({
                  title: "Accessibility Updated",
                  description: checked ? "Voice assistance enabled" : "Voice assistance disabled",
                })
              }}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderSupport = () => (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" onClick={() => setCurrentView("main")} className="btn-press">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold text-foreground">About & Support</h1>
      </div>

      <Card className="card-hover">
        <CardHeader>
          <CardTitle>App Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Version</span>
            <span>2.1.0</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Build</span>
            <span>2024.01.15</span>
          </div>
        </CardContent>
      </Card>

      <Card className="card-hover">
        <CardHeader>
          <CardTitle>Legal & Privacy</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button variant="ghost" className="w-full justify-start p-0 h-auto btn-press">
            <div className="text-left">
              <div className="font-medium">Terms of Service</div>
              <div className="text-sm text-muted-foreground">Read our terms and conditions</div>
            </div>
          </Button>
          <Button variant="ghost" className="w-full justify-start p-0 h-auto btn-press">
            <div className="text-left">
              <div className="font-medium">Privacy Policy</div>
              <div className="text-sm text-muted-foreground">How we handle your data</div>
            </div>
          </Button>
        </CardContent>
      </Card>

      <Card className="card-hover">
        <CardHeader>
          <CardTitle>Get Help</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button
            className="w-full btn-press"
            onClick={() =>
              toast({
                title: "Support Request Sent",
                description: "Support request sent!",
              })
            }
          >
            Contact Support
          </Button>
          <Button variant="outline" className="w-full bg-transparent btn-press">
            View FAQ
          </Button>
        </CardContent>
      </Card>
    </div>
  )

  if (!mounted) {
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-md mx-auto">
        {currentView === "main" && renderMain()}
        {currentView === "profile" && renderProfile()}
        {currentView === "privacy" && renderPrivacy()}
        {currentView === "notifications" && renderNotifications()}
        {currentView === "appearance" && renderAppearance()}
        {currentView === "language" && renderLanguage()}
        {currentView === "support" && renderSupport()}
      </div>
    </div>
  )
}
