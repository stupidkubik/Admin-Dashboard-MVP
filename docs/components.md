# Components API Documentation

This document provides detailed API documentation for all components in the Admin Dashboard template.

## Table of Contents

1. [UI Components](#ui-components)
2. [Layout Components](#layout-components)
3. [Data Display Components](#data-display-components)
4. [Form Components](#form-components)
5. [Feedback Components](#feedback-components)
6. [Chart Components](#chart-components)

## UI Components

### Button
A flexible button component with various styles and states.

```tsx
import { Button } from '@/components/ui/Button'

// Basic usage
<Button>Click me</Button>

// With different variations
<Button type="submit">Submit</Button>
<Button disabled>Disabled</Button>
<Button className="custom-class">Custom Style</Button>
```

**Props:**
- `className?: string` - Additional CSS classes
- `type?: 'button' | 'submit' | 'reset'` - HTML button type
- `disabled?: boolean` - Disable button
- `...rest` - All other button HTML attributes

### Input
A styled input component with built-in support for forms.

```tsx
import { Input } from '@/components/ui/Input'

// Basic usage
<Input placeholder="Enter text" />

// With form integration
<Input
  type="email"
  placeholder="Email"
  {...register('email')}
/>
```

**Props:**
- `className?: string` - Additional CSS classes
- `type?: string` - HTML input type
- `...rest` - All other input HTML attributes

### Select
A custom select component for dropdowns.

```tsx
import { Select } from '@/components/ui/Select'

// Basic usage
<Select>
  <option value="1">Option 1</option>
  <option value="2">Option 2</option>
</Select>

// With form integration
<Select {...register('role')}>
  <option value="admin">Admin</option>
  <option value="user">User</option>
</Select>
```

**Props:**
- `className?: string` - Additional CSS classes
- `...rest` - All other select HTML attributes

### Checkbox
A styled checkbox component.

```tsx
import { Checkbox } from '@/components/ui/Checkbox'

// Basic usage
<Checkbox />

// With label
<div className="flex items-center gap-2">
  <Checkbox {...register('active')} />
  <span>Active</span>
</div>
```

**Props:**
- `className?: string` - Additional CSS classes
- `...rest` - All other checkbox HTML attributes

### Dialog
A modal dialog component.

```tsx
import { Dialog } from '@/components/ui/Dialog'

// Basic usage
<Dialog
  open={isOpen}
  onClose={() => setIsOpen(false)}
  title="Dialog Title"
>
  <p>Dialog content</p>
</Dialog>
```

**Props:**
- `open: boolean` - Control dialog visibility
- `onClose: () => void` - Close handler
- `title?: string` - Dialog title
- `children: ReactNode` - Dialog content

## Layout Components

### Sidebar
Main navigation sidebar component.

```tsx
import Sidebar from '@/components/layout/Sidebar'

// Basic usage
<Sidebar />
```

The component uses the SidebarProvider context for state management.

### Header
Top header component with user menu and theme toggle.

```tsx
import Header from '@/components/layout/Header'

// Basic usage
<Header />
```

### Breadcrumbs
Navigation breadcrumbs component.

```tsx
import Breadcrumbs from '@/components/layout/Breadcrumbs'

// Basic usage
<Breadcrumbs
  items={[
    { label: 'Home', href: '/' },
    { label: 'Users', href: '/users' },
    { label: 'Details' }
  ]}
/>
```

**Props:**
- `items: Array<{ label: string; href?: string }>` - Breadcrumb items

## Data Display Components

### DataTable
A powerful table component built with TanStack Table.

```tsx
import DataTable from '@/components/data-table/DataTable'
import type { ColumnDef } from '@tanstack/react-table'

// Define columns
const columns: ColumnDef<User>[] = [
  { header: 'Name', accessorKey: 'name' },
  { header: 'Email', accessorKey: 'email' },
]

// Basic usage
<DataTable
  columns={columns}
  data={users}
/>
```

**Props:**
- `columns: ColumnDef[]` - Table column definitions
- `data: any[]` - Table data
- `pageSize?: number` - Items per page (default: 10)

### Pagination
Table pagination component.

```tsx
import Pagination from '@/components/data-table/Pagination'

// Basic usage
<Pagination
  currentPage={1}
  totalPages={5}
  onPageChange={(page) => setPage(page)}
/>
```

**Props:**
- `currentPage: number` - Current page number
- `totalPages: number` - Total number of pages
- `onPageChange: (page: number) => void` - Page change handler

## Chart Components

### LineChart
Line chart component using Chart.js.

```tsx
import LineChart from '@/components/charts/LineChart'

// Basic usage
<LineChart
  data={[
    { date: '2024-01', value: 100 },
    { date: '2024-02', value: 150 },
  ]}
/>
```

**Props:**
- `data: Array<{ date: string; value: number }>` - Chart data points

### BarChart
Bar chart component using Chart.js.

```tsx
import BarChart from '@/components/charts/BarChart'

// Basic usage
<BarChart
  data={[
    { label: 'Category 1', value: 100 },
    { label: 'Category 2', value: 150 },
  ]}
  label="Sales"
/>
```

**Props:**
- `data: Array<{ label: string; value: number }>` - Chart data
- `label?: string` - Chart label

### DoughnutChart
Doughnut chart component using Chart.js.

```tsx
import DoughnutChart from '@/components/charts/DoughnutChart'

// Basic usage
<DoughnutChart
  data={[
    { label: 'Type A', value: 30 },
    { label: 'Type B', value: 70 },
  ]}
/>
```

**Props:**
- `data: Array<{ label: string; value: number }>` - Chart data
- `label?: string` - Chart label

## Feedback Components

### ToasterProvider
Toast notification provider using Sonner.

```tsx
import ToasterProvider from '@/components/feedback/ToasterProvider'
import { toast } from 'sonner'

// Setup in layout
<ToasterProvider />

// Usage
toast.success('Operation successful')
toast.error('Something went wrong')
```

### ConfirmModal
Confirmation dialog component.

```tsx
import ConfirmModal from '@/components/common/ConfirmModal'

// Basic usage
<ConfirmModal
  open={isOpen}
  title="Delete Item"
  description="Are you sure you want to delete this item?"
  onConfirm={handleDelete}
  onCancel={() => setIsOpen(false)}
/>
```

**Props:**
- `open: boolean` - Control modal visibility
- `title: string` - Modal title
- `description?: string` - Modal description
- `onConfirm: () => void` - Confirm action handler
- `onCancel: () => void` - Cancel action handler
