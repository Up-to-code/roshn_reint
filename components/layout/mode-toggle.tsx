"use client"

import * as React from "react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Icons } from "@/components/shared/icons"
import { cn } from "@/lib/utils"

export function ModeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className={cn(
            "size-9 px-0 transition-all duration-300 hover:scale-105 hover:bg-white/10",
            "border border-transparent hover:border-white/20",
            "rounded-xl backdrop-blur-sm",
            className
          )}
        >
          <div className="relative size-4">
            <Icons.sun className="absolute inset-0 rotate-0 scale-100 transition-all duration-300 dark:-rotate-90 dark:scale-0" />
            <Icons.moon className="absolute inset-0 rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100" />
          </div>
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-40 rounded-xl border-gray-800 bg-black/95 shadow-2xl backdrop-blur-2xl"
      >
        <DropdownMenuItem 
          onClick={() => setTheme("light")}
          className={cn(
            "flex cursor-pointer items-center gap-3 transition-all duration-200",
            "rounded-lg hover:bg-white/10 focus:bg-white/10",
            theme === "light" && "bg-white/5 text-blue-400"
          )}
        >
          <Icons.sun className="size-4" />
          <span>Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme("dark")}
          className={cn(
            "flex cursor-pointer items-center gap-3 transition-all duration-200",
            "rounded-lg hover:bg-white/10 focus:bg-white/10",
            theme === "dark" && "bg-white/5 text-blue-400"
          )}
        >
          <Icons.moon className="size-4" />
          <span>Dark</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme("system")}
          className={cn(
            "flex cursor-pointer items-center gap-3 transition-all duration-200",
            "rounded-lg hover:bg-white/10 focus:bg-white/10",
            theme === "system" && "bg-white/5 text-blue-400"
          )}
        >
          <Icons.laptop className="size-4" />
          <span>System</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}