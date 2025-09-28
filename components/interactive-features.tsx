"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/input"
import {
  ArrowLeft,
  Users,
  Trophy,
  Target,
  CheckCircle,
  Heart,
  Activity,
  Zap,
  Award,
  TrendingUp,
  Share,
  ThumbsUp,
  MessageSquare,
  Send,
  Plus,
  Clock,
  Flame,
  Gift,
  Apple,
  Moon,
} from "lucide-react"

interface InteractiveFeaturesProps {
  userName: string
  onBack: () => void
}

type InteractiveScreen = "main" | "community" | "gamification" | "goals" | "chat" | "challenges"

interface CommunityPost {
  id: string
  author: string
  avatar: string
  content: string
  timestamp: string
  likes: number
  comments: number
  isLiked: boolean
  category: "success" | "question" | "tip" | "support"
}

interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  progress: number
  maxProgress: number
  isUnlocked: boolean
  points: number
}

interface HealthGoal {
  id: string
  title: string
  description: string
  category: "fitness" | "nutrition" | "sleep" | "wellness"
  targetValue: number
  currentValue: number
  unit: string
  deadline: string
  isCompleted: boolean
}

interface Challenge {
  id: string
  title: string
  description: string
  duration: string
  participants: number
  category: "fitness" | "nutrition" | "wellness"
  difficulty: "easy" | "medium" | "hard"
  reward: string
  isJoined: boolean
}

