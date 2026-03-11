# Development Standards & Coding Guidelines
**Based on Wasselni Project Analysis** | *For Artistic Portfolio - Tattoo Artist*

This document captures the coding style, patterns, and conventions used by Rami Nasr & Khalil Al Jamil in the Wasselni project. applies these standards to maintain consistency across all future projects.

---

## 📋 Table of Contents
1. [Tech Stack](#tech-stack)
2. [Project Structure](#project-structure)
3. [Entry Point & Routing](#entry-point--routing)
4. [Authentication & Theme](#authentication--theme)
5. [Naming Conventions](#naming-conventions)
6. [Component Patterns](#component-patterns)
7. [Styling & Tailwind](#styling--tailwind)
8. [Services & API](#services--api)
9. [State Management](#state-management)
10. [Form Handling](#form-handling)
11. [Type Safety](#type-safety)
12. [Best Practices](#best-practices)
13. [Performance & Animation](#performance--animation)

---

## 🛠️ Tech Stack

**Always use:**
- **React 19+** with TypeScript
- **Vite** as bundler (fast dev server)
- **Tailwind CSS 4.x** with @tailwindcss/vite plugin
- **shadcn/ui** for pre-built component library based on Radix UI
- **Framer Motion** for animations (motion/react)
- **React Router DOM** for routing
- **Lucide React** for icons (prefer over react-icons when available)
- **Sonner** for toast notifications
- **Class Variance Authority (CVA)** for component variants

**Environment Setup:**
```bash
vite.config.ts  # Configure Tailwind, React, path aliases
tsconfig.json   # Strict mode enabled
eslint.config.js # ESLint with TypeScript support
components.json # shadcn/ui configuration
```

---

## 📁 Project Structure

```
src/
├── pages/                    # Route pages (full-page components)
│   ├── Home.tsx
│   ├── Dashboard/
│   │   ├── dashboard.tsx
│   │   ├── profile.tsx
│   │   ├── ratings.tsx
│   └── offerRides.tsx
├── components/               # Reusable components
│   ├── ui/                  # shadcn/ui + custom UI components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   └── [shadcn components]
│   ├── home/                # Feature-specific sections
│   │   ├── testimonialsSection.tsx
│   │   ├── safetySection.tsx
│   │   ├── faqSection.tsx
│   │   └── [feature components]
│   ├── offerRides/          # Complex feature with sub-components
│   │   ├── wizard/          # Multi-step wizard
│   │   │   ├── wizard.tsx
│   │   │   ├── steps/
│   │   │   │   ├── step1RouteDetails.tsx
│   │   │   │   ├── types.ts
│   │   │   │   └── validation.ts
│   ├── ridesComp/           # Rides listing components
│   │   ├── types.tsx        # Ride interface definitions
│   │   ├── ridesList.tsx
│   │   └── filtersPanel.tsx
│   └── theme-provider.tsx
├── services/                # API clients & data services
│   ├── ApiClient.ts         # Centralized API requests
│   ├── MapService.ts        # Location & Mapbox services
│   ├── RideDataService.ts   # Data transformation
│   └── [business logic]
├── lib/                     # Utilities
│   ├── utils.ts             # cn(), calculateAge(), etc.
│   └── [helper functions]
├── contexts/                # React Context
│   └── AuthContext.tsx      # Authentication state
├── hooks/                   # Custom hooks
│   ├── useDebounce.ts
│   └── [custom hooks]
├── config/                  # Configuration
│   └── auth.ts              # Cognito OIDC config
├── assets/                  # Static assets
│   ├── logo/
│   ├── homeWallpaper/
│   └── [images]
├── App.tsx                  # Main router & layout
├── main.tsx                 # Entry point
├── index.css                # Global styles (Tailwind imports)
├── vite-env.d.ts
└── style.css
```

**Key Principle:** Group components by feature domain, not by type. Put related UI, logic, and types together.

---

## 🚀 Entry Point & Routing

### main.tsx - Provider Setup
Always wrap `App` with `AuthProvider` as the innermost provider to make authentication available throughout the component tree.

```typescript
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { AuthProvider } from "./contexts/AuthContext"
import App from "./App"
import "./index.css"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>
)
```

### App.tsx - Router with Theme Wrapper
Structure: `BrowserRouter` → `ThemeProvider` → `Navbar` → `Route`s → `Footer`

```typescript
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { ThemeProvider } from "@/components/theme-provider"
import { Navbar02 } from "@/components/ui/shadcn-io/navbar-02/index"
import { Toaster } from "@/components/ui/sonner"
import SiteFooter from "@/components/siteFooter"
import ProtectedRoute from "@/components/ProtectedRoute"
import RoleProtectedRoute from "@/components/RoleProtectedRoute"

// Page imports
import Home from "./pages/home"
import Auth from "./pages/auth"
import Dashboard from "./pages/dashboard/dashboard"
import OfferRidesPage from "./pages/offerRides"

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

              {/* Protected Routes - Require authentication */}
              <Route
                path="/dashboard/*"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />

              {/* Role-Protected Routes - Require specific role */}
              <Route
                path="/offerRides"
                element={
                  <RoleProtectedRoute allowedRoles={["Driver"]}>
                    <OfferRidesPage />
                  </RoleProtectedRoute>
                }
              />

              {/* 404 Fallback */}
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

## 🔐 Authentication & Theme

### Theme Provider (src/components/theme-provider.tsx)
Provides dark/light/system theme with localStorage persistence and CSS variable support.

```typescript
import { createContext, useContext, useEffect, useState } from "react"

export type Theme = "dark" | "light" | "system"

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const ThemeProviderContext = createContext<ThemeProviderState | undefined>(undefined)

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  )

  useEffect(() => {
    const root = window.document.documentElement

    // Remove both classes first
    root.classList.remove("light", "dark")

    // Apply theme
    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      root.classList.add(systemTheme)
      return
    }

    root.classList.add(theme)
  }, [theme])

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme)
      setTheme(theme)
    },
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)
  if (context === undefined) throw new Error("useTheme must be used within a ThemeProvider")
  return context
}
```

### Get Current Theme in Components
```typescript
import { useTheme } from "@/components/theme-provider"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
      Current: {theme}
    </button>
  )
}
```

### ProtectedRoute - Auth Required
Redirects unauthenticated users to `/auth` page. Preserves location for post-login redirect.

```typescript
import { useAuth } from "@/contexts/AuthContext"
import { Navigate, useLocation } from "react-router-dom"
import { ReactNode } from "react"

interface ProtectedRouteProps {
  children: ReactNode
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const auth = useAuth()
  const location = useLocation()

  if (auth.isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!auth.isAuthenticated) {
    return <Navigate to="/auth" state={{ from: location }} replace />
  }

  return <>{children}</>
}

export default ProtectedRoute
```

### RoleProtectedRoute - Role Required
Extends authentication check with role-based access control. Special UI for Driver role.

```typescript
import { useAuth } from "@/contexts/AuthContext"
import { Navigate, useLocation, useNavigate } from "react-router-dom"
import { ReactNode } from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Car } from "lucide-react"
import { Button } from "@/components/ui/button"

interface RoleProtectedRouteProps {
  children: ReactNode
  allowedRoles: string[]
  fallbackPath?: string
}

const RoleProtectedRoute = ({
  children,
  allowedRoles,
  fallbackPath = "/",
}: RoleProtectedRouteProps) => {
  const auth = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  if (auth.isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!auth.isAuthenticated) {
    return <Navigate to="/auth" state={{ from: location }} replace />
  }

  const hasRequiredRole = allowedRoles.some((role) => auth.userGroups.includes(role))

  if (!hasRequiredRole && allowedRoles.includes("Driver")) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-2xl">
        <Alert className="border-blue-500 bg-blue-50">
          <Car className="h-4 w-4" />
          <AlertTitle>Driver Access Required</AlertTitle>
          <AlertDescription>
            This feature is exclusive to registered drivers.
          </AlertDescription>
        </Alert>
        <Button onClick={() => navigate("/apply-driver")} className="mt-4">
          Become a Driver
        </Button>
      </div>
    )
  }

  if (!hasRequiredRole) {
    return <Navigate to={fallbackPath} replace />
  }

  return <>{children}</>
}

export default RoleProtectedRoute
```

### AuthContext - Cognito Integration (src/contexts/AuthContext.tsx)
```typescript
import { createContext, useContext, useEffect, useState } from "react"
import { CognitoUserPool, CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js"

const userPool = new CognitoUserPool({
  UserPoolId: import.meta.env.VITE_COGNITO_USER_POOL_ID,
  ClientId: import.meta.env.VITE_COGNITO_CLIENT_ID,
})

interface AuthContextType {
  isAuthenticated: boolean
  isLoading: boolean
  user: CognitoUser | null
  userAttributes: Record<string, string> | null
  userGroups: string[]
  driverId: string | null
  error: string | null
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => void
  hasRole: (role: string) => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<CognitoUser | null>(null)
  const [userAttributes, setUserAttributes] = useState<Record<string, string> | null>(null)
  const [userGroups, setUserGroups] = useState<string[]>([])
  const [driverId, setDriverId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Check if user is already signed in on mount
  useEffect(() => {
    const currentUser = userPool.getCurrentUser()
    if (currentUser) {
      currentUser.getSession((err: any, session: any) => {
        if (err) {
          setIsLoading(false)
          return
        }
        if (session?.isValid()) {
          setUser(currentUser)
          setIsAuthenticated(true)
          
          // Extract attributes and groups
          currentUser.getUserAttributes((err: any, attributes: any) => {
            if (!err && attributes) {
              const attrMap = attributes.reduce(
                (acc: any, attr: any) => ({ ...acc, [attr.Name]: attr.Value }),
                {}
              )
              setUserAttributes(attrMap)
            }
          })

          // Extract groups from ID token
          const idToken = session.idToken.payload
          const groups = idToken["cognito:groups"] || []
          setUserGroups(groups)

          // Fetch driver ID if user is a driver
          if (groups.includes("Driver")) {
            fetchDriverId(attrMap?.sub)
          }
        }
        setIsLoading(false)
      })
    } else {
      setIsLoading(false)
    }
  }, [])

  const signIn = async (email: string, password: string) => {
    setIsLoading(true)
    setError(null)

    return new Promise((resolve, reject) => {
      const user = new CognitoUser({ Username: email, Pool: userPool })
      const authDetails = new AuthenticationDetails({ Username: email, Password: password })

      user.authenticateUser(authDetails, {
        onSuccess: (session) => {
          setUser(user)
          setIsAuthenticated(true)

          // Get user attributes
          user.getUserAttributes((err, attributes) => {
            if (!err && attributes) {
              const attrMap = attributes.reduce(
                (acc, attr) => ({ ...acc, [attr.Name]: attr.Value }),
                {}
              )
              setUserAttributes(attrMap)
            }
          })

          // Extract groups
          const groups = session.idToken.payload["cognito:groups"] || []
          setUserGroups(groups)

          setIsLoading(false)
          resolve()
        },
        onFailure: (err) => {
          setError(err.message)
          setIsLoading(false)
          reject(err)
        },
      })
    })
  }

  const signOut = () => {
    const currentUser = userPool.getCurrentUser()
    if (currentUser) {
      currentUser.signOut()
    }
    setUser(null)
    setIsAuthenticated(false)
    setUserAttributes(null)
    setUserGroups([])
    setDriverId(null)
    setError(null)
  }

  const fetchDriverId = async (cognitoSub: string) => {
    try {
      const response = await fetch(`/api/drivers/${cognitoSub}`)
      const data = await response.json()
      if (data.id) setDriverId(data.id)
    } catch (err) {
      console.error("Failed to fetch driver ID:", err)
    }
  }

  const hasRole = (role: string) => userGroups.includes(role)

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        user,
        userAttributes,
        userGroups,
        driverId,
        error,
        signIn,
        signOut,
        hasRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
```

---

## 🏷️ Naming Conventions

### Files & Directories
- **Components:** PascalCase → `OfferRideWizard.tsx`, `SafetySection.tsx`
- **Services/Utilities:** camelCase → `apiClient.ts`, `mapService.ts`, `useDebounce.ts`
- **Types/Interfaces:** PascalCase files → `types.ts`, keep content as interfaces
- **Directories:** kebab-case for multip-component features → `offer-rides/`, `offer-rides/`

### Code Elements
```typescript
// Components (PascalCase, export default)
export default function OptionForm() { }
export function Carpool() { }  // Named export if part of feature

// Types & Interfaces (PascalCase)
export interface WizardData { }
export type Testimonial = { }

// Constants (SCREAMING_SNAKE_CASE for global)
const DEFAULT_FAQ: FaqItem[] = [ ]
const DRAG_BUFFER = 0;
const VELOCITY_THRESHOLD = 500;

// Functions (camelCase)
export function calculateAge(birthdate: string): number { }
export const fetchAvailableRoutes = async (...) => { }

// Variables (camelCase)
const [currentStep, setCurrentStep] = useState(1);
const [tripData, setTripData] = useState<TripData>(initialState);

// Class methods
class ApiClient {
  constructor() { }
  async getDirections() { }
}
```

### Interface/Type Naming
```typescript
// Props interfaces: Always end with Props
interface OptionFormProps extends React.HTMLAttributes<HTMLElement> { }
interface Step3PreferencesProps { data: WizardData; setData: (data: WizardData) => void; }

// Data types: Descriptive names
interface Ride { id: number; driver: {...}; }
interface BackendRoute { start_location: string; }
interface CreateUserRequest { id: string; full_name: string; }

// Response wrappers
interface ApiResponse<T> { success: boolean; data?: T; error?: string; }
```

---

## ⚛️ Component Patterns

### Functional Component Template
```typescript
import React from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface MyComponentProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "primary" | "secondary"
  isLoading?: boolean
}

export default function MyComponent({
  className,
  variant = "primary",
  isLoading = false,
  children,
  ...props
}: MyComponentProps) {
  const [state, setState] = React.useState("")

  React.useEffect(() => {
    // Side effects
  }, [])

  return (
    <div className={cn("base-styles", className)} {...props}>
      <Button>{children}</Button>
    </div>
  )
}
```

### Page Component Template
```typescript
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import OptionalSubcomponent from "@/components/optional/subcomponent"

const HomePage = () => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 text-center px-6"
      >
        {/* Content */}
      </motion.div>

      {/* Feature sections */}
      <OptionalSubcomponent />

      {/* CTA Section */}
    </div>
  )
}

export default HomePage
```

### Props Pattern
```typescript
// ✓ GOOD: Separate Props interface, spread ...props
interface FormInputProps extends React.ComponentProps<"input"> {
  label: string
  error?: string
}

function FormInput({ className, label, error, ...props }: FormInputProps) {
  return (
    <>
      <label>{label}</label>
      <input className={cn("base", className)} {...props} />
      {error && <p className="error">{error}</p>}
    </>
  )
}

// ✓ GOOD: Optional props with defaults
interface CardProps {
  variant?: "default" | "outlined" = "default"
  disabled?: boolean = false
}

// ✗ AVOID: Implicit any or loose PropTypes
function BadComponent(props: any) { }
```

### Exporting Components
```typescript
// ✓ GOOD: Default export for single component
export default function MyComponent() { }

// ✓ GOOD: Named exports for multi-component features
export function Step1RouteDetails() { }
export function Step2VehicleAndPricing() { }
export function Step3Preferences() { }

// Then import as:
import Step1RouteDetails from "@/components/offerRides/wizard/steps/step1"
import { Step2VehicleAndPricing } from "@/components/offerRides/wizard/steps/step2"
```

---

## 🎨 Styling & Tailwind

### CSS Variable Strategy (shadcn/ui Pattern)
```css
/* src/index.css */
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 0 0% 3.6%;
    --primary: 0 0% 9.0%;
    --primary-foreground: 0 0% 100%;
    --secondary: 0 0% 96.1%;
    --muted: 0 0% 96.1%;
    --muted-foreground: 0 0% 45.1%;
    --border: 0 0% 89.8%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 0 0% 3.6%;
    --foreground: 0 0% 98.2%;
    --primary: 0 0% 98.2%;
    /* etc */
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
```

### Tailwind Usage Patterns
```typescript
// ✓ GOOD: Use semantic color variables
className="text-primary bg-primary/10 border-border hover:bg-primary/20"
className="text-muted-foreground"
className="bg-destructive text-destructive-foreground"

// ✓ GOOD: Responsive design
className="text-sm md:text-base lg:text-lg"
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
className="px-4 md:px-6 lg:px-8"

// ✓ GOOD: Use cn() for conditional classes
import { cn } from "@/lib/utils"
className={cn(
  "base-styles",
  isActive && "bg-primary text-white",
  disabled && "opacity-50 cursor-not-allowed"
)}

// ✗ AVOID: Inline ternaries in long class strings
className={`${isActive ? 'bg-primary' : 'bg-gray-200'} ...`}

// ✗ AVOID: Hardcoded colors instead of variables
className="bg-#FF5733" // WRONG
className="hover:bg-red-500 dark:hover:bg-red-600" // AVOID - use variables
```

### Animation with Framer Motion
```typescript
import { motion } from "framer-motion"

// Hero entrance
<motion.div
  initial={{ opacity: 0, y: -8 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.7 }}
>
  Content
</motion.div>

// Hover effects
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
  Click me
</motion.button>

// Staggered children
<motion.div
  initial="hidden"
  animate="visible"
  variants={{
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  }}
>
  {items.map(item => (
    <motion.div
      key={item.id}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
    >
      {item.content}
    </motion.div>
  ))}
</motion.div>
```

---

## 🔌 Services & API

### Centralized API Client Pattern
```typescript
// services/ApiClient.ts
const API_BASE_URL = 'https://your-api.com'

// Define all types first
export interface User { id: string; name: string; }
export interface ApiResponse<T> { success: boolean; data?: T; error?: string; }

class ApiClient {
  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl
  }

  async getDirections(request: DirectionRequest): Promise<DirectionResponse> {
    const response = await fetch(`${this.baseUrl}/directions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
    })
    return response.json()
  }

  async geocode(address: string): Promise<GeocodeResponse> {
    const response = await fetch(
      `${this.baseUrl}/geocode?address=${encodeURIComponent(address)}`
    )
    return response.json()
  }
}

// Export singleton
export const apiClient = new ApiClient()
export default apiClient

// Usage in components
import apiClient from "@/services/ApiClient"
const routes = await apiClient.getDirections({ origin, destination })
```

### Data Transformation Services
```typescript
// services/RideDataService.ts - Transform frontend data to backend format
import { WizardData, Vehicle } from "@/components/offerRides/wizard/steps/types"

export interface BackendRide {
  driver_id: string | number
  route_id: number
  departure_time: string
  total_seats: number
  ride_status: "active" | "cancelled" | "completed"
  preferences: RidePreferences
}

/**
 * Transform frontend WizardData into backend API request format
 */
export function transformWizardDataToRidePayload(
  data: WizardData,
  driverId: string,
  vehicle: Vehicle
): { ride: BackendRide } {
  // Transformation logic
  return { ride };
}
```

### Map Service Pattern
```typescript
// services/MapService.ts
export async function fetchAvailableRoutes(
  departure: { lat: number; lng: number },
  arrival: { lat: number; lng: number }
): Promise<GeoJSON.FeatureCollection | null> {
  try {
    const response = await apiClient.getDirections({
      origin: { lat: departure.lat, lng: departure.lng },
      destination: { lat: arrival.lat, lng: arrival.lng },
    })
    return transformRoutesToGeoJSON(response.alternatives)
  } catch (error) {
    console.error("[MapService] Error:", error)
    return null
  }
}
```

---

## 🧠 State Management

### Context Pattern (Authentication)
```typescript
// contexts/AuthContext.tsx
import React, { createContext, useContext, ReactNode } from "react"

interface User { id: string; email: string; }

interface AuthContextValue {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = React.useState<User | null>(null)
  const [isLoading, setIsLoading] = React.useState(false)

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    // Login logic
    setIsLoading(false)
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout: () => {} }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}
```

### Local State Pattern
```typescript
// Keep state close to where it's used
function MyForm() {
  const [formData, setFormData] = React.useState({
    title: "",
    description: "",
    price: 0,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData(prev => ({
      ...prev,
      [id]: id === "price" ? Number(value) : value
    }))
  }

  return (
    <form>
      <input id="title" value={formData.title} onChange={handleChange} />
      {/* more inputs */}
    </form>
  )
}
```

---

## 📝 Form Handling

### Multi-Step Wizard Pattern
```typescript
// Steps organized as separate components with shared data
interface Props {
  data: WizardData
  setData: (data: WizardData) => void
}

// Step 1
export default function Step1RouteDetails({ data, setData }: Props) {
  const handleChange = (field: keyof WizardData, value: any) => {
    setData({ ...data, [field]: value })
  }

  return <form>{/* step content */}</form>
}

// Step 2, 3, 4... same pattern

// Main wizard coordinate
export default function Wizard() {
  const [currentStep, setCurrentStep] = useState(1)
  const [data, setData] = useState<WizardData>(initialState)

  const next = () => setCurrentStep(prev => prev + 1)
  const back = () => setCurrentStep(prev => prev - 1)

  const handleSubmit = async () => {
    const payload = transformWizardDataToRidePayload(data, driverId, vehicle)
    await apiClient.createRide(payload.ride)
  }

  return (
    <div>
      {currentStep === 1 && <Step1 data={data} setData={setData} />}
      {currentStep === 2 && <Step2 data={data} setData={setData} />}
      {/* more steps */}
      <button onClick={back}>Back</button>
      <button onClick={currentStep === 4 ? handleSubmit : next}>
        {currentStep === 4 ? "Submit" : "Next"}
      </button>
    </div>
  )
}
```

### Form Validation Pattern
```typescript
// steps/validation.ts
export function validateStep1(data: RouteDetails): string[] {
  const errors: string[] = []

  if (!data.departureCity) errors.push("Departure city required")
  if (!data.arrivalCity) errors.push("Arrival city required")
  if (!data.departureDate) errors.push("Date required")

  return errors
}

// In component
const errors = validateStep1(data.routeDetails)
if (errors.length > 0) {
  toast.error("Validation failed", { description: errors.join("\n") })
  return
}
```

---

## 🔒 Type Safety

### Always Define Interfaces
```typescript
// ✓ GOOD
interface RideData {
  id: string
  driverId: string
  price: number
  seats: number
  route: RouteInfo
}

interface RouteInfo {
  departure: Location
  arrival: Location
  distance: number
}

interface Location {
  lat: number
  lng: number
  address: string
}

// Usage
const ride: RideData = { /* ... */ }
const location: Location = ride.route.departure
```

### Generic Types for Reusability
```typescript
// API Response wrapper
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  statusCode?: number
}

// Usage
const response: ApiResponse<User> = await fetch(...)
const user = response.data // Type: User | undefined

// Component prop generic
interface ListProps<T> {
  items: T[]
  renderItem: (item: T) => React.ReactNode
  onSelect: (item: T) => void
}

function List<T extends { id: string }>({ items, renderItem, onSelect }: ListProps<T>) {
  return (
    <ul>
      {items.map(item => (
        <li key={item.id} onClick={() => onSelect(item)}>
          {renderItem(item)}
        </li>
      ))}
    </ul>
  )
}
```

### Extract Types from Components
```typescript
// When a type is used in multiple places, define it in types.ts
// types/wizard.ts
export interface Stop { id: number; location: string }
export interface Vehicle { id: number; make: string; model: string }
export interface RouteDetails { departureCity: string; stops: Stop[] }

// Then import where needed
import { Stop, Vehicle, RouteDetails } from "@/types/wizard"
```

---

## ✨ Best Practices

### 1. Comments for Complex Logic
```typescript
/**
 * Calculate estimated arrival time based on departure time and duration
 * @param departureTime - ISO format departure time
 * @param durationSeconds - Duration in seconds
 * @returns ISO format arrival time
 */
function calculateArrivalTime(departureTime: string, durationSeconds: number): string {
  const departure = new Date(departureTime)
  departure.setSeconds(departure.getSeconds() + durationSeconds)
  return departure.toISOString()
}
```

### 2. Error Handling with Toasts
```typescript
import { toast } from "sonner"

try {
  await apiClient.createRide(ridePayload)
  toast.success("Ride published successfully!", {
    description: "Your ride is now live for bookings.",
  })
} catch (error) {
  toast.error("Failed to publish ride", {
    description: error instanceof Error ? error.message : "Unknown error",
  })
}
```

### 3. Loading States
```typescript
function CreateRideButton() {
  const [loading, setLoading] = useState(false)

  const handleClick = async () => {
    setLoading(true)
    try {
      await apiClient.createRide(data)
      toast.success("Created!")
    } finally {
      setLoading(false)
    }
  }

  return <Button disabled={loading}>{loading ? "Creating..." : "Create"}</Button>
}
```

### 4. useEffect Hook Patterns
```typescript
// ✓ GOOD: Fetch data on mount
useEffect(() => {
  fetchRides()
}, []) // Empty dependency = once on mount

// ✓ GOOD: Respond to prop changes
useEffect(() => {
  setSelectedVehicle(vehicles[0])
}, [vehicles]) // When vehicles change

// ✗ AVOID: Missing dependencies
useEffect(() => {
  console.log(userId) // Missing userId in deps!
}, [])

// ✗ AVOID: Creating functions inside effects
useEffect(() => {
  const handleFilter = () => { } // Should be outside
  handleFilter()
}, [])
```

### 5. Conditional Rendering
```typescript
// ✓ GOOD
{condition && <Component />}
{condition ? <ComponentA /> : <ComponentB />}
{items.length > 0 ? (
  <List items={items} />
) : (
  <EmptyState />
)}

// ✗ AVOID
{condition ? <Component /> : null} {/* verbose */}
{items.map(...)} {/* crashes if items undefined */}
```

### 6. Environment Variables
```typescript
// .env.local
VITE_API_BASE_URL=https://api.example.com
VITE_MAPBOX_PUBLIC_TOKEN=pk.xxx

// Access in code
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_PUBLIC_TOKEN
```

---

## 🎬 Performance & Animation

### Framer Motion Best Practices
```typescript
// ✓ GOOD: Define variants once
const fadeInVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

function MyComponent() {
  return (
    <motion.div initial="hidden" animate="visible" variants={fadeInVariants}>
      Content
    </motion.div>
  )
}

// ✓ GOOD: Use AnimatePresence for exit animations
import { AnimatePresence } from "framer-motion"

function Modal({ isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          Content
        </motion.div>
      )}
    </AnimatePresence>
  )
}
```

### Component Memoization
```typescript
// For expensive components
const HeavyComponent = React.memo(function HeavyComponent({
  data,
  onSelect,
}: Props) {
  return <div>{/* complex rendering */}</div>
})

// With custom comparison
const OptimizedList = React.memo(
  ({ items }: Props) => <ul>{items.map(...)}</ul>,
  (prevProps, nextProps) => {
    // Return true if props are equal (skip re-render)
    return prevProps.items.length === nextProps.items.length
  }
)
```

---

## 🎯 For This Tattoo Artist Portfolio Project

**Specific Application:**
1. **Pages:** Home, Gallery, Artist Bio, Booking, About, Contact
2. **Components:** PortfolioGrid, BookingForm, TestimonialCard, GalleryFilter
3. **Services:** BookingService, GalleryService, ContactService
4. **Animations:** Smooth transitions, image reveals, scroll effects with Framer Motion
5. **Forms:** Contact form, Booking form (multi-step if needed)
6. **Styling:** Dark/artistic theme with gold/bronze accent colors using CSS variables

---

## 📚 Quick Reference Checklist

- [ ] Component file is in correct directory by feature
- [ ] Component uses TypeScript with proper interfaces
- [ ] Props interface defined before component
- [ ] Component exported (default or named)
- [ ] Tailwind classes used instead of CSS files
- [ ] Complex logic extracted to services
- [ ] API calls use centralized ApiClient
- [ ] State updates use functional setState
- [ ] Effects have proper dependencies
- [ ] Errors handled with try/catch + toast
- [ ] Loading states managed properly
- [ ] Animations use Framer Motion
- [ ] Types defined in separate files when reused
- [ ] README or comments explain complex sections  
- [ ] No hardcoded API URLs or colors

---

**Version:** 1.0
**Last Updated:** March 5, 2026
**Apply to:** All current and future projects
