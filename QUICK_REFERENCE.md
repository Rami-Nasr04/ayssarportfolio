# Quick Reference Card
**Development Templates & Shortcuts** | *Based on Wasselni Standards*

---

## 🚀 New Component Template
```typescript
import React from "react"
import { cn } from "@/lib/utils"

interface MyComponentProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "primary" | "secondary"
  disabled?: boolean
}

export default function MyComponent({
  className,
  variant = "primary",
  disabled = false,
  children,
  ...props
}: MyComponentProps) {
  return (
    <div
      className={cn(
        "base-classes",
        variant === "primary" && "primary-styles",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
```

---

## 📄 New Page Template
```typescript
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function FeaturePage() {
  return (
    <div className="w-full">
      {/* Hero/Header */}
      <motion.section
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="min-h-[28rem] flex items-center justify-center px-4"
      >
        <h1 className="text-4xl md:text-5xl font-bold">Title</h1>
      </motion.section>

      {/* Content */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <Card>
            {/* Content */}
          </Card>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-primary/10">
        <div className="text-center">
          <Button>Call to Action</Button>
        </div>
      </section>
    </div>
  )
}
```

---

## �️ App.tsx Routing Template
```typescript
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { ThemeProvider } from "@/components/theme-provider"
import { Navbar02 } from "@/components/ui/shadcn-io/navbar-02/index"
import { Toaster } from "@/components/ui/sonner"
import SiteFooter from "@/components/siteFooter"
import ProtectedRoute from "@/components/ProtectedRoute"
import RoleProtectedRoute from "@/components/RoleProtectedRoute"

import Home from "./pages/home"
import Auth from "./pages/auth"
import Dashboard from "./pages/dashboard/dashboard"
import AdminPanel from "./pages/admin/adminPanel"

const App = () => {
  return (
    <Router>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <div className="flex flex-col min-h-screen">
          <Navbar02 />
          <main className="flex-1">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/auth" element={<Auth />} />

              {/* Protected Routes */}
              <Route
                path="/dashboard/*"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />

              {/* Role-Based Routes */}
              <Route
                path="/admin/*"
                element={
                  <RoleProtectedRoute allowedRoles={["Admin"]}>
                    <AdminPanel />
                  </RoleProtectedRoute>
                }
              />

              {/* 404 */}
              <Route path="/*" element={<NotFoundPage />} />
            </Routes>
          </main>
          <SiteFooter />
        </div>
        <Toaster position="top-right" />
      </ThemeProvider>
    </Router>
  )
}

export default App
```

---

## 🔐 Auth Setup Template
```typescript
// 1. Use auth context in components
import { useAuth } from "@/contexts/AuthContext"

const MyComponent = () => {
  const auth = useAuth()
  
  if (!auth.isAuthenticated) {
    return <p>Please log in</p>
  }

  return (
    <>
      <p>Welcome, {auth.userAttributes?.email}</p>
      <button onClick={() => auth.signOut()}>Sign Out</button>
      {auth.hasRole("Driver") && <p>You are a driver!</p>}
    </>
  )
}

// 2. Sign in example
const handleSignIn = async () => {
  try {
    await auth.signIn(email, password)
    toast.success("Signed in successfully!")
    navigate("/dashboard")
  } catch (error) {
    toast.error("Sign in failed")
  }
}

// 3. Protected route example
<Route
  path="/protected-page"
  element={
    <ProtectedRoute>
      <ProtectedPage />
    </ProtectedRoute>
  }
/>

// 4. Role-protected route example
<Route
  path="/driver-panel"
  element={
    <RoleProtectedRoute allowedRoles={["Driver"]}>
      <DriverPanel />
    </RoleProtectedRoute>
  }
/>
```

---

## 🌓 Theme Toggle Template
```typescript
import { useTheme } from "@/components/theme-provider"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
```

---

## �🔌 API Call Pattern
```typescript
// 1. Define types
interface CreateRideRequest {
  route_id: number
  total_seats: number
  price: number
}

interface CreateRideResponse {
  id: string
  status: "active" | "pending"
}

// 2. Add to ApiClient
class ApiClient {
  async createRide(data: CreateRideRequest): Promise<CreateRideResponse> {
    const response = await fetch(`${this.baseUrl}/rides`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    return response.json()
  }
}

// 3. Use in component
import apiClient from "@/services/ApiClient"
import { toast } from "sonner"

const handleCreate = async () => {
  try {
    const result = await apiClient.createRide(formData)
    toast.success("Ride created!", { description: `ID: ${result.id}` })
  } catch (error) {
    toast.error("Failed to create ride")
  }
}
```

---

## 📝 Form State Pattern
```typescript
interface FormData {
  title: string
  description: string
  price: number
  date: string
}

const [formData, setFormData] = React.useState<FormData>({
  title: "",
  description: "",
  price: 0,
  date: "",
})

const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) => {
  const { id, value } = e.target

  // Handle numeric fields
  if (id === "price") {
    setFormData(prev => ({ ...prev, [id]: Number(value) }))
    return
  }

  setFormData(prev => ({ ...prev, [id]: value }))
}

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault()
  console.log("Submitted:", formData)
  // Submit logic
}
```

---

