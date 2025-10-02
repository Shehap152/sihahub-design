"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, User, Upload, ChevronRight } from "lucide-react"

interface ProfileSetupProps {
  userRole: string
  onComplete: () => void
}

export default function ProfileSetup({ userRole, onComplete }: ProfileSetupProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [profileData, setProfileData] = useState({
    profilePicture: "",
    dateOfBirth: "",
    gender: "",
    bloodType: "",
    specialization: "",
    hospitalName: "",
    licenseNumber: "",
  })
  const [isLoading, setIsLoading] = useState(false)

  const totalSteps = 2

  const handleInputChange = (field: string, value: string) => {
    setProfileData((prev) => ({ ...prev, [field]: value }))
  }

  const handleNextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    } else {
      handleFinishSetup()
    }
  }

  const handleFinishSetup = async () => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      onComplete()
    }, 1500)
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setProfileData((prev) => ({ ...prev, profilePicture: e.target?.result as string }))
      }
      reader.readAsDataURL(file)
    }
  }

  const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]
  const specializations = [
    "General Medicine",
    "Cardiology",
    "Dermatology",
    "Neurology",
    "Orthopedics",
    "Pediatrics",
    "Psychiatry",
    "Surgery",
    "Other",
  ]

  const getRoleDisplayName = (role: string) => {
    switch (role) {
      case "patient":
        return "Patient"
      case "doctor":
        return "Doctor"
      case "hospital":
        return "Hospital/Clinic & Blood Donor"
      default:
        return "User"
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center px-6 py-12">
      <div className="max-w-sm mx-auto w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 bg-primary rounded-2xl flex items-center justify-center">
            <User className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Complete Your Profile</h1>
          <p className="text-muted-foreground">Help us personalize your SihaHub experience</p>
        </div>

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">
              Step {currentStep} of {totalSteps}
            </span>
            <span className="text-sm text-muted-foreground">{Math.round((currentStep / totalSteps) * 100)}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        <Card className="border-0 shadow-lg">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-xl text-center">
              {currentStep === 1 ? "Basic Information" : "Additional Details"}
            </CardTitle>
            <CardDescription className="text-center">
              {currentStep === 1
                ? "Tell us a bit about yourself"
                : `Complete your ${getRoleDisplayName(userRole).toLowerCase()} profile`}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {currentStep === 1 && (
              <div className="space-y-4">
                {/* Profile Picture Upload */}
                <div className="space-y-2">
                  <Label>Profile Picture (Optional)</Label>
                  <div className="flex flex-col items-center space-y-4">
                    <Avatar className="w-20 h-20">
                      <AvatarImage src={profileData.profilePicture || "/placeholder.svg"} />
                      <AvatarFallback className="bg-primary/10 text-primary text-lg">
                        <User className="w-8 h-8" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="relative">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        id="profile-upload"
                      />
                      <Button variant="outline" className="relative bg-transparent">
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Photo
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Date of Birth */}
                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Date of Birth</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={profileData.dateOfBirth}
                      onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                      className="pl-10 h-12"
                      required
                    />
                  </div>
                </div>

                {/* Gender */}
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Select value={profileData.gender} onValueChange={(value) => handleInputChange("gender", value)}>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select your gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                      <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Blood Type (for patients and hospital/clinic users who may be blood donors) */}
                {(userRole === "patient" || userRole === "hospital") && (
                  <div className="space-y-2">
                    <Label htmlFor="bloodType">Blood Type</Label>
                    <Select
                      value={profileData.bloodType}
                      onValueChange={(value) => handleInputChange("bloodType", value)}
                    >
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Select your blood type" />
                      </SelectTrigger>
                      <SelectContent>
                        {bloodTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-4">
                {/* Doctor-specific fields */}
                {userRole === "doctor" && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="specialization">Specialization</Label>
                      <Select
                        value={profileData.specialization}
                        onValueChange={(value) => handleInputChange("specialization", value)}
                      >
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="Select your specialization" />
                        </SelectTrigger>
                        <SelectContent>
                          {specializations.map((spec) => (
                            <SelectItem key={spec} value={spec}>
                              {spec}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="licenseNumber">Medical License Number</Label>
                      <Input
                        id="licenseNumber"
                        type="text"
                        placeholder="Enter your license number"
                        value={profileData.licenseNumber}
                        onChange={(e) => handleInputChange("licenseNumber", e.target.value)}
                        className="h-12"
                        required
                      />
                    </div>
                  </>
                )}

                {/* Hospital-specific fields */}
                {userRole === "hospital" && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="hospitalName">Hospital/Clinic Name</Label>
                      <Input
                        id="hospitalName"
                        type="text"
                        placeholder="Enter hospital or clinic name"
                        value={profileData.hospitalName}
                        onChange={(e) => handleInputChange("hospitalName", e.target.value)}
                        className="h-12"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="licenseNumber">Registration Number</Label>
                      <Input
                        id="licenseNumber"
                        type="text"
                        placeholder="Enter registration number"
                        value={profileData.licenseNumber}
                        onChange={(e) => handleInputChange("licenseNumber", e.target.value)}
                        className="h-12"
                        required
                      />
                    </div>
                  </>
                )}

                {/* Patient/Hospital completion message */}
                {(userRole === "patient" || userRole === "hospital") && (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                      <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Almost Done!</h3>
                    <p className="text-muted-foreground text-sm">
                      Your profile is ready. Click finish to start using SihaHub.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Action Button */}
            <Button onClick={handleNextStep} className="w-full h-12 text-base font-semibold" disabled={isLoading}>
              {isLoading ? "Setting up..." : currentStep === totalSteps ? "Finish Setup" : "Continue"}
              {!isLoading && <ChevronRight className="w-5 h-5 ml-2" />}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
