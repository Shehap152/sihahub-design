"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input, Textarea } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/hooks/use-toast"
import {
  ArrowLeft,
  Search,
  Filter,
  Star,
  MapPin,
  Calendar,
  DollarSign,
  ChevronRight,
  Heart,
  Stethoscope,
  Brain,
  Eye,
  Bone,
  Baby,
  Users,
  Building,
  Languages,
  Award,
  MapPinIcon,
  Clock,
  FileText,
  CheckCircle,
  CreditCard,
  Wallet,
  Shield,
  Home,
  CalendarCheck,
  X,
  Edit,
  ExternalLink,
  Phone,
} from "lucide-react"

interface AppointmentBookingProps {
  userName: string
  onBack: () => void
}

type BookingScreen =
  | "search"
  | "doctor-profile"
  | "booking-confirmation"
  | "payment"
  | "success"
  | "appointment-details"

interface Doctor {
  id: string
  name: string
  specialty: string
  hospital: string
  rating: number
  reviewCount: number
  experience: string
  fee: number
  languages: string[]
  image: string
  availableToday: boolean
  availableTomorrow: boolean
  location: string
}

const mockDoctors: Doctor[] = [
  {
    id: "1",
    name: "Dr. Sarah Johnson",
    specialty: "Cardiology",
    hospital: "City Medical Center",
    rating: 4.8,
    reviewCount: 127,
    experience: "15 years",
    fee: 150,
    languages: ["English", "Arabic"],
    image: "/doctor-sarah.jpg",
    availableToday: true,
    availableTomorrow: true,
    location: "Downtown Medical District",
  },
  {
    id: "2",
    name: "Dr. Michael Chen",
    specialty: "General Practice",
    hospital: "Health Plus Clinic",
    rating: 4.6,
    reviewCount: 89,
    experience: "8 years",
    fee: 100,
    languages: ["English", "Chinese"],
    image: "/doctor-michael.jpg",
    availableToday: false,
    availableTomorrow: true,
    location: "Westside Health Center",
  },
  {
    id: "3",
    name: "Dr. Amira Hassan",
    specialty: "Dermatology",
    hospital: "Skin Care Institute",
    rating: 4.9,
    reviewCount: 203,
    experience: "12 years",
    fee: 120,
    languages: ["English", "Arabic", "French"],
    image: "/doctor-amira.jpg",
    availableToday: true,
    availableTomorrow: true,
    location: "Medical Plaza",
  },
  {
    id: "4",
    name: "Dr. Ahmed Mahmoud",
    specialty: "Orthopedics",
    hospital: "Bone & Joint Center",
    rating: 4.7,
    reviewCount: 156,
    experience: "20 years",
    fee: 180,
    languages: ["English", "Arabic"],
    image: "/doctor-ahmed.jpg",
    availableToday: false,
    availableTomorrow: false,
    location: "Sports Medicine Complex",
  },
]

const specialties = [
  { name: "All", icon: Stethoscope },
  { name: "Cardiology", icon: Heart },
  { name: "General Practice", icon: Users },
  { name: "Dermatology", icon: Eye },
  { name: "Orthopedics", icon: Bone },
  { name: "Neurology", icon: Brain },
  { name: "Pediatrics", icon: Baby },
]

