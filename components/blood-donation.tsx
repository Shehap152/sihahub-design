"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/input"
import {
  ArrowLeft,
  MapPin,
  Phone,
  Clock,
  Droplets,
  AlertTriangle,
  Heart,
  Calendar,
  CheckCircle,
  XCircle,
  Info,
  Navigation,
  Filter,
  Search,
  Bell,
} from "lucide-react"

interface BloodDonationProps {
  userName: string
  onBack: () => void
  onNavigateToNotifications?: () => void
}

type BloodDonationScreen =
  | "requests-list"
  | "request-details"
  | "map-view"
  | "donation-history"
  | "confirmation"
  | "success"

interface BloodRequest {
  id: string
  hospitalName: string
  location: string
  address: string
  phone: string
  bloodType: string
  unitsNeeded: number
  urgency: "urgent" | "normal"
  timePosted: string
  description?: string
}

interface DonationRecord {
  id: string
  hospitalName: string
  date: string
  bloodType: string
  status: "completed" | "scheduled" | "cancelled"
}

export default function BloodDonation({ userName, onBack, onNavigateToNotifications }: BloodDonationProps) {
  const [currentScreen, setCurrentScreen] = useState<BloodDonationScreen>("requests-list")
  const [selectedRequest, setSelectedRequest] = useState<BloodRequest | null>(null)
  const [donationNotes, setDonationNotes] = useState("")
  const [filterUrgent, setFilterUrgent] = useState(false)

  // Mock data for blood requests
  const bloodRequests: BloodRequest[] = [
    {
      id: "1",
      hospitalName: "City General Hospital",
      location: "Downtown",
      address: "123 Medical Center Dr, Downtown",
      phone: "+1 (555) 123-4567",
      bloodType: "O+",
      unitsNeeded: 3,
      urgency: "urgent",
      timePosted: "30 minutes ago",
      description: "Emergency surgery patient needs immediate blood transfusion",
    },
    {
      id: "2",
      hospitalName: "Regional Medical Center",
      location: "Westside",
      address: "456 Health Plaza, Westside",
      phone: "+1 (555) 234-5678",
      bloodType: "A-",
      unitsNeeded: 2,
      urgency: "urgent",
      timePosted: "1 hour ago",
      description: "Critical care unit requires A- blood for patient treatment",
    },
    {
      id: "3",
      hospitalName: "Community Health Clinic",
      location: "Eastside",
      address: "789 Wellness Ave, Eastside",
      phone: "+1 (555) 345-6789",
      bloodType: "B+",
      unitsNeeded: 1,
      urgency: "normal",
      timePosted: "3 hours ago",
      description: "Routine blood bank restocking",
    },
    {
      id: "4",
      hospitalName: "Children's Hospital",
      location: "Midtown",
      address: "321 Kids Care Blvd, Midtown",
      phone: "+1 (555) 456-7890",
      bloodType: "AB+",
      unitsNeeded: 2,
      urgency: "normal",
      timePosted: "5 hours ago",
      description: "Pediatric ward blood supply replenishment",
    },
  ]

  // Mock data for donation history
  const donationHistory: DonationRecord[] = [
    {
      id: "1",
      hospitalName: "City General Hospital",
      date: "2024-01-15",
      bloodType: "O+",
      status: "completed",
    },
    {
      id: "2",
      hospitalName: "Regional Medical Center",
      date: "2024-02-20",
      bloodType: "O+",
      status: "completed",
    },
    {
      id: "3",
      hospitalName: "Community Health Clinic",
      date: "2024-04-10",
      bloodType: "O+",
      status: "scheduled",
    },
  ]

  const filteredRequests = filterUrgent ? bloodRequests.filter((req) => req.urgency === "urgent") : bloodRequests

  const urgentRequests = bloodRequests.filter((req) => req.urgency === "urgent")
  const normalRequests = bloodRequests.filter((req) => req.urgency === "normal")

  const handleViewDetails = (request: BloodRequest) => {
    setSelectedRequest(request)
    setCurrentScreen("request-details")
  }

  const handleDonateNow = () => {
    setCurrentScreen("confirmation")
  }

  const handleConfirmDonation = () => {
    setCurrentScreen("success")
    if (onNavigateToNotifications) {
      // In a real app, this would create a notification
      setTimeout(() => {
        alert("Donation confirmed! You'll receive a notification when the hospital contacts you.")
      }, 1000)
    }
  }

  const handleContactHospital = () => {
    if (selectedRequest) {
      // In a real app, this would open the phone dialer
      alert(`Calling ${selectedRequest.hospitalName} at ${selectedRequest.phone}`)
    }
  }

  const nextEligibleDate = "March 15, 2024"

  // Requests List Screen
  if (currentScreen === "requests-list") {
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
                  <h1 className="text-xl font-bold text-foreground">Blood Donation Requests</h1>
                  <p className="text-sm text-muted-foreground">Help save lives in your community</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="icon">
                  <Info className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => setCurrentScreen("map-view")}>
                  <Navigation className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 py-6 space-y-6">
          {/* Filter and Search */}
          <div className="flex items-center space-x-3">
            <div className="flex-1 relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search by blood type or location..."
                className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <Button
              variant={filterUrgent ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterUrgent(!filterUrgent)}
              className={filterUrgent ? "bg-red-500 hover:bg-red-600" : ""}
            >
              <Filter className="w-4 h-4 mr-2" />
              Urgent Only
            </Button>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-4">
            <Card
              className="border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => setCurrentScreen("donation-history")}
            >
              <CardContent className="p-4 text-center">
                <div className="w-12 h-12 bg-teal-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <p className="font-semibold text-foreground">Donation History</p>
                <p className="text-xs text-muted-foreground mt-1">View past donations</p>
              </CardContent>
            </Card>

            <Card
              className="border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => setCurrentScreen("map-view")}
            >
              <CardContent className="p-4 text-center">
                <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <p className="font-semibold text-foreground">Map View</p>
                <p className="text-xs text-muted-foreground mt-1">Find nearby requests</p>
              </CardContent>
            </Card>
          </div>

          {/* Next Eligible Donation */}
          <Card className="border-0 shadow-sm bg-gradient-to-r from-teal-50 to-blue-50 border-l-4 border-l-teal-500">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-foreground">Next Eligible Donation</p>
                  <p className="text-sm text-muted-foreground">{nextEligibleDate}</p>
                </div>
                <Badge variant="secondary" className="bg-teal-100 text-teal-700">
                  Ready Soon
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Urgent Requests Section */}
          {urgentRequests.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5 text-red-500" />
                <h2 className="text-lg font-semibold text-foreground">Urgent Requests</h2>
                <Badge className="bg-red-500 text-white">{urgentRequests.length}</Badge>
              </div>
              <div className="space-y-3">
                {urgentRequests.map((request) => (
                  <Card key={request.id} className="border-0 shadow-sm border-l-4 border-l-red-500 bg-red-50">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                              <span className="text-white font-bold text-lg">{request.bloodType}</span>
                            </div>
                            <div>
                              <h3 className="font-semibold text-foreground">{request.hospitalName}</h3>
                              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                                <div className="flex items-center space-x-1">
                                  <MapPin className="w-4 h-4" />
                                  <span>{request.location}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Clock className="w-4 h-4" />
                                  <span>{request.timePosted}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4 mb-3">
                            <Badge className="bg-red-500 text-white">URGENT</Badge>
                            <span className="text-sm text-muted-foreground">{request.unitsNeeded} units needed</span>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          className="bg-red-500 hover:bg-red-600"
                          onClick={() => handleViewDetails(request)}
                        >
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Normal Requests Section */}
          {normalRequests.length > 0 && !filterUrgent && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-foreground">Other Requests</h2>
              <div className="space-y-3">
                {normalRequests.map((request) => (
                  <Card key={request.id} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <div className="w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center">
                              <span className="text-white font-bold text-lg">{request.bloodType}</span>
                            </div>
                            <div>
                              <h3 className="font-semibold text-foreground">{request.hospitalName}</h3>
                              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                                <div className="flex items-center space-x-1">
                                  <MapPin className="w-4 h-4" />
                                  <span>{request.location}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Clock className="w-4 h-4" />
                                  <span>{request.timePosted}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4 mb-3">
                            <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                              Normal
                            </Badge>
                            <span className="text-sm text-muted-foreground">{request.unitsNeeded} units needed</span>
                          </div>
                        </div>
                        <Button size="sm" variant="outline" onClick={() => handleViewDetails(request)}>
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  // Request Details Screen
  if (currentScreen === "request-details" && selectedRequest) {
    return (
      <div className="min-h-screen bg-neutral">
        {/* Header */}
        <div className="bg-card border-b border-border sticky top-0 z-10">
          <div className="px-6 py-4">
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="icon" onClick={() => setCurrentScreen("requests-list")}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-xl font-bold text-foreground">Request Details</h1>
                <p className="text-sm text-muted-foreground">Blood donation information</p>
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 py-6 space-y-6">
          {/* Hospital Info Card */}
          <Card
            className={`border-0 shadow-sm ${selectedRequest.urgency === "urgent" ? "border-l-4 border-l-red-500 bg-red-50" : "border-l-4 border-l-teal-500 bg-teal-50"}`}
          >
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div
                  className={`w-16 h-16 ${selectedRequest.urgency === "urgent" ? "bg-red-500" : "bg-teal-500"} rounded-full flex items-center justify-center`}
                >
                  <span className="text-white font-bold text-2xl">{selectedRequest.bloodType}</span>
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-foreground mb-2">{selectedRequest.hospitalName}</h2>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{selectedRequest.address}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{selectedRequest.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Requested {selectedRequest.timePosted}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Request Details */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Droplets className="w-5 h-5 text-teal-500" />
                <span>Blood Request Details</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Blood Type</p>
                  <p className="text-lg font-semibold text-foreground">{selectedRequest.bloodType}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Units Needed</p>
                  <p className="text-lg font-semibold text-foreground">{selectedRequest.unitsNeeded}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Urgency Level</p>
                  <Badge
                    className={
                      selectedRequest.urgency === "urgent" ? "bg-red-500 text-white" : "bg-blue-100 text-blue-700"
                    }
                  >
                    {selectedRequest.urgency.toUpperCase()}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Time Posted</p>
                  <p className="text-sm text-foreground">{selectedRequest.timePosted}</p>
                </div>
              </div>
              {selectedRequest.description && (
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Description</p>
                  <p className="text-sm text-foreground bg-muted/50 p-3 rounded-lg">{selectedRequest.description}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Map Preview */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-blue-500" />
                <span>Location</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="w-full h-48 bg-muted rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Navigation className="w-16 h-16 text-muted-foreground mx-auto mb-2" />
                  <p className="text-lg font-semibold text-foreground mb-2">Interactive Map View</p>
                  <p className="text-sm text-muted-foreground max-w-sm">
                    Red pins show urgent requests, teal pins show normal requests. Your location is marked with a blue
                    dot.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button
              className={`w-full ${selectedRequest.urgency === "urgent" ? "bg-red-500 hover:bg-red-600" : "bg-teal-500 hover:bg-teal-600"}`}
              onClick={handleDonateNow}
            >
              <Heart className="w-5 h-5 mr-2" />
              Donate Now
            </Button>
            <Button variant="outline" className="w-full bg-transparent" onClick={handleContactHospital}>
              <Phone className="w-4 h-4 mr-2" />
              Contact Hospital
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // Map View Screen
  if (currentScreen === "map-view") {
    return (
      <div className="min-h-screen bg-neutral">
        {/* Header */}
        <div className="bg-card border-b border-border sticky top-0 z-10">
          <div className="px-6 py-4">
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="icon" onClick={() => setCurrentScreen("requests-list")}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-xl font-bold text-foreground">Blood Requests Map</h1>
                <p className="text-sm text-muted-foreground">Find nearby donation opportunities</p>
              </div>
            </div>
          </div>
        </div>

        {/* Map Container */}
        <div className="relative h-[calc(100vh-120px)]">
          <div className="w-full h-full bg-muted flex items-center justify-center">
            <div className="text-center">
              <Navigation className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-lg font-semibold text-foreground mb-2">Interactive Map View</p>
              <p className="text-sm text-muted-foreground max-w-sm">
                Red pins show urgent requests, teal pins show normal requests. Your location is marked with a blue dot.
              </p>
            </div>
          </div>

          {/* Bottom Sheet with Selected Hospital */}
          <div className="absolute bottom-0 left-0 right-0 bg-card border-t border-border rounded-t-xl p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">O+</span>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground">City General Hospital</h3>
                <p className="text-sm text-muted-foreground">3 units needed • Urgent</p>
                <div className="flex items-center space-x-1 mt-1">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">0.8 miles away</span>
                </div>
              </div>
              <Button size="sm" className="bg-red-500 hover:bg-red-600">
                Donate
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Donation History Screen
  if (currentScreen === "donation-history") {
    return (
      <div className="min-h-screen bg-neutral">
        {/* Header */}
        <div className="bg-card border-b border-border sticky top-0 z-10">
          <div className="px-6 py-4">
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="icon" onClick={onBack}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-xl font-bold text-foreground">Donation History</h1>
                <p className="text-sm text-muted-foreground">Your blood donation records</p>
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 py-6 space-y-6">
          {/* Stats Card */}
          <Card className="border-0 shadow-sm bg-gradient-to-r from-teal-500 to-blue-500 text-white">
            <CardContent className="p-6">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold">12</p>
                  <p className="text-sm text-white/80">Total Donations</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">36</p>
                  <p className="text-sm text-white/80">Lives Saved</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">O+</p>
                  <p className="text-sm text-white/80">Blood Type</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Next Eligible Donation */}
          <Card className="border-0 shadow-sm border-l-4 border-l-teal-500 bg-teal-50">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-foreground">Next Eligible Donation</p>
                  <p className="text-sm text-muted-foreground">{nextEligibleDate}</p>
                </div>
                <Badge variant="secondary" className="bg-teal-100 text-teal-700">
                  Ready Soon
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Donation Records */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-foreground">Recent Donations</h2>
            <div className="space-y-3">
              {donationHistory.map((donation) => (
                <Card key={donation.id} className="border-0 shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-sm">{donation.bloodType}</span>
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">{donation.hospitalName}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(donation.date).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {donation.status === "completed" && (
                          <Badge className="bg-green-100 text-green-700">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Completed
                          </Badge>
                        )}
                        {donation.status === "scheduled" && (
                          <Badge className="bg-blue-100 text-blue-700">
                            <Calendar className="w-3 h-3 mr-1" />
                            Scheduled
                          </Badge>
                        )}
                        {donation.status === "cancelled" && (
                          <Badge className="bg-red-100 text-red-700">
                            <XCircle className="w-3 h-3 mr-1" />
                            Cancelled
                          </Badge>
                        )}
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

  // Donation Confirmation Screen
  if (currentScreen === "confirmation" && selectedRequest) {
    return (
      <div className="min-h-screen bg-neutral">
        {/* Header */}
        <div className="bg-card border-b border-border sticky top-0 z-10">
          <div className="px-6 py-4">
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="icon" onClick={() => setCurrentScreen("request-details")}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-xl font-bold text-foreground">Confirm Donation</h1>
                <p className="text-sm text-muted-foreground">Review your donation details</p>
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 py-6 space-y-6">
          {/* Donation Summary */}
          <Card className="border-0 shadow-sm border-l-4 border-l-teal-500 bg-teal-50">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-teal-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-2xl">{selectedRequest.bloodType}</span>
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-foreground">{selectedRequest.hospitalName}</h2>
                  <p className="text-sm text-muted-foreground">{selectedRequest.location}</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <Badge
                      className={
                        selectedRequest.urgency === "urgent" ? "bg-red-500 text-white" : "bg-blue-100 text-blue-700"
                      }
                    >
                      {selectedRequest.urgency.toUpperCase()}
                    </Badge>
                    <span className="text-sm text-muted-foreground">{selectedRequest.unitsNeeded} units needed</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Donor Information */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Donor Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Name</p>
                  <p className="font-semibold text-foreground">{userName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Blood Type</p>
                  <p className="font-semibold text-foreground">O+ (Compatible)</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Last Donation</p>
                  <p className="font-semibold text-foreground">Feb 20, 2024</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Eligibility</p>
                  <Badge className="bg-green-100 text-green-700">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Eligible
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Optional Notes */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Additional Notes (Optional)</CardTitle>
              <CardDescription>
                Share any relevant information about your availability or health condition
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="e.g., Available after 2 PM, prefer morning appointments..."
                value={donationNotes}
                onChange={(e) => setDonationNotes(e.target.value)}
                className="min-h-[100px]"
              />
            </CardContent>
          </Card>

          {/* Important Information */}
          <Card className="border-0 shadow-sm bg-blue-50 border-l-4 border-l-blue-500">
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <Info className="w-5 h-5 text-blue-500 mt-0.5" />
                <div>
                  <p className="font-semibold text-blue-900 mb-2">Before You Donate</p>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Eat a healthy meal and stay hydrated</li>
                    <li>• Bring a valid ID and donation card if you have one</li>
                    <li>• The hospital will contact you within 2 hours to schedule</li>
                    <li>• Donation process typically takes 45-60 minutes</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Confirm Button */}
          <Button className="w-full bg-teal-500 hover:bg-teal-600" onClick={handleConfirmDonation}>
            <Heart className="w-5 h-5 mr-2" />
            Confirm Donation
          </Button>
        </div>
      </div>
    )
  }

  // Success Screen
  if (currentScreen === "success") {
    return (
      <div className="min-h-screen bg-neutral flex items-center justify-center">
        <div className="px-6 py-12 text-center max-w-md mx-auto">
          {/* Success Illustration */}
          <div className="w-24 h-24 bg-teal-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Heart className="w-12 h-12 text-white" />
          </div>

          <h1 className="text-2xl font-bold text-foreground mb-4">Thank You for Your Donation!</h1>

          <p className="text-muted-foreground mb-8 leading-relaxed">
            Your generous donation will help save lives. The hospital will contact you soon to schedule your donation
            appointment.
          </p>

          {/* Success Details */}
          <Card className="border-0 shadow-sm mb-8">
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Hospital</span>
                  <span className="text-sm font-semibold text-foreground">{selectedRequest?.hospitalName}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Blood Type</span>
                  <span className="text-sm font-semibold text-foreground">{selectedRequest?.bloodType}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Expected Contact</span>
                  <span className="text-sm font-semibold text-foreground">Within 2 hours</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-3">
            <Button className="w-full bg-teal-500 hover:bg-teal-600" onClick={() => setCurrentScreen("requests-list")}>
              View More Requests
            </Button>
            <Button variant="outline" className="w-full bg-transparent" onClick={onNavigateToNotifications}>
              <Bell className="w-4 h-4 mr-2" />
              Check Notifications
            </Button>
            <Button variant="outline" className="w-full bg-transparent" onClick={onBack}>
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return null
}
