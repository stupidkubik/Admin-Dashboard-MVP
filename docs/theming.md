# Theming and Customization Guide

This guide explains how to customize the look and feel of the Admin Dashboard template.

## Table of Contents

1. [Theme Setup](#theme-setup)
2. [Color Customization](#color-customization)
3. [Component Styling](#component-styling)
4. [Dark Mode](#dark-mode)
5. [Layout Customization](#layout-customization)

## Theme Setup

The template uses Tailwind CSS for styling and next-themes for dark mode support.

### Base Configuration

```js
// tailwind.config.js
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Your custom colors
      },
    },
  },
  plugins: [],
}
```

### Theme Provider Setup

```tsx
// contexts/ThemeProvider.tsx
'use client'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import type { ReactNode } from 'react'

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </NextThemesProvider>
  )
}
```

## Color Customization

### Custom Colors

```css
/* app/globals.css */
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 240 10% 3.9%;
    --primary: 240 5.9% 10%;
    --primary-foreground: 0 0% 98%;
    --secondary: 240 4.8% 95.9%;
    --secondary-foreground: 240 5.9% 10%;
    /* Add your custom colors here */
  }

  .dark {
    --background: 240 10% 3.9%;
    --foreground: 0 0% 98%;
    /* Dark mode colors */
  }
}
```

### Using Custom Colors

```tsx
// In components
<div className="bg-background text-foreground">
  <button className="bg-primary text-primary-foreground">
    Click me
  </button>
</div>
```

## Component Styling

### Base Component Styles

```tsx
// components/ui/Button.tsx
export function Button({ className = '', ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded
        bg-primary px-4 py-2 text-primary-foreground
        hover:bg-primary/90 disabled:opacity-50 ${className}`}
      {...props}
    />
  )
}
```

### Extending Component Styles

```tsx
// Custom button usage
<Button className="bg-blue-600 hover:bg-blue-700">
  Custom Button
</Button>
```

### Component Variants

```tsx
// Define variants
type ButtonVariant = 'default' | 'outline' | 'ghost'

const buttonVariants: Record<ButtonVariant, string> = {
  default: 'bg-primary text-primary-foreground hover:bg-primary/90',
  outline: 'border border-primary text-primary hover:bg-primary/10',
  ghost: 'text-primary hover:bg-primary/10',
}

// Use in component
export function Button({
  variant = 'default',
  className = '',
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded px-4 py-2
        disabled:opacity-50 ${buttonVariants[variant]} ${className}`}
      {...props}
    />
  )
}
```

## Dark Mode

### Dark Mode Toggle

```tsx
'use client'
import { useTheme } from 'next-themes'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
    >
      {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
    </button>
  )
}
```

### Dark Mode Styles

```tsx
// Using dark mode variants
<div className="bg-white text-gray-900 dark:bg-gray-800 dark:text-white">
  <p className="text-gray-600 dark:text-gray-300">
    This text adapts to dark mode
  </p>
</div>
```

## Layout Customization

### Sidebar Customization

```tsx
// contexts/SidebarProvider.tsx
export function SidebarProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  // Add your custom logic here
  
  return (
    <SidebarContext.Provider value={{ isOpen, setIsOpen, isMobile }}>
      {children}
    </SidebarContext.Provider>
  )
}
```

### Custom Layout Wrapper

```tsx
export function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <Header />
        <main className="flex-1 p-4">{children}</main>
      </div>
    </div>
  )
}
```

### Responsive Design

```tsx
// Breakpoint customization
<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
  {/* Grid items */}
</div>

// Mobile-first approach
<div className="flex flex-col md:flex-row">
  <div className="w-full md:w-1/4">Sidebar</div>
  <div className="w-full md:w-3/4">Content</div>
</div>
```

### Custom Container

```tsx
export function Container({ className = '', children }: ContainerProps) {
  return (
    <div className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  )
}
```
