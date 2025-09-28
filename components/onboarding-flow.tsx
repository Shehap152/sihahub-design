"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface OnboardingFlowProps {
  onComplete: () => void
}

const onboardingSlides = [
  {
    id: 1,
    title: "Secure Digital Health Records",
    description: "Keep all your medical information organized and accessible in one secure place.",
    icon: (
      <svg className="w-16 h-16 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
    ),
  },
  {
    id: 2,
    title: "Easy Appointment Booking",
    description: "Schedule appointments with doctors and specialists with just a few taps.",
    icon: (
      <svg className="w-16 h-16 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
    ),
  },
  {
    id: 3,
    title: "Blood Donation & Emergency Help",
    description: "Connect with blood donors and get emergency medical assistance when you need it most.",
    icon: (
      <svg className="w-16 h-16 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    ),
  },
  {
    id: 4,
    title: "Connected Healthcare Network",
    description: "Join a trusted network of patients, doctors, and healthcare providers working together.",
    icon: (
      <svg className="w-16 h-16 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
    ),
  },
]

export default function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = () => {
    if (currentSlide < onboardingSlides.length - 1) {
      setCurrentSlide(currentSlide + 1)
    } else {
      onComplete()
    }
  }

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1)
    }
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const currentSlideData = onboardingSlides[currentSlide]

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header with Skip button */}
      <div className="flex justify-between items-center p-6">
        <Button variant="ghost" onClick={prevSlide} disabled={currentSlide === 0} className="p-2">
          <ChevronLeft className="w-5 h-5" />
        </Button>
        <Button variant="ghost" onClick={onComplete} className="text-muted-foreground hover:text-foreground">
          Skip
        </Button>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 pb-20">
        <div className="text-center max-w-sm animate-fade-in-up">
          {/* Icon */}
          <div className="mb-8 flex justify-center">
            <div className="p-6 bg-primary/10 rounded-3xl">{currentSlideData.icon}</div>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-foreground mb-4 text-balance">{currentSlideData.title}</h2>

          {/* Description */}
          <p className="text-muted-foreground text-lg leading-relaxed text-pretty">{currentSlideData.description}</p>
        </div>
      </div>

      {/* Bottom navigation */}
      <div className="px-8 pb-8">
        {/* Progress dots */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-2">
            {onboardingSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide ? "bg-primary w-6" : "bg-muted-foreground/30"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Action button */}
        <Button
          onClick={nextSlide}
          className="w-full h-14 text-lg font-semibold rounded-xl bg-primary hover:bg-primary/90"
          size="lg"
        >
          {currentSlide === onboardingSlides.length - 1 ? "Get Started" : "Continue"}
          <ChevronRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </div>
  )
}