export default function AppointmentBooking({ userName, onBack }: AppointmentBookingProps) {
  const { toast } = useToast()
  const [currentScreen, setCurrentScreen] = useState<BookingScreen>("search")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSpecialty, setSelectedSpecialty] = useState("All")
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null)
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [appointmentNotes, setAppointmentNotes] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("")
  const [showFilters, setShowFilters] = useState(false)

  const filteredDoctors = mockDoctors.filter((doctor) => {
    const matchesSearch =
      doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.hospital.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesSpecialty = selectedSpecialty === "All" || doctor.specialty === selectedSpecialty
    return matchesSearch && matchesSpecialty
  })

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
      />
    ))
  }

  const generateTimeSlots = () => {
    const slots = []
    for (let hour = 9; hour <= 17; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const time = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`
        slots.push(time)
      }
    }
    return slots
  }

  const generateDates = () => {
    const dates = []
    const today = new Date()
    for (let i = 0; i < 14; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)
      dates.push({
        date: date.toISOString().split("T")[0],
        display:
          i === 0
            ? "Today"
            : i === 1
              ? "Tomorrow"
              : date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" }),
      })
    }
    return dates
  }

  const handleBookingSuccess = () => {
    toast({
      title: "Appointment Booked!",
      description: "Appointment booked successfully! You'll receive a confirmation email shortly.",
    })
    setCurrentScreen("success")
  }

  const handlePaymentSuccess = () => {
    toast({
      title: "Payment Successful",
      description: "Payment processed successfully!",
    })
    handleBookingSuccess()
  }

  if (currentScreen === "search") {
    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="bg-card border-b border-border">
          <div className="px-6 py-4 animate-fade-in-up">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" onClick={onBack} className="btn-press">
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-xl font-bold text-foreground">Book Appointment</h1>
                <p className="text-sm text-muted-foreground">Find the right doctor for you</p>
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 py-6 space-y-6">
          {/* Search Bar */}
          <div className="relative animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search by doctor, specialty, or hospital"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-12 h-12 text-base"
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 btn-press"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="w-5 h-5" />
            </Button>
          </div>

          {/* Specialty Filter Chips */}
          <div className="space-y-3 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <h3 className="text-sm font-semibold text-foreground">Specialties</h3>
            <div className="flex flex-wrap gap-2">
              {specialties.map((specialty, index) => (
                <Badge
                  key={specialty.name}
                  variant={selectedSpecialty === specialty.name ? "default" : "secondary"}
                  className={`px-3 py-2 cursor-pointer transition-all btn-press ${
                    selectedSpecialty === specialty.name ? "bg-teal-500 hover:bg-teal-600 text-white" : "hover:bg-muted"
                  }`}
                  onClick={() => setSelectedSpecialty(specialty.name)}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <specialty.icon className="w-4 h-4 mr-1" />
                  {specialty.name}
                </Badge>
              ))}
            </div>
          </div>

          {/* Results */}
          <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground">{filteredDoctors.length} doctors found</h3>
            </div>

            <div className="space-y-3">
              {filteredDoctors.map((doctor, index) => (
                <Card
                  key={doctor.id}
                  className="border-0 shadow-sm card-hover animate-slide-in-right"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-4">
                      <Avatar className="w-16 h-16">
                        <AvatarImage src={doctor.image || "/placeholder.svg"} />
                        <AvatarFallback className="bg-teal-100 text-teal-700 text-lg font-semibold">
                          {doctor.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1 space-y-2">
                        <div>
                          <h4 className="font-semibold text-foreground text-lg">{doctor.name}</h4>
                          <p className="text-muted-foreground">
                            {doctor.specialty} • {doctor.hospital}
                          </p>
                        </div>

                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            {renderStars(doctor.rating)}
                            <span className="text-sm text-muted-foreground ml-1">
                              {doctor.rating} ({doctor.reviewCount})
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-4 h-4" />
                            <span>{doctor.location}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <DollarSign className="w-4 h-4" />
                            <span>${doctor.fee}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex space-x-2">
                            {doctor.availableToday && (
                              <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Available Today</Badge>
                            )}
                            {doctor.availableTomorrow && (
                              <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">Available Tomorrow</Badge>
                            )}
                          </div>

                          <Button
                            className="bg-teal-500 hover:bg-teal-600 btn-press"
                            onClick={() => {
                              setSelectedDoctor(doctor)
                              setCurrentScreen("doctor-profile")
                            }}
                          >
                            View Profile
                            <ChevronRight className="w-4 h-4 ml-1" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (currentScreen === "doctor-profile" && selectedDoctor) {
    const dates = generateDates()
    const timeSlots = generateTimeSlots()

    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="bg-card border-b border-border">
          <div className="px-6 py-4 animate-fade-in-up">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" onClick={() => setCurrentScreen("search")} className="btn-press">
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-xl font-bold text-foreground">Doctor Profile</h1>
                <p className="text-sm text-muted-foreground">Schedule your appointment</p>
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 py-6 space-y-6">
          {/* Doctor Profile Header */}
          <Card className="border-0 shadow-sm animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <Avatar className="w-20 h-20">
                  <AvatarImage src={selectedDoctor.image || "/placeholder.svg"} />
                  <AvatarFallback className="bg-teal-100 text-teal-700 text-xl font-semibold">
                    {selectedDoctor.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 space-y-3">
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">{selectedDoctor.name}</h2>
                    <p className="text-lg text-muted-foreground">{selectedDoctor.specialty}</p>
                  </div>

                  <div className="flex items-center space-x-1">
                    {renderStars(selectedDoctor.rating)}
                    <span className="text-sm text-muted-foreground ml-2">
                      {selectedDoctor.rating} ({selectedDoctor.reviewCount} reviews)
                    </span>
                  </div>

                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Award className="w-4 h-4" />
                      <span>{selectedDoctor.experience} experience</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Languages className="w-4 h-4" />
                      <span>{selectedDoctor.languages.join(", ")}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Hospital & Fee Info */}
          <div className="grid grid-cols-1 gap-4">
            <Card className="border-0 shadow-sm animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Building className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-foreground">{selectedDoctor.hospital}</p>
                    <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                      <MapPinIcon className="w-4 h-4" />
                      <span>{selectedDoctor.location}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <DollarSign className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Consultation Fee</p>
                      <p className="text-sm text-muted-foreground">Per appointment</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-foreground">${selectedDoctor.fee}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Schedule Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
              Select Date & Time
            </h3>

            {/* Date Selection */}
            <div className="space-y-3">
              <h4
                className="text-sm font-semibold text-foreground animate-fade-in-up"
                style={{ animationDelay: "0.5s" }}
              >
                Choose Date
              </h4>
              <div className="flex overflow-x-auto space-x-3 pb-2">
                {dates.map((dateObj) => (
                  <Button
                    key={dateObj.date}
                    variant={selectedDate === dateObj.date ? "default" : "outline"}
                    className={`flex-shrink-0 px-4 py-3 h-auto flex-col ${
                      selectedDate === dateObj.date ? "bg-teal-500 hover:bg-teal-600 text-white" : "hover:bg-muted"
                    } btn-press`}
                    onClick={() => {
                      setSelectedDate(dateObj.date)
                      setSelectedTime("") // Reset time when date changes
                    }}
                  >
                    <span className="text-xs font-medium">{dateObj.display}</span>
                    <span className="text-xs opacity-75">
                      {new Date(dateObj.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    </span>
                  </Button>
                ))}
              </div>
            </div>

            {/* Time Selection */}
            {selectedDate && (
              <div className="space-y-3">
                <h4
                  className="text-sm font-semibold text-foreground animate-fade-in-up"
                  style={{ animationDelay: "0.6s" }}
                >
                  Choose Time
                </h4>
                <div className="grid grid-cols-3 gap-3">
                  {timeSlots.map((time) => (
                    <Button
                      key={time}
                      variant={selectedTime === time ? "default" : "outline"}
                      className={`h-12 btn-press ${
                        selectedTime === time ? "bg-teal-500 hover:bg-teal-600 text-white" : "hover:bg-muted"
                      }`}
                      onClick={() => setSelectedTime(time)}
                    >
                      {time}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Book Appointment Button */}
          {selectedDate && selectedTime && (
            <div className="sticky bottom-6 bg-background pt-4 animate-fade-in-up" style={{ animationDelay: "0.7s" }}>
              <Card className="border-0 shadow-lg">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="font-semibold text-foreground">Selected Appointment</p>
                      <p className="text-sm text-muted-foreground">
                        {dates.find((d) => d.date === selectedDate)?.display} at {selectedTime}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-foreground">${selectedDoctor.fee}</p>
                    </div>
                  </div>
                  <Button
                    className="w-full bg-teal-500 hover:bg-teal-600 h-12 text-base font-semibold btn-press"
                    onClick={() => setCurrentScreen("booking-confirmation")}
                  >
                    Book Appointment
                    <Calendar className="w-5 h-5 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    )
  }

  if (currentScreen === "booking-confirmation" && selectedDoctor) {
    const selectedDateObj = generateDates().find((d) => d.date === selectedDate)

    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="bg-card border-b border-border">
          <div className="px-6 py-4 animate-fade-in-up">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setCurrentScreen("doctor-profile")}
                className="btn-press"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-xl font-bold text-foreground">Confirm Appointment</h1>
                <p className="text-sm text-muted-foreground">Review your booking details</p>
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 py-6 space-y-6">
          {/* Appointment Summary Card */}
          <Card className="border-0 shadow-sm animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2 mb-4">
                <CheckCircle className="w-5 h-5 text-teal-500" />
                <h3 className="text-lg font-semibold text-foreground">Appointment Summary</h3>
              </div>

              <div className="space-y-4">
                {/* Doctor Info */}
                <div className="flex items-center space-x-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={selectedDoctor.image || "/placeholder.svg"} />
                    <AvatarFallback className="bg-teal-100 text-teal-700 text-lg font-semibold">
                      {selectedDoctor.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground text-lg">{selectedDoctor.name}</h4>
                    <p className="text-muted-foreground">{selectedDoctor.specialty}</p>
                    <div className="flex items-center space-x-1 mt-1">
                      {renderStars(selectedDoctor.rating)}
                      <span className="text-sm text-muted-foreground ml-1">
                        {selectedDoctor.rating} ({selectedDoctor.reviewCount})
                      </span>
                    </div>
                  </div>
                </div>

                {/* Appointment Details */}
                <div className="bg-muted/30 rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Building className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm font-medium text-foreground">Hospital</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{selectedDoctor.hospital}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <MapPinIcon className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm font-medium text-foreground">Location</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{selectedDoctor.location}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm font-medium text-foreground">Date</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{selectedDateObj?.display}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm font-medium text-foreground">Time</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{selectedTime}</span>
                  </div>

                  <div className="flex items-center justify-between border-t border-border pt-3">
                    <div className="flex items-center space-x-2">
                      <DollarSign className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm font-medium text-foreground">Consultation Fee</span>
                    </div>
                    <span className="text-lg font-bold text-foreground">${selectedDoctor.fee}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Add Notes Section */}
          <Card className="border-0 shadow-sm animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2 mb-4">
                <FileText className="w-5 h-5 text-blue-500" />
                <h3 className="text-lg font-semibold text-foreground">Add Notes (Optional)</h3>
              </div>
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Describe your symptoms or reason for visit to help the doctor prepare for your appointment.
                </p>
                <Textarea
                  placeholder="e.g., Experiencing chest pain for the past few days, need routine checkup, follow-up appointment..."
                  value={appointmentNotes}
                  onChange={(e) => setAppointmentNotes(e.target.value)}
                  className="min-h-[100px] resize-none"
                />
                <p className="text-xs text-muted-foreground">{appointmentNotes.length}/500 characters</p>
              </div>
            </CardContent>
          </Card>

          {/* Patient Information */}
          <Card className="border-0 shadow-sm animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Patient Information</h3>
              <div className="bg-muted/30 rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src="/patient-profile.png" />
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {userName.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-foreground">{userName}</p>
                    <p className="text-sm text-muted-foreground">Patient</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="space-y-3 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            <Button
              className="w-full bg-teal-500 hover:bg-teal-600 h-12 text-base font-semibold btn-press"
              onClick={() => setCurrentScreen("payment")}
            >
              Confirm Appointment
              <CheckCircle className="w-5 h-5 ml-2" />
            </Button>
            <Button
              variant="outline"
              className="w-full h-12 text-base bg-transparent btn-press"
              onClick={() => setCurrentScreen("doctor-profile")}
            >
              Back to Schedule
            </Button>
          </div>
        </div>
      </div>
    )
  }

  if (currentScreen === "payment" && selectedDoctor) {
    const selectedDateObj = generateDates().find((d) => d.date === selectedDate)

    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="bg-card border-b border-border">
          <div className="px-6 py-4 animate-fade-in-up">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setCurrentScreen("booking-confirmation")}
                className="btn-press"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-xl font-bold text-foreground">Payment</h1>
                <p className="text-sm text-muted-foreground">Choose your payment method</p>
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 py-6 space-y-6">
          {/* Payment Summary */}
          <Card className="border-0 shadow-sm animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Payment Summary</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Consultation with {selectedDoctor.name}</span>
                  <span className="font-semibold text-foreground">${selectedDoctor.fee}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Service Fee</span>
                  <span className="font-semibold text-foreground">$5</span>
                </div>
                <div className="border-t border-border pt-3">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-foreground">Total</span>
                    <span className="text-2xl font-bold text-foreground">${selectedDoctor.fee + 5}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Methods */}
          <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <h3 className="text-lg font-semibold text-foreground">Payment Method</h3>

            <div className="space-y-3">
              {/* Credit/Debit Card */}
              <Card
                className={`border-0 shadow-sm cursor-pointer transition-all card-hover btn-press ${
                  paymentMethod === "card" ? "ring-2 ring-teal-500 bg-teal-50 dark:bg-teal-900/20" : ""
                }`}
                onClick={() => setPaymentMethod("card")}
              >
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <CreditCard className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-foreground">Credit/Debit Card</p>
                      <p className="text-sm text-muted-foreground">Visa, Mastercard, American Express</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Shield className="w-4 h-4 text-green-500" />
                      <span className="text-xs text-green-600">Secure</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Digital Wallet */}
              <Card
                className={`border-0 shadow-sm cursor-pointer transition-all card-hover btn-press ${
                  paymentMethod === "wallet" ? "ring-2 ring-teal-500 bg-teal-50 dark:bg-teal-900/20" : ""
                }`}
                onClick={() => setPaymentMethod("wallet")}
              >
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                      <Wallet className="w-6 h-6 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-foreground">Digital Wallet</p>
                      <p className="text-sm text-muted-foreground">Apple Pay, Google Pay, PayPal</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Shield className="w-4 h-4 text-green-500" />
                      <span className="text-xs text-green-600">Secure</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Pay at Clinic */}
              <Card
                className={`border-0 shadow-sm cursor-pointer transition-all card-hover btn-press ${
                  paymentMethod === "clinic" ? "ring-2 ring-teal-500 bg-teal-50 dark:bg-teal-900/20" : ""
                }`}
                onClick={() => setPaymentMethod("clinic")}
              >
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                      <Building className="w-6 h-6 text-orange-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-foreground">Pay at Clinic</p>
                      <p className="text-sm text-muted-foreground">Cash or card payment on arrival</p>
                    </div>
                    <Badge className="bg-green-100 text-green-700">No fees</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Security Notice */}
          <Card
            className="border-0 shadow-sm bg-blue-50 dark:bg-blue-900/20 animate-fade-in-up"
            style={{ animationDelay: "0.3s" }}
          >
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-blue-900 dark:text-blue-100">Secure Payment</p>
                  <p className="text-xs text-blue-700 dark:text-blue-200 mt-1">
                    Your payment information is encrypted and secure. We never store your card details.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pay Button */}
          {paymentMethod && (
            <div className="space-y-3 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
              <Button
                className="w-full bg-teal-500 hover:bg-teal-600 h-12 text-base font-semibold btn-press"
                onClick={handlePaymentSuccess}
              >
                {paymentMethod === "clinic" ? "Confirm Appointment" : `Pay & Confirm - $${selectedDoctor.fee + 5}`}
                <CheckCircle className="w-5 h-5 ml-2" />
              </Button>
            </div>
          )}
        </div>
      </div>
    )
  }

  if (currentScreen === "success" && selectedDoctor) {
    const selectedDateObj = generateDates().find((d) => d.date === selectedDate)

    return (
      <div className="min-h-screen bg-background">
        <div className="px-6 py-12 space-y-8">
          {/* Success Animation/Illustration */}
          <div className="text-center space-y-6 animate-fade-in-up">
            <div className="w-24 h-24 bg-teal-500 rounded-full flex items-center justify-center mx-auto animate-bounce-subtle">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-foreground">Appointment Booked Successfully!</h1>
              <p className="text-muted-foreground">
                Your appointment has been confirmed. You'll receive a confirmation email shortly.
              </p>
            </div>
          </div>

          {/* Appointment Summary */}
          <Card className="border-0 shadow-sm animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={selectedDoctor.image || "/placeholder.svg"} />
                    <AvatarFallback className="bg-teal-100 text-teal-700 text-lg font-semibold">
                      {selectedDoctor.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground text-lg">{selectedDoctor.name}</h3>
                    <p className="text-muted-foreground">{selectedDoctor.specialty}</p>
                    <p className="text-sm text-muted-foreground">{selectedDoctor.hospital}</p>
                  </div>
                </div>

                <div className="bg-muted/30 rounded-lg p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">Date & Time</span>
                    <span className="text-sm text-muted-foreground">
                      {selectedDateObj?.display} at {selectedTime}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">Location</span>
                    <span className="text-sm text-muted-foreground">{selectedDoctor.location}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">Appointment ID</span>
                    <span className="text-sm text-muted-foreground font-mono">
                      #APT-{Date.now().toString().slice(-6)}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="space-y-3 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <Button
              className="w-full bg-teal-500 hover:bg-teal-600 h-12 text-base font-semibold btn-press"
              onClick={() => setCurrentScreen("appointment-details")}
            >
              View Appointment Details
              <FileText className="w-5 h-5 ml-2" />
            </Button>
            <Button variant="outline" className="w-full h-12 text-base bg-transparent btn-press" onClick={onBack}>
              Go to Home
              <Home className="w-5 h-5 ml-2" />
            </Button>
          </div>

          {/* Reminder */}
          <Card
            className="border-0 shadow-sm bg-blue-50 dark:bg-blue-900/20 animate-fade-in-up"
            style={{ animationDelay: "0.4s" }}
          >
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-blue-900 dark:text-blue-100">Reminder</p>
                  <p className="text-xs text-blue-700 dark:text-blue-200 mt-1">
                    Please arrive 15 minutes early for your appointment. Bring a valid ID and your insurance card.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (currentScreen === "appointment-details" && selectedDoctor) {
    const selectedDateObj = generateDates().find((d) => d.date === selectedDate)
    const appointmentDate = new Date(selectedDate)
    const today = new Date()
    const daysUntil = Math.ceil((appointmentDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))

    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="bg-card border-b border-border">
          <div className="px-6 py-4 animate-fade-in-up">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" onClick={() => setCurrentScreen("success")} className="btn-press">
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-xl font-bold text-foreground">Appointment Details</h1>
                <p className="text-sm text-muted-foreground">Manage your upcoming appointment</p>
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 py-6 space-y-6">
          {/* Countdown/Status */}
          <Card
            className="border-0 shadow-sm bg-gradient-to-r from-teal-500 to-blue-500 text-white animate-fade-in-up"
            style={{ animationDelay: "0.1s" }}
          >
            <CardContent className="p-6">
              <div className="text-center space-y-2">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto animate-bounce-subtle">
                  <Calendar className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold">
                  {daysUntil === 0 ? "Today" : daysUntil === 1 ? "Tomorrow" : `${daysUntil} days left`}
                </h3>
                <p className="text-white/90">Until your appointment</p>
              </div>
            </CardContent>
          </Card>

          {/* Doctor & Appointment Info */}
          <Card className="border-0 shadow-sm animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <CardContent className="p-6">
              <div className="space-y-6">
                {/* Doctor Info */}
                <div className="flex items-start space-x-4">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src={selectedDoctor.image || "/placeholder.svg"} />
                    <AvatarFallback className="bg-teal-100 text-teal-700 text-xl font-semibold">
                      {selectedDoctor.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-2">
                    <div>
                      <h3 className="text-xl font-bold text-foreground">{selectedDoctor.name}</h3>
                      <p className="text-muted-foreground">{selectedDoctor.specialty}</p>
                    </div>
                    <div className="flex items-center space-x-1">
                      {renderStars(selectedDoctor.rating)}
                      <span className="text-sm text-muted-foreground ml-1">
                        {selectedDoctor.rating} ({selectedDoctor.reviewCount})
                      </span>
                    </div>
                  </div>
                </div>

                {/* Appointment Details */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-foreground">Appointment Information</h4>
                  <div className="bg-muted/30 rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm font-medium text-foreground">Date</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{selectedDateObj?.display}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm font-medium text-foreground">Time</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{selectedTime}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Building className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm font-medium text-foreground">Hospital</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{selectedDoctor.hospital}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <MapPinIcon className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm font-medium text-foreground">Location</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-muted-foreground">{selectedDoctor.location}</span>
                        <Button variant="ghost" size="sm" className="h-6 px-2">
                          <ExternalLink className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <DollarSign className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm font-medium text-foreground">Fee</span>
                      </div>
                      <span className="text-sm text-muted-foreground">${selectedDoctor.fee}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <FileText className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm font-medium text-foreground">Appointment ID</span>
                      </div>
                      <span className="text-sm text-muted-foreground font-mono">
                        #APT-{Date.now().toString().slice(-6)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Notes */}
                {appointmentNotes && (
                  <div className="space-y-3">
                    <h4 className="font-semibold text-foreground">Your Notes</h4>
                    <div className="bg-muted/30 rounded-lg p-4">
                      <p className="text-sm text-muted-foreground">{appointmentNotes}</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-3 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <Button variant="outline" className="h-12 flex-col space-y-1 bg-transparent btn-press">
              <Phone className="w-5 h-5" />
              <span className="text-xs">Call Hospital</span>
            </Button>
            <Button variant="outline" className="h-12 flex-col space-y-1 bg-transparent btn-press">
              <ExternalLink className="w-5 h-5" />
              <span className="text-xs">Get Directions</span>
            </Button>
            <Button variant="outline" className="h-12 flex-col space-y-1 bg-transparent btn-press">
              <CalendarCheck className="w-5 h-5" />
              <span className="text-xs">Add to Calendar</span>
            </Button>
            <Button variant="outline" className="h-12 flex-col space-y-1 bg-transparent btn-press">
              <Edit className="w-5 h-5" />
              <span className="text-xs">Edit Notes</span>
            </Button>
          </div>

          {/* Management Actions */}
          <div className="space-y-3 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            <Button
              variant="outline"
              className="w-full h-12 text-base border-blue-200 text-blue-600 hover:bg-blue-50 bg-transparent btn-press"
            >
              <Edit className="w-5 h-5 mr-2" />
              Reschedule Appointment
            </Button>
            <Button
              variant="outline"
              className="w-full h-12 text-base border-red-200 text-red-600 hover:bg-red-50 bg-transparent btn-press"
            >
              <X className="w-5 h-5 mr-2" />
              Cancel Appointment
            </Button>
          </div>

          {/* Preparation Tips */}
          <Card className="border-0 shadow-sm bg-green-50 animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
            <CardContent className="p-4">
              <div className="space-y-3">
                <h4 className="font-semibold text-green-900">Preparation Tips</h4>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• Arrive 15 minutes early</li>
                  <li>• Bring a valid ID and insurance card</li>
                  <li>• List any current medications</li>
                  <li>• Prepare questions for the doctor</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // ... existing code for other screens ...

  return <div>Screen not found</div>
}
