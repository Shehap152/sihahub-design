"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  Heart,
  Droplets,
  Apple,
  Moon,
  Dumbbell,
  Brain,
  Shield,
  Bookmark,
  BookmarkCheck,
  Share,
  Play,
  ChevronRight,
  Search,
  Lightbulb,
  Clock,
  User,
  Star,
  Bell,
} from "lucide-react"

interface HealthTipsProps {
  userName: string
  onBack: () => void
  onNavigateToNotifications?: () => void
}

type HealthTipsScreen = "main" | "tip-detail" | "saved-tips" | "personalized"

interface HealthTip {
  id: string
  title: string
  description: string
  category: string
  tags: string[]
  readTime: string
  isBookmarked: boolean
  hasVideo: boolean
  content: string
  relatedTips: string[]
  illustration?: string
}

export default function HealthTips({ userName, onBack, onNavigateToNotifications }: HealthTipsProps) {
  const [currentScreen, setCurrentScreen] = useState<HealthTipsScreen>("main")
  const [selectedTip, setSelectedTip] = useState<HealthTip | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  // Mock health tips data
  const [healthTips, setHealthTips] = useState<HealthTip[]>([
    {
      id: "1",
      title: "Stay Hydrated for Better Health",
      description: "Learn why proper hydration is essential for your body's optimal function and overall well-being.",
      category: "Nutrition",
      tags: ["Hydration", "Wellness", "Daily Habits"],
      readTime: "3 min read",
      isBookmarked: true,
      hasVideo: false,
      content: `Proper hydration is one of the most fundamental aspects of maintaining good health. Your body is approximately 60% water, and every system depends on water to function properly.

**Why Hydration Matters:**
• Regulates body temperature through sweating and respiration
• Lubricates and cushions joints
• Protects sensitive tissues and organs
• Helps remove waste through urination, bowel movements, and sweating
• Aids in digestion and nutrient absorption

**Daily Hydration Goals:**
The general recommendation is 8 glasses (64 ounces) of water per day, but individual needs vary based on:
- Activity level and exercise intensity
- Climate and temperature
- Overall health status
- Pregnancy or breastfeeding

**Signs of Proper Hydration:**
- Light yellow or clear urine
- Moist lips and mouth
- Elastic skin (pinch test)
- Stable energy levels
- Regular bathroom breaks

**Hydration Tips:**
1. Start your day with a glass of water
2. Keep a water bottle with you
3. Eat water-rich foods like fruits and vegetables
4. Set reminders to drink water throughout the day
5. Monitor your urine color as a hydration indicator

Remember, by the time you feel thirsty, you're already mildly dehydrated. Make hydration a consistent daily habit for optimal health.`,
      relatedTips: ["2", "3"],
    },
    {
      id: "2",
      title: "The Power of Regular Exercise",
      description: "Discover how just 30 minutes of daily activity can transform your physical and mental health.",
      category: "Exercise",
      tags: ["Fitness", "Mental Health", "Heart Health"],
      readTime: "5 min read",
      isBookmarked: false,
      hasVideo: true,
      content: `Regular physical activity is one of the most powerful tools for maintaining and improving your health. The benefits extend far beyond weight management and muscle building.

**Physical Benefits:**
• Strengthens heart and improves circulation
• Builds and maintains strong bones and muscles
• Improves immune system function
• Enhances sleep quality
• Increases energy levels and stamina

**Mental Health Benefits:**
• Reduces symptoms of depression and anxiety
• Improves mood and emotional well-being
• Enhances cognitive function and memory
• Reduces stress and promotes relaxation
• Boosts self-esteem and confidence

**Getting Started:**
You don't need to become a marathon runner overnight. Start with:
- 10-15 minutes of walking daily
- Taking stairs instead of elevators
- Parking farther away from destinations
- Dancing to your favorite music
- Gardening or household chores

**Building a Routine:**
1. Choose activities you enjoy
2. Start slowly and gradually increase intensity
3. Set realistic, achievable goals
4. Find a workout buddy for motivation
5. Track your progress to stay motivated

**Types of Exercise:**
- **Aerobic:** Walking, swimming, cycling, dancing
- **Strength:** Weight lifting, resistance bands, bodyweight exercises
- **Flexibility:** Yoga, stretching, tai chi
- **Balance:** Yoga, tai chi, balance exercises

The key is consistency. Even moderate activity for 150 minutes per week can significantly improve your health and quality of life.`,
      relatedTips: ["1", "4"],
    },
    {
      id: "3",
      title: "Nutrition Basics for Optimal Health",
      description:
        "Simple guidelines for eating a balanced diet that nourishes your body and supports long-term wellness.",
      category: "Nutrition",
      tags: ["Diet", "Wellness", "Energy"],
      readTime: "4 min read",
      isBookmarked: true,
      hasVideo: false,
      content: `Good nutrition is the foundation of health and well-being. What you eat directly impacts your energy levels, mood, weight, and risk of chronic diseases.

**The Balanced Plate:**
Fill your plate with:
- **1/2 vegetables and fruits** (variety of colors)
- **1/4 whole grains** (brown rice, quinoa, whole wheat)
- **1/4 lean protein** (fish, poultry, beans, nuts)
- **Healthy fats** (olive oil, avocado, nuts)

**Key Nutrients:**
• **Protein:** Builds and repairs tissues, supports immune function
• **Carbohydrates:** Primary energy source for brain and muscles
• **Healthy Fats:** Support brain function and hormone production
• **Vitamins & Minerals:** Essential for various body functions
• **Fiber:** Aids digestion and helps maintain healthy weight

**Healthy Eating Tips:**
1. Eat regular meals and healthy snacks
2. Choose whole foods over processed options
3. Read nutrition labels carefully
4. Control portion sizes
5. Stay hydrated with water
6. Limit added sugars and sodium
7. Cook more meals at home

**Foods to Emphasize:**
- Colorful fruits and vegetables
- Whole grains and legumes
- Lean proteins and fish
- Nuts, seeds, and healthy oils
- Low-fat dairy or alternatives

**Foods to Limit:**
- Processed and packaged foods
- Sugary drinks and snacks
- Excessive saturated and trans fats
- High-sodium foods
- Refined grains and sugars

Remember, small changes in your eating habits can lead to significant improvements in your health over time.`,
      relatedTips: ["1", "5"],
    },
    {
      id: "4",
      title: "Quality Sleep for Better Health",
      description:
        "Learn how to improve your sleep quality and why good sleep is essential for physical and mental health.",
      category: "Sleep",
      tags: ["Sleep", "Recovery", "Mental Health"],
      readTime: "4 min read",
      isBookmarked: false,
      hasVideo: true,
      content: `Quality sleep is not a luxury—it's essential for good health. During sleep, your body repairs itself, consolidates memories, and prepares for the next day.

**Why Sleep Matters:**
• Physical recovery and tissue repair
• Memory consolidation and learning
• Immune system strengthening
• Hormone regulation
• Emotional processing and mental health

**Sleep Requirements:**
- **Adults:** 7-9 hours per night
- **Teenagers:** 8-10 hours per night
- **Children:** 9-11 hours per night
- **Quality matters as much as quantity**

**Creating a Sleep-Friendly Environment:**
1. Keep bedroom cool (60-67°F)
2. Make it as dark as possible
3. Minimize noise or use white noise
4. Invest in a comfortable mattress and pillows
5. Remove electronic devices

**Healthy Sleep Habits:**
• Maintain a consistent sleep schedule
• Create a relaxing bedtime routine
• Avoid caffeine late in the day
• Limit screen time before bed
• Get natural sunlight during the day
• Exercise regularly (but not close to bedtime)

**Common Sleep Disruptors:**
- Stress and anxiety
- Irregular schedules
- Caffeine and alcohol
- Large meals before bedtime
- Electronic devices and blue light
- Uncomfortable sleep environment

**Improving Sleep Quality:**
1. Establish a wind-down routine
2. Try relaxation techniques (deep breathing, meditation)
3. Keep a sleep diary to identify patterns
4. Consider natural sleep aids (chamomile tea, magnesium)
5. Seek professional help for persistent sleep problems

Good sleep is an investment in your health that pays dividends in energy, mood, and overall well-being.`,
      relatedTips: ["2", "6"],
    },
    {
      id: "5",
      title: "Managing Stress for Better Health",
      description:
        "Effective strategies to reduce stress and build resilience for improved physical and mental well-being.",
      category: "Mental Health",
      tags: ["Stress", "Mindfulness", "Wellness"],
      readTime: "6 min read",
      isBookmarked: true,
      hasVideo: false,
      content: `Chronic stress can have serious impacts on both physical and mental health. Learning to manage stress effectively is crucial for overall well-being.

**Understanding Stress:**
Stress is your body's natural response to challenges or threats. While short-term stress can be helpful, chronic stress can lead to:
- High blood pressure and heart disease
- Weakened immune system
- Digestive problems
- Sleep disorders
- Anxiety and depression
- Memory and concentration issues

**Stress Management Techniques:**

**1. Mindfulness and Meditation:**
- Practice deep breathing exercises
- Try guided meditation apps
- Focus on the present moment
- Practice gratitude daily

**2. Physical Activity:**
- Regular exercise reduces stress hormones
- Yoga combines movement with mindfulness
- Even short walks can help clear your mind

**3. Time Management:**
- Prioritize tasks and set realistic goals
- Learn to say no to unnecessary commitments
- Break large tasks into smaller, manageable steps
- Use planning tools and calendars

**4. Social Support:**
- Connect with family and friends
- Join support groups or communities
- Don't hesitate to ask for help
- Consider professional counseling if needed

**5. Healthy Lifestyle Choices:**
- Maintain regular sleep schedule
- Eat nutritious, balanced meals
- Limit caffeine and alcohol
- Avoid tobacco and excessive sugar

**Quick Stress Relief Techniques:**
• Take 10 deep breaths
• Practice progressive muscle relaxation
• Listen to calming music
• Take a warm bath or shower
• Spend time in nature
• Practice positive self-talk

**Building Resilience:**
1. Develop a positive mindset
2. Learn from challenges and setbacks
3. Maintain perspective on problems
4. Build strong relationships
5. Take care of your physical health
6. Practice self-compassion

Remember, managing stress is a skill that improves with practice. Start with small changes and gradually build your stress management toolkit.`,
      relatedTips: ["4", "6"],
    },
    {
      id: "6",
      title: "Heart Health Fundamentals",
      description: "Essential tips for maintaining a healthy heart and reducing your risk of cardiovascular disease.",
      category: "Heart Health",
      tags: ["Heart", "Prevention", "Lifestyle"],
      readTime: "5 min read",
      isBookmarked: false,
      hasVideo: true,
      content: `Your heart is one of your body's most important organs, pumping blood and nutrients throughout your system 24/7. Taking care of your heart health is essential for a long, healthy life.

**Key Risk Factors:**
- High blood pressure
- High cholesterol
- Smoking
- Diabetes
- Obesity
- Physical inactivity
- Poor diet
- Excessive alcohol consumption
- Chronic stress
- Family history

**Heart-Healthy Lifestyle:**

**1. Eat a Heart-Healthy Diet:**
- Plenty of fruits and vegetables
- Whole grains and fiber-rich foods
- Lean proteins (fish, poultry, legumes)
- Healthy fats (olive oil, nuts, avocados)
- Limit saturated and trans fats
- Reduce sodium intake
- Minimize processed foods

**2. Stay Physically Active:**
- Aim for 150 minutes of moderate exercise weekly
- Include both aerobic and strength training
- Start slowly and gradually increase intensity
- Find activities you enjoy

**3. Maintain a Healthy Weight:**
- Calculate your BMI and waist circumference
- Set realistic weight loss goals
- Focus on sustainable lifestyle changes
- Seek professional guidance if needed

**4. Don't Smoke:**
- Quit smoking if you currently smoke
- Avoid secondhand smoke
- Seek support and resources for quitting

**5. Manage Stress:**
- Practice relaxation techniques
- Get adequate sleep
- Maintain social connections
- Consider meditation or yoga

**6. Monitor Your Numbers:**
- Blood pressure: Less than 120/80 mmHg
- Cholesterol: Total less than 200 mg/dL
- Blood sugar: Fasting less than 100 mg/dL
- BMI: 18.5-24.9

**Warning Signs to Watch For:**
• Chest pain or discomfort
• Shortness of breath
• Pain in arms, back, neck, or jaw
• Unusual fatigue
• Dizziness or lightheadedness
• Rapid or irregular heartbeat

**Regular Check-ups:**
Schedule regular visits with your healthcare provider to:
- Monitor blood pressure and cholesterol
- Assess overall cardiovascular risk
- Adjust medications if needed
- Discuss lifestyle modifications

Taking care of your heart is an investment in your future. Small changes today can lead to significant benefits for your cardiovascular health.`,
      relatedTips: ["2", "3"],
    },
  ])

  const categories = ["all", "Nutrition", "Exercise", "Sleep", "Mental Health", "Heart Health"]

  const filteredTips = healthTips.filter((tip) => {
    const matchesSearch =
      tip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tip.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tip.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesCategory = selectedCategory === "all" || tip.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  const savedTips = healthTips.filter((tip) => tip.isBookmarked)

  const personalizedTips = healthTips.filter(
    (tip) => tip.category === "Heart Health" || tip.category === "Exercise" || tip.tags.includes("Wellness"),
  )

  const handleBookmarkToggle = (tipId: string) => {
    setHealthTips((prev) => prev.map((tip) => (tip.id === tipId ? { ...tip, isBookmarked: !tip.isBookmarked } : tip)))
  }

  const handleTipClick = (tip: HealthTip) => {
    setSelectedTip(tip)
    setCurrentScreen("tip-detail")
  }

  const handleShare = (tip: HealthTip) => {
    const shareOptions = ["Share to Social Media", "Send to Family/Friends", "Save to Notifications"]

    const choice = confirm(`Share "${tip.title}"?\n\nThis will create a reminder notification for you.`)
    if (choice && onNavigateToNotifications) {
      alert("Health tip saved! You'll receive a reminder notification.")
    }
  }

  // Main Health Tips Screen
  if (currentScreen === "main") {
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
                <h1 className="text-xl font-bold text-foreground">Health Tips & Recommendations</h1>
                <p className="text-sm text-muted-foreground">Your guide to better health</p>
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 py-6 space-y-6">
          {/* Search and Filter */}
          <div className="space-y-3">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search health tips..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="flex items-center space-x-2 overflow-x-auto pb-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={`whitespace-nowrap ${
                    selectedCategory === category ? "bg-teal-500 hover:bg-teal-600" : ""
                  }`}
                >
                  {category === "all" ? "All Tips" : category}
                </Button>
              ))}
            </div>
          </div>

          {/* Quick Access Cards */}
          <div className="grid grid-cols-2 gap-4">
            <Card
              className="border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => setCurrentScreen("personalized")}
            >
              <CardContent className="p-4 text-center">
                <div className="w-12 h-12 bg-teal-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <User className="w-6 h-6 text-white" />
                </div>
                <p className="font-semibold text-foreground">For You</p>
                <p className="text-xs text-muted-foreground mt-1">Personalized tips</p>
              </CardContent>
            </Card>

            <Card
              className="border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => setCurrentScreen("saved-tips")}
            >
              <CardContent className="p-4 text-center">
                <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <BookmarkCheck className="w-6 h-6 text-white" />
                </div>
                <p className="font-semibold text-foreground">Saved Tips</p>
                <p className="text-xs text-muted-foreground mt-1">{savedTips.length} saved</p>
              </CardContent>
            </Card>
          </div>

          {/* Today's Featured Tip */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-foreground">Today's Featured Tip</h2>
            <Card className="border-0 shadow-sm bg-gradient-to-r from-teal-500 to-blue-500 text-white">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Droplets className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2">Stay Hydrated</h3>
                    <p className="text-white/90 text-sm leading-relaxed mb-4">
                      Drink at least 8 glasses of water daily to maintain optimal health. Proper hydration helps your
                      body function efficiently and keeps your skin healthy.
                    </p>
                    <Button
                      variant="secondary"
                      size="sm"
                      className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                      onClick={() => handleTipClick(healthTips[0])}
                    >
                      Read More
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Health Tips List */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-foreground">
              {selectedCategory === "all" ? "All Health Tips" : `${selectedCategory} Tips`}
            </h2>
            <div className="space-y-3">
              {filteredTips.map((tip) => (
                <Card
                  key={tip.id}
                  className="border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => handleTipClick(tip)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        {tip.category === "Nutrition" && <Apple className="w-6 h-6 text-teal-600" />}
                        {tip.category === "Exercise" && <Dumbbell className="w-6 h-6 text-teal-600" />}
                        {tip.category === "Sleep" && <Moon className="w-6 h-6 text-teal-600" />}
                        {tip.category === "Mental Health" && <Brain className="w-6 h-6 text-teal-600" />}
                        {tip.category === "Heart Health" && <Heart className="w-6 h-6 text-teal-600" />}
                        {!["Nutrition", "Exercise", "Sleep", "Mental Health", "Heart Health"].includes(
                          tip.category,
                        ) && <Lightbulb className="w-6 h-6 text-teal-600" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-semibold text-foreground text-sm line-clamp-1">{tip.title}</h3>
                          <div className="flex items-center space-x-2 ml-2">
                            {tip.hasVideo && <Play className="w-4 h-4 text-blue-500" />}
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleBookmarkToggle(tip.id)
                              }}
                            >
                              {tip.isBookmarked ? (
                                <BookmarkCheck className="w-4 h-4 text-teal-500" />
                              ) : (
                                <Bookmark className="w-4 h-4 text-muted-foreground" />
                              )}
                            </Button>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{tip.description}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Badge variant="secondary" className="text-xs">
                              {tip.category}
                            </Badge>
                            <div className="flex items-center space-x-1">
                              <Clock className="w-3 h-3 text-muted-foreground" />
                              <span className="text-xs text-muted-foreground">{tip.readTime}</span>
                            </div>
                          </div>
                          <ChevronRight className="w-4 h-4 text-muted-foreground" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {filteredTips.length === 0 && (
            <div className="text-center py-12">
              <Lightbulb className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No tips found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or category filter to find more health tips.
              </p>
            </div>
          )}
        </div>
      </div>
    )
  }

  // Tip Detail Screen
  if (currentScreen === "tip-detail" && selectedTip) {
    const relatedTipsData = healthTips.filter((tip) => selectedTip.relatedTips.includes(tip.id))

    return (
      <div className="min-h-screen bg-neutral">
        {/* Header */}
        <div className="bg-card border-b border-border sticky top-0 z-10">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Button variant="ghost" size="icon" onClick={() => setCurrentScreen("main")}>
                  <ArrowLeft className="w-5 h-5" />
                </Button>
                <div>
                  <h1 className="text-xl font-bold text-foreground">Health Tip</h1>
                  <p className="text-sm text-muted-foreground">{selectedTip.readTime}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="icon" onClick={() => handleShare(selectedTip)}>
                  <Share className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleBookmarkToggle(selectedTip.id)}>
                  {selectedTip.isBookmarked ? (
                    <BookmarkCheck className="w-5 h-5 text-teal-500" />
                  ) : (
                    <Bookmark className="w-5 h-5" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 py-6 space-y-6">
          {/* Tip Header */}
          <Card className="border-0 shadow-sm border-l-4 border-l-teal-500 bg-teal-50">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-teal-500 rounded-full flex items-center justify-center">
                  {selectedTip.category === "Nutrition" && <Apple className="w-8 h-8 text-white" />}
                  {selectedTip.category === "Exercise" && <Dumbbell className="w-8 h-8 text-white" />}
                  {selectedTip.category === "Sleep" && <Moon className="w-8 h-8 text-white" />}
                  {selectedTip.category === "Mental Health" && <Brain className="w-8 h-8 text-white" />}
                  {selectedTip.category === "Heart Health" && <Heart className="w-8 h-8 text-white" />}
                  {!["Nutrition", "Exercise", "Sleep", "Mental Health", "Heart Health"].includes(
                    selectedTip.category,
                  ) && <Lightbulb className="w-8 h-8 text-white" />}
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-foreground mb-2">{selectedTip.title}</h2>
                  <p className="text-muted-foreground mb-4">{selectedTip.description}</p>
                  <div className="flex items-center space-x-3">
                    <Badge className="bg-teal-100 text-teal-700">{selectedTip.category}</Badge>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{selectedTip.readTime}</span>
                    </div>
                    {selectedTip.hasVideo && (
                      <div className="flex items-center space-x-1">
                        <Play className="w-4 h-4 text-blue-500" />
                        <span className="text-sm text-blue-500">Video included</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Video Player (if applicable) */}
          {selectedTip.hasVideo && (
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="w-full h-48 bg-muted rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <Play className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <p className="text-lg font-semibold text-foreground mb-2">Educational Video</p>
                    <p className="text-sm text-muted-foreground">
                      Watch to learn more about {selectedTip.title.toLowerCase()}
                    </p>
                    <Button className="mt-4 bg-teal-500 hover:bg-teal-600">
                      <Play className="w-4 h-4 mr-2" />
                      Play Video
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Tip Content */}
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="prose prose-sm max-w-none">
                <div className="whitespace-pre-line text-foreground leading-relaxed">{selectedTip.content}</div>
              </div>
            </CardContent>
          </Card>

          {/* Tags */}
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4">
              <h3 className="font-semibold text-foreground mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {selectedTip.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    #{tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Reminder Creation Option */}
          <Card className="border-0 shadow-sm bg-blue-50 border-l-4 border-l-blue-500">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Bell className="w-5 h-5 text-blue-500" />
                  <div>
                    <p className="font-semibold text-blue-900">Set Reminder</p>
                    <p className="text-sm text-blue-700">Get notified to practice this health tip</p>
                  </div>
                </div>
                <Button size="sm" className="bg-blue-500 hover:bg-blue-600" onClick={onNavigateToNotifications}>
                  Create Reminder
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Related Tips */}
          {relatedTipsData.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Related Tips</h3>
              <div className="space-y-3">
                {relatedTipsData.map((tip) => (
                  <Card
                    key={tip.id}
                    className="border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => handleTipClick(tip)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          {tip.category === "Nutrition" && <Apple className="w-5 h-5 text-blue-600" />}
                          {tip.category === "Exercise" && <Dumbbell className="w-5 h-5 text-blue-600" />}
                          {tip.category === "Sleep" && <Moon className="w-5 h-5 text-blue-600" />}
                          {tip.category === "Mental Health" && <Brain className="w-5 h-5 text-blue-600" />}
                          {tip.category === "Heart Health" && <Heart className="w-5 h-5 text-blue-600" />}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-foreground text-sm">{tip.title}</h4>
                          <p className="text-xs text-muted-foreground">
                            {tip.category} • {tip.readTime}
                          </p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-muted-foreground" />
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

  // Saved Tips Screen
  if (currentScreen === "saved-tips") {
    return (
      <div className="min-h-screen bg-neutral">
        {/* Header */}
        <div className="bg-card border-b border-border sticky top-0 z-10">
          <div className="px-6 py-4">
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="icon" onClick={() => setCurrentScreen("main")}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-xl font-bold text-foreground">Saved Tips</h1>
                <p className="text-sm text-muted-foreground">{savedTips.length} saved tips</p>
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 py-6 space-y-6">
          {savedTips.length > 0 ? (
            <div className="space-y-3">
              {savedTips.map((tip) => (
                <Card
                  key={tip.id}
                  className="border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => handleTipClick(tip)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        {tip.category === "Nutrition" && <Apple className="w-6 h-6 text-teal-600" />}
                        {tip.category === "Exercise" && <Dumbbell className="w-6 h-6 text-teal-600" />}
                        {tip.category === "Sleep" && <Moon className="w-6 h-6 text-teal-600" />}
                        {tip.category === "Mental Health" && <Brain className="w-6 h-6 text-teal-600" />}
                        {tip.category === "Heart Health" && <Heart className="w-6 h-6 text-teal-600" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-semibold text-foreground text-sm line-clamp-1">{tip.title}</h3>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 ml-2"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleBookmarkToggle(tip.id)
                            }}
                          >
                            <BookmarkCheck className="w-4 h-4 text-teal-500" />
                          </Button>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{tip.description}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Badge variant="secondary" className="text-xs">
                              {tip.category}
                            </Badge>
                            <div className="flex items-center space-x-1">
                              <Clock className="w-3 h-3 text-muted-foreground" />
                              <span className="text-xs text-muted-foreground">{tip.readTime}</span>
                            </div>
                          </div>
                          <ChevronRight className="w-4 h-4 text-muted-foreground" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <BookmarkCheck className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No saved tips yet</h3>
              <p className="text-muted-foreground mb-6">
                Start saving health tips that interest you for easy access later.
              </p>
              <Button className="bg-teal-500 hover:bg-teal-600" onClick={() => setCurrentScreen("main")}>
                Browse Health Tips
              </Button>
            </div>
          )}
        </div>
      </div>
    )
  }

  // Personalized Tips Screen
  if (currentScreen === "personalized") {
    return (
      <div className="min-h-screen bg-neutral">
        {/* Header */}
        <div className="bg-card border-b border-border sticky top-0 z-10">
          <div className="px-6 py-4">
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="icon" onClick={() => setCurrentScreen("main")}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-xl font-bold text-foreground">For You</h1>
                <p className="text-sm text-muted-foreground">Personalized health recommendations</p>
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 py-6 space-y-6">
          {/* Personalization Info */}
          <Card className="border-0 shadow-sm bg-gradient-to-r from-teal-50 to-blue-50 border-l-4 border-l-teal-500">
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <Star className="w-5 h-5 text-teal-500 mt-0.5" />
                <div>
                  <p className="font-semibold text-teal-900 mb-2">Tailored for You</p>
                  <p className="text-sm text-teal-800">
                    Based on your health profile and interests, we've selected these tips to help you maintain optimal
                    wellness.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Personalized Tips */}
          <div className="space-y-3">
            {personalizedTips.map((tip) => (
              <Card
                key={tip.id}
                className="border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => handleTipClick(tip)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      {tip.category === "Heart Health" && <Heart className="w-6 h-6 text-teal-600" />}
                      {tip.category === "Exercise" && <Dumbbell className="w-6 h-6 text-teal-600" />}
                      {tip.tags.includes("Wellness") && <Shield className="w-6 h-6 text-teal-600" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-foreground text-sm line-clamp-1">{tip.title}</h3>
                        <div className="flex items-center space-x-2 ml-2">
                          <Badge className="bg-teal-100 text-teal-700 text-xs">For You</Badge>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleBookmarkToggle(tip.id)
                            }}
                          >
                            {tip.isBookmarked ? (
                              <BookmarkCheck className="w-4 h-4 text-teal-500" />
                            ) : (
                              <Bookmark className="w-4 h-4 text-muted-foreground" />
                            )}
                          </Button>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{tip.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Badge variant="secondary" className="text-xs">
                            {tip.category}
                          </Badge>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-3 h-3 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">{tip.readTime}</span>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-muted-foreground" />
                      </div>
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

  return null
}