## 🎨 Styling Patterns
```typescript
// Variable colors (preferred)
className="text-primary bg-primary/10 border-border"
className="text-muted-foreground"
className="bg-destructive text-destructive-foreground"

// Responsive
className="text-sm md:text-base lg:text-lg"
className="px-4 md:px-6 lg:px-8"
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"

// Hover/Interactive
className="transition-all hover:bg-primary/20 active:scale-95"

// Conditional (using cn())
className={cn(
  "base",
  isActive && "bg-primary text-white",
  disabled && "opacity-50 pointer-events-none"
)}

// Gradients & Dark Mode
className="bg-gradient-to-br from-primary to-primary/50"
className="dark:bg-slate-900 dark:text-white"
```

---

## ✨ Animation Patterns
```typescript
// Simple fade-in
<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
  Content
</motion.div>

// Entrance with slide
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  Content
</motion.div>

// Staggered children
<motion.div
  initial="hidden"
  animate="visible"
  variants={{
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  }}
>
  {items.map((item, i) => (
    <motion.div
      key={i}
      variants={{
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 },
      }}
    >
      {item}
    </motion.div>
  ))}
</motion.div>

// Hover effect
<motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
  Click me
</motion.button>
```

---

## 🧠 State & Effects
```typescript
// Local state
const [count, setCount] = React.useState(0)
const [loading, setLoading] = React.useState(false)

// Fetch data on mount
React.useEffect(() => {
  const fetchData = async () => {
    const data = await apiClient.fetchData()
    setData(data)
  }
  fetchData()
}, [])

// Respond to dependency change
React.useEffect(() => {
  console.log("User changed:", user)
}, [user])

// Cleanup
React.useEffect(() => {
  const unsubscribe = auth.onAuthStateChanged(setUser)
  return () => unsubscribe()
}, [])

// Custom hook example
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = React.useState<T>(value)

  React.useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay)
    return () => clearTimeout(handler)
  }, [value, delay])

  return debouncedValue
}
```

---

## 📊 Type Patterns
```typescript
// Component props
interface Props {
  title: string
  count?: number
  items: Item[]
  onClick: (id: string) => void
}

// API response
interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
}

// Form data
interface FormData {
  email: string
  password: string
  rememberMe: boolean
}

// Generic reusable type
interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  pageSize: number
}

// Union types
type Status = "idle" | "loading" | "success" | "error"
type Variant = "primary" | "secondary" | "outline"

// Extending HTML element props
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: "sm" | "md" | "lg"
}
```

---

## 🚨 Error Handling
```typescript
import { toast } from "sonner"

// Try-catch pattern
try {
  const result = await apiClient.saveData(data)
  toast.success("Saved successfully!")
} catch (error) {
  const message =
    error instanceof Error ? error.message : "Something went wrong"
  toast.error("Failed to save", { description: message })
  console.error(error)
} finally {
  setLoading(false)
}

// With loading state
const [loading, setLoading] = React.useState(false)
const [error, setError] = React.useState<string | null>(null)

const handleAction = async () => {
  setLoading(true)
  setError(null)
  try {
    await apiClient.doSomething()
  } catch (err) {
    setError(err instanceof Error ? err.message : "Unknown error")
  } finally {
    setLoading(false)
  }
}
```

---

## 🔑 Context Pattern
```typescript
// Define context
interface MyContextValue {
  state: string
  updateState: (value: string) => void
}

const MyContext = React.createContext<MyContextValue | undefined>(undefined)

// Provider
export function MyProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = React.useState("initial")

  const value: MyContextValue = {
    state,
    updateState: (value: string) => setState(value),
  }

  return <MyContext.Provider value={value}>{children}</MyContext.Provider>
}

// Hook
export function useMyContext() {
  const context = React.useContext(MyContext)
  if (!context) {
    throw new Error("useMyContext must be used within MyProvider")
  }
  return context
}

// Usage
function Component() {
  const { state, updateState } = useMyContext()
  return <button onClick={() => updateState("new")}>{state}</button>
}
```

---

## 📂 File Organization Checklist
```
Feature Name/
├── index.ts (optional - barrel export)
├── [FeatureName].tsx (main component)
├── types.ts (interfaces & types)
├── utils.ts (helper functions)
├── hooks/ (custom hooks if needed)
│   └── useFeatureLogic.ts
└── components/ (sub-components)
    ├── SubComponent1.tsx
    └── SubComponent2.tsx
```

---

## 🎯 Daily Checklist Before Committing
- [ ] No `console.log()` left in code
- [ ] No hardcoded API URLs
- [ ] Types are properly defined
- [ ] Props interface matches usage
- [ ] Accessibility considered (alt text, aria labels)
- [ ] Mobile responsive (test on md, lg breakpoints)
- [ ] Error handling in place
- [ ] Loading states handled
- [ ] No TypeScript errors
- [ ] Components follow naming convention
- [ ] Tailwind classes only (no inline styles)
- [ ] Toast notifications for success/error
- [ ] Environment variables for secrets

---

## 🔗 Common Imports
```typescript
// React
import React from "react"
import { useState, useEffect, useContext } from "react"

// Routing
import { useNavigate, useParams, Link } from "react-router-dom"

// UI Components
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"

// Utilities
import { cn } from "@/lib/utils"

// Icons
import { ChevronDown, Menu, X, Check } from "lucide-react"

// Animation
import { motion, AnimatePresence } from "framer-motion"

// Services
import apiClient from "@/services/ApiClient"

// Types
import { User, ApiResponse } from "@/services/ApiClient"
```

---

**Print this card and keep it handy! 🚀**
