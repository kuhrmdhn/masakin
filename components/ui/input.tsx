"use client"
import * as React from "react"

import { cn } from "@/lib/utils"
import { Eye, EyeClosed } from "lucide-react"

function Input({
  className,
  type,
  ...props
}: React.ComponentProps<"input">) {
  const [showInput, setShowInput] = React.useState(false)
  const isPassword = type === "password"

  return (
    <div className="relative w-full">
      <input
        type={isPassword ? (showInput ? "text" : "password") : type}
        data-slot="input"
        className={cn(
          "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-12 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          isPassword && "pr-10", // padding only when needed
          className
        )}
        {...props}
      />

      {/* Right slot (no reserved space unless password) */}
      {isPassword && (
        <button
          type="button"
          onClick={() => setShowInput((s) => !s)}
          className="absolute right-3 top-1/2 -translate-y-1/2 size-6 text-muted-foreground hover:text-foreground transition-colors"
        >
          {showInput ? <Eye /> : <EyeClosed />}
        </button>
      )}
    </div>
  )
}

export { Input }
