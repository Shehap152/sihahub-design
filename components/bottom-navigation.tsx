"use client"

import { Home, BarChart3, Settings } from "lucide-react"
import { cn } from "@/lib/utils"

interface BottomNavigationProps {
  activeTab: "home" | "reports" | "settings"
  onTabChange: (tab: "home" | "reports" | "settings") => void
}

export default function BottomNavigation({ activeTab, onTabChange }: BottomNavigationProps) {
  const tabs = [
    {
      id: "home" as const,
      label: "Home",
      icon: Home,
    },
    {
      id: "reports" as const,
      label: "Reports",
      icon: BarChart3,
    },
    {
      id: "settings" as const,
      label: "Settings",
      icon: Settings,
    },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50">
      <div className="flex items-center justify-around py-2">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "flex flex-col items-center justify-center py-2 px-4 rounded-lg transition-all duration-200 min-w-[80px]",
                "hover:bg-muted/50 active:scale-95",
                isActive ? "text-teal-600 dark:text-teal-400" : "text-muted-foreground hover:text-foreground",
              )}
            >
              <div
                className={cn(
                  "p-1 rounded-lg transition-all duration-200",
                  isActive && "bg-teal-100 dark:bg-teal-900/30",
                )}
              >
                <Icon className={cn("w-5 h-5 transition-all duration-200", isActive && "scale-110")} />
              </div>
              <span className={cn("text-xs font-medium mt-1 transition-all duration-200", isActive && "font-semibold")}>
                {tab.label}
              </span>
              {isActive && <div className="w-1 h-1 bg-teal-600 dark:bg-teal-400 rounded-full mt-1 animate-fade-in" />}
            </button>
          )
        })}
      </div>
    </div>
  )
}