export default function InteractiveFeatures({ userName, onBack }: InteractiveFeaturesProps) {
  const [currentScreen, setCurrentScreen] = useState<InteractiveScreen>("main")
  const [newPostContent, setNewPostContent] = useState("")
  const [newGoalTitle, setNewGoalTitle] = useState("")
  const [newGoalTarget, setNewGoalTarget] = useState("")

  // Mock data for community posts
  const [communityPosts, setCommunityPosts] = useState<CommunityPost[]>([
    {
      id: "1",
      author: "Sarah M.",
      avatar: "SM",
      content:
        "Just completed my first 5K run! Thanks to everyone in this community for the motivation. The health tips really helped me prepare. 🏃‍♀️",
      timestamp: "2 hours ago",
      likes: 24,
      comments: 8,
      isLiked: false,
      category: "success",
    },
    {
      id: "2",
      author: "Dr. Johnson",
      avatar: "DJ",
      content:
        "Quick tip: Drinking water first thing in the morning helps kickstart your metabolism and improves mental clarity throughout the day.",
      timestamp: "4 hours ago",
      likes: 45,
      comments: 12,
      isLiked: true,
      category: "tip",
    },
    {
      id: "3",
      author: "Mike R.",
      avatar: "MR",
      content:
        "Has anyone tried meditation for better sleep? I'm struggling with insomnia and looking for natural solutions.",
      timestamp: "6 hours ago",
      likes: 8,
      comments: 15,
      isLiked: false,
      category: "question",
    },
    {
      id: "4",
      author: "Lisa K.",
      avatar: "LK",
      content:
        "Sending positive vibes to everyone working on their health goals today! Remember, small steps lead to big changes. 💪",
      timestamp: "1 day ago",
      likes: 67,
      comments: 23,
      isLiked: true,
      category: "support",
    },
  ])

  // Mock achievements data
  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: "1",
      title: "First Steps",
      description: "Complete your first health goal",
      icon: "👟",
      progress: 1,
      maxProgress: 1,
      isUnlocked: true,
      points: 100,
    },
    {
      id: "2",
      title: "Hydration Hero",
      description: "Drink 8 glasses of water for 7 consecutive days",
      icon: "💧",
      progress: 5,
      maxProgress: 7,
      isUnlocked: false,
      points: 200,
    },
    {
      id: "3",
      title: "Community Helper",
      description: "Help 10 community members with advice",
      icon: "🤝",
      progress: 3,
      maxProgress: 10,
      isUnlocked: false,
      points: 300,
    },
    {
      id: "4",
      title: "Streak Master",
      description: "Maintain a 30-day health goal streak",
      icon: "🔥",
      progress: 12,
      maxProgress: 30,
      isUnlocked: false,
      points: 500,
    },
    {
      id: "5",
      title: "Blood Donor",
      description: "Complete your first blood donation",
      icon: "❤️",
      progress: 1,
      maxProgress: 1,
      isUnlocked: true,
      points: 250,
    },
  ])

  // Mock health goals data
  const [healthGoals, setHealthGoals] = useState<HealthGoal[]>([
    {
      id: "1",
      title: "Daily Water Intake",
      description: "Drink 8 glasses of water daily",
      category: "nutrition",
      targetValue: 8,
      currentValue: 5,
      unit: "glasses",
      deadline: "Daily",
      isCompleted: false,
    },
    {
      id: "2",
      title: "Weekly Exercise",
      description: "Exercise for 150 minutes per week",
      category: "fitness",
      targetValue: 150,
      currentValue: 90,
      unit: "minutes",
      deadline: "This week",
      isCompleted: false,
    },
    {
      id: "3",
      title: "Sleep Schedule",
      description: "Get 8 hours of sleep nightly",
      category: "sleep",
      targetValue: 8,
      currentValue: 7,
      unit: "hours",
      deadline: "Daily",
      isCompleted: false,
    },
    {
      id: "4",
      title: "Meditation Practice",
      description: "Meditate for 10 minutes daily",
      category: "wellness",
      targetValue: 10,
      currentValue: 10,
      unit: "minutes",
      deadline: "Daily",
      isCompleted: true,
    },
  ])

  // Mock challenges data
  const [challenges, setChallenges] = useState<Challenge[]>([
    {
      id: "1",
      title: "30-Day Hydration Challenge",
      description: "Drink 8 glasses of water every day for 30 days",
      duration: "30 days",
      participants: 1247,
      category: "nutrition",
      difficulty: "easy",
      reward: "Hydration Hero Badge + 500 points",
      isJoined: true,
    },
    {
      id: "2",
      title: "Step It Up Challenge",
      description: "Walk 10,000 steps daily for 2 weeks",
      duration: "14 days",
      participants: 892,
      category: "fitness",
      difficulty: "medium",
      reward: "Fitness Warrior Badge + 750 points",
      isJoined: false,
    },
    {
      id: "3",
      title: "Mindful Moments",
      description: "Practice 5 minutes of mindfulness daily for 21 days",
      duration: "21 days",
      participants: 634,
      category: "wellness",
      difficulty: "easy",
      reward: "Zen Master Badge + 600 points",
      isJoined: false,
    },
    {
      id: "4",
      title: "Healthy Meal Prep",
      description: "Prepare healthy meals for 5 days a week for 4 weeks",
      duration: "28 days",
      participants: 445,
      category: "nutrition",
      difficulty: "hard",
      reward: "Nutrition Expert Badge + 1000 points",
      isJoined: false,
    },
  ])

  const totalPoints = achievements.filter((a) => a.isUnlocked).reduce((sum, a) => sum + a.points, 0)
  const completedGoals = healthGoals.filter((g) => g.isCompleted).length
  const activeGoals = healthGoals.filter((g) => !g.isCompleted).length

  const handleLikePost = (postId: string) => {
    setCommunityPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? { ...post, isLiked: !post.isLiked, likes: post.isLiked ? post.likes - 1 : post.likes + 1 }
          : post,
      ),
    )
  }

  const handleCreatePost = () => {
    if (newPostContent.trim()) {
      const newPost: CommunityPost = {
        id: Date.now().toString(),
        author: userName,
        avatar: userName
          .split(" ")
          .map((n) => n[0])
          .join(""),
        content: newPostContent,
        timestamp: "Just now",
        likes: 0,
        comments: 0,
        isLiked: false,
        category: "support",
      }
      setCommunityPosts((prev) => [newPost, ...prev])
      setNewPostContent("")
    }
  }

  const handleJoinChallenge = (challengeId: string) => {
    setChallenges((prev) =>
      prev.map((challenge) =>
        challenge.id === challengeId
          ? {
              ...challenge,
              isJoined: !challenge.isJoined,
              participants: challenge.isJoined ? challenge.participants - 1 : challenge.participants + 1,
            }
          : challenge,
      ),
    )
  }

  const handleUpdateGoalProgress = (goalId: string, increment: number) => {
    setHealthGoals((prev) =>
      prev.map((goal) => {
        if (goal.id === goalId) {
          const newValue = Math.min(goal.currentValue + increment, goal.targetValue)
          return { ...goal, currentValue: newValue, isCompleted: newValue >= goal.targetValue }
        }
        return goal
      }),
    )
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "fitness":
        return "bg-blue-500"
      case "nutrition":
        return "bg-green-500"
      case "sleep":
        return "bg-purple-500"
      case "wellness":
        return "bg-teal-500"
      default:
        return "bg-gray-500"
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400"
      case "medium":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-400"
      case "hard":
        return "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  // Main Interactive Features Screen
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
                <h1 className="text-xl font-bold text-foreground">Interactive Features</h1>
                <p className="text-sm text-muted-foreground">Connect, compete, and achieve together</p>
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 py-6 space-y-6">
          {/* User Stats Overview */}
          <Card className="border-0 shadow-sm bg-gradient-to-r from-teal-500 to-blue-500 text-white">
            <CardContent className="p-6">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold">{totalPoints}</p>
                  <p className="text-sm text-white/80">Total Points</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">{completedGoals}</p>
                  <p className="text-sm text-white/80">Goals Completed</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">{achievements.filter((a) => a.isUnlocked).length}</p>
                  <p className="text-sm text-white/80">Achievements</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Feature Categories */}
          <div className="grid grid-cols-2 gap-4">
            <Card
              className="border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => setCurrentScreen("community")}
            >
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <p className="font-semibold text-foreground">Community</p>
                <p className="text-xs text-muted-foreground mt-1">Connect with others</p>
              </CardContent>
            </Card>

            <Card
              className="border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => setCurrentScreen("gamification")}
            >
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Trophy className="w-6 h-6 text-white" />
                </div>
                <p className="font-semibold text-foreground">Achievements</p>
                <p className="text-xs text-muted-foreground mt-1">Earn rewards</p>
              </CardContent>
            </Card>

            <Card
              className="border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => setCurrentScreen("goals")}
            >
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-teal-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <p className="font-semibold text-foreground">Health Goals</p>
                <p className="text-xs text-muted-foreground mt-1">Track progress</p>
              </CardContent>
            </Card>

            <Card
              className="border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => setCurrentScreen("challenges")}
            >
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <p className="font-semibold text-foreground">Challenges</p>
                <p className="text-xs text-muted-foreground mt-1">Join competitions</p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Stats */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-foreground">Today's Progress</h2>
            <div className="space-y-3">
              {healthGoals
                .filter((g) => !g.isCompleted)
                .slice(0, 2)
                .map((goal) => (
                  <Card key={goal.id} className="border-0 shadow-sm">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-foreground text-sm">{goal.title}</h3>
                        <Badge className={`${getCategoryColor(goal.category)} text-white text-xs`}>
                          {goal.category}
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">
                            {goal.currentValue} / {goal.targetValue} {goal.unit}
                          </span>
                          <span className="text-muted-foreground">
                            {Math.round((goal.currentValue / goal.targetValue) * 100)}%
                          </span>
                        </div>
                        <Progress value={(goal.currentValue / goal.targetValue) * 100} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>

          {/* Recent Community Activity */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">Community Highlights</h2>
              <Button
                variant="ghost"
                size="sm"
                className="text-teal-600 hover:text-teal-700"
                onClick={() => setCurrentScreen("community")}
              >
                View All
              </Button>
            </div>
            <div className="space-y-3">
              {communityPosts.slice(0, 2).map((post) => (
                <Card key={post.id} className="border-0 shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                        {post.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <p className="font-semibold text-foreground text-sm">{post.author}</p>
                          <span className="text-xs text-muted-foreground">{post.timestamp}</span>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2">{post.content}</p>
                        <div className="flex items-center space-x-4 mt-2">
                          <div className="flex items-center space-x-1">
                            <ThumbsUp className="w-4 h-4 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">{post.likes}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MessageSquare className="w-4 h-4 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">{post.comments}</span>
                          </div>
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

  // Community Screen
  if (currentScreen === "community") {
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
                <h1 className="text-xl font-bold text-foreground">Health Community</h1>
                <p className="text-sm text-muted-foreground">Connect and share with others</p>
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 py-6 space-y-6">
          {/* Create Post */}
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                  {userName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div className="flex-1 space-y-3">
                  <Textarea
                    placeholder="Share your health journey, ask questions, or offer support..."
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                    className="min-h-[80px] resize-none"
                  />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary" className="text-xs">
                        Support
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        Question
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        Success
                      </Badge>
                    </div>
                    <Button
                      size="sm"
                      className="bg-teal-500 hover:bg-teal-600"
                      onClick={handleCreatePost}
                      disabled={!newPostContent.trim()}
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Post
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Community Posts */}
          <div className="space-y-4">
            {communityPosts.map((post) => (
              <Card key={post.id} className="border-0 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center text-white font-semibold">
                      {post.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-2">
                        <p className="font-semibold text-foreground">{post.author}</p>
                        <Badge
                          className={`text-xs ${
                            post.category === "success"
                              ? "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400"
                              : post.category === "question"
                                ? "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400"
                                : post.category === "tip"
                                  ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-400"
                                  : "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-400"
                          }`}
                        >
                          {post.category}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{post.timestamp}</span>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-3">{post.content}</p>
                      <div className="flex items-center space-x-6">
                        <Button
                          variant="ghost"
                          size="sm"
                          className={`h-8 px-2 ${post.isLiked ? "text-red-500" : "text-muted-foreground"}`}
                          onClick={() => handleLikePost(post.id)}
                        >
                          <ThumbsUp className={`w-4 h-4 mr-1 ${post.isLiked ? "fill-current" : ""}`} />
                          {post.likes}
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 px-2 text-muted-foreground">
                          <MessageSquare className="w-4 h-4 mr-1" />
                          {post.comments}
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 px-2 text-muted-foreground">
                          <Share className="w-4 h-4 mr-1" />
                          Share
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
    )
  }

  // Gamification Screen
  if (currentScreen === "gamification") {
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
                <h1 className="text-xl font-bold text-foreground">Achievements & Rewards</h1>
                <p className="text-sm text-muted-foreground">Track your progress and earn rewards</p>
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 py-6 space-y-6">
          {/* Points Summary */}
          <Card className="border-0 shadow-sm bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold">{totalPoints}</p>
                  <p className="text-white/80">Total Points Earned</p>
                </div>
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  <Trophy className="w-8 h-8 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Achievement Progress */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-foreground">Your Achievements</h2>
            <div className="space-y-3">
              {achievements.map((achievement) => (
                <Card
                  key={achievement.id}
                  className={`border-0 shadow-sm ${achievement.isUnlocked ? "bg-green-50 border-l-4 border-l-green-500" : ""}`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-4">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${
                          achievement.isUnlocked ? "bg-green-500" : "bg-gray-200"
                        }`}
                      >
                        {achievement.isUnlocked ? achievement.icon : "🔒"}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-semibold text-foreground">{achievement.title}</h3>
                          <div className="flex items-center space-x-2">
                            {achievement.isUnlocked && (
                              <Badge className="bg-green-100 text-green-700">
                                <CheckCircle className="w-3 h-3 mr-1" />
                                Unlocked
                              </Badge>
                            )}
                            <Badge variant="secondary" className="text-xs">
                              {achievement.points} pts
                            </Badge>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{achievement.description}</p>
                        {!achievement.isUnlocked && (
                          <div className="space-y-1">
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-muted-foreground">
                                {achievement.progress} / {achievement.maxProgress}
                              </span>
                              <span className="text-muted-foreground">
                                {Math.round((achievement.progress / achievement.maxProgress) * 100)}%
                              </span>
                            </div>
                            <Progress value={(achievement.progress / achievement.maxProgress) * 100} className="h-2" />
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Leaderboard Preview */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-teal-500" />
                <span>Community Leaderboard</span>
              </CardTitle>
              <CardDescription>See how you rank among other users</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { rank: 1, name: "Sarah M.", points: 2450, avatar: "SM" },
                { rank: 2, name: "Dr. Johnson", points: 2180, avatar: "DJ" },
                {
                  rank: 3,
                  name: userName,
                  points: totalPoints,
                  avatar: userName
                    .split(" ")
                    .map((n) => n[0])
                    .join(""),
                },
                { rank: 4, name: "Mike R.", points: 1650, avatar: "MR" },
                { rank: 5, name: "Lisa K.", points: 1420, avatar: "LK" },
              ].map((user) => (
                <div
                  key={user.rank}
                  className={`flex items-center space-x-3 p-3 rounded-lg ${
                    user.name === userName ? "bg-teal-50 border border-teal-200" : "bg-muted/50"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                      user.rank === 1
                        ? "bg-yellow-500"
                        : user.rank === 2
                          ? "bg-gray-400"
                          : user.rank === 3
                            ? "bg-orange-500"
                            : "bg-teal-500"
                    }`}
                  >
                    {user.rank <= 3 ? (user.rank === 1 ? "🥇" : user.rank === 2 ? "🥈" : "🥉") : user.avatar}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-foreground text-sm">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.points} points</p>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    #{user.rank}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // Health Goals Screen
  if (currentScreen === "goals") {
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
                <h1 className="text-xl font-bold text-foreground">Health Goals</h1>
                <p className="text-sm text-muted-foreground">Track and achieve your health objectives</p>
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 py-6 space-y-6">
          {/* Goals Summary */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="border-0 shadow-sm">
              <CardContent className="p-4 text-center">
                <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <p className="text-2xl font-bold text-foreground">{completedGoals}</p>
                <p className="text-sm text-muted-foreground">Completed</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardContent className="p-4 text-center">
                <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <p className="text-2xl font-bold text-foreground">{activeGoals}</p>
                <p className="text-sm text-muted-foreground">In Progress</p>
              </CardContent>
            </Card>
          </div>

          {/* Active Goals */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">Active Goals</h2>
              <Button size="sm" className="bg-teal-500 hover:bg-teal-600">
                <Plus className="w-4 h-4 mr-2" />
                Add Goal
              </Button>
            </div>
            <div className="space-y-3">
              {healthGoals
                .filter((g) => !g.isCompleted)
                .map((goal) => (
                  <Card key={goal.id} className="border-0 shadow-sm">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-start space-x-3">
                          <div
                            className={`w-10 h-10 ${getCategoryColor(goal.category)} rounded-full flex items-center justify-center`}
                          >
                            {goal.category === "fitness" && <Activity className="w-5 h-5 text-white" />}
                            {goal.category === "nutrition" && <Apple className="w-5 h-5 text-white" />}
                            {goal.category === "sleep" && <Moon className="w-5 h-5 text-white" />}
                            {goal.category === "wellness" && <Heart className="w-5 h-5 text-white" />}
                          </div>
                          <div>
                            <h3 className="font-semibold text-foreground">{goal.title}</h3>
                            <p className="text-sm text-muted-foreground">{goal.description}</p>
                            <div className="flex items-center space-x-2 mt-1">
                              <Badge className={`${getCategoryColor(goal.category)} text-white text-xs`}>
                                {goal.category}
                              </Badge>
                              <div className="flex items-center space-x-1">
                                <Clock className="w-3 h-3 text-muted-foreground" />
                                <span className="text-xs text-muted-foreground">{goal.deadline}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleUpdateGoalProgress(goal.id, 1)}
                          className="text-xs"
                        >
                          <Plus className="w-3 h-3 mr-1" />
                          Update
                        </Button>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">
                            {goal.currentValue} / {goal.targetValue} {goal.unit}
                          </span>
                          <span className="text-muted-foreground">
                            {Math.round((goal.currentValue / goal.targetValue) * 100)}%
                          </span>
                        </div>
                        <Progress value={(goal.currentValue / goal.targetValue) * 100} className="h-3" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>

          {/* Completed Goals */}
          {completedGoals > 0 && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-foreground">Completed Goals</h2>
              <div className="space-y-3">
                {healthGoals
                  .filter((g) => g.isCompleted)
                  .map((goal) => (
                    <Card key={goal.id} className="border-0 shadow-sm bg-green-50 border-l-4 border-l-green-500">
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                            <CheckCircle className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-foreground">{goal.title}</h3>
                            <p className="text-sm text-muted-foreground">{goal.description}</p>
                            <Badge className="bg-green-100 text-green-700 text-xs mt-1">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Completed
                            </Badge>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-semibold text-green-700">
                              {goal.targetValue} {goal.unit}
                            </p>
                            <p className="text-xs text-green-600">100%</p>
                          </div>
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

  // Challenges Screen
  if (currentScreen === "challenges") {
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
                <h1 className="text-xl font-bold text-foreground">Health Challenges</h1>
                <p className="text-sm text-muted-foreground">Join community challenges and compete</p>
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 py-6 space-y-6">
          {/* Active Challenges */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-foreground">Available Challenges</h2>
            <div className="space-y-4">
              {challenges.map((challenge) => (
                <Card
                  key={challenge.id}
                  className={`border-0 shadow-sm ${challenge.isJoined ? "bg-teal-50 border-l-4 border-l-teal-500" : ""}`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="font-semibold text-foreground">{challenge.title}</h3>
                          {challenge.isJoined && (
                            <Badge className="bg-teal-100 text-teal-700 text-xs">
                              <Flame className="w-3 h-3 mr-1" />
                              Joined
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{challenge.description}</p>
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Clock className="w-3 h-3" />
                            <span>{challenge.duration}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Users className="w-3 h-3" />
                            <span>{challenge.participants} participants</span>
                          </div>
                          <Badge className={`${getCategoryColor(challenge.category)} text-white text-xs`}>
                            {challenge.category}
                          </Badge>
                          <Badge className={getDifficultyColor(challenge.difficulty)}>{challenge.difficulty}</Badge>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        className={challenge.isJoined ? "bg-red-500 hover:bg-red-600" : "bg-teal-500 hover:bg-teal-600"}
                        onClick={() => handleJoinChallenge(challenge.id)}
                      >
                        {challenge.isJoined ? "Leave" : "Join"}
                      </Button>
                    </div>
                    <Card className="bg-muted/50 border-0">
                      <CardContent className="p-3">
                        <div className="flex items-center space-x-2">
                          <Gift className="w-4 h-4 text-yellow-500" />
                          <span className="text-sm font-medium text-foreground">Reward:</span>
                          <span className="text-sm text-muted-foreground">{challenge.reward}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Challenge Stats */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Award className="w-5 h-5 text-yellow-500" />
                <span>Your Challenge Stats</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-foreground">{challenges.filter((c) => c.isJoined).length}</p>
                  <p className="text-sm text-muted-foreground">Active</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">3</p>
                  <p className="text-sm text-muted-foreground">Completed</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">85%</p>
                  <p className="text-sm text-muted-foreground">Success Rate</p>
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
