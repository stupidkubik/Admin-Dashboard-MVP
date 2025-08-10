# Next.js Admin Dashboard Template

Modern admin dashboard template built with the App Router in Next.js, using TypeScript and Tailwind CSS.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Documentation

- [Component API Reference](docs/components.md)
- [Forms and Validation Guide](docs/forms.md)
- [Theming and Customization](docs/theming.md)

## Quick Start

```bash
# Clone the repository
git clone https://github.com/yourusername/Admin-Dashboard-MVP.git

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:3000` to see the dashboard.

## Examples

### Basic Layout Setup

```tsx
// app/layout.tsx
import { ThemeProvider } from '@/contexts/ThemeProvider'
import { SidebarProvider } from '@/contexts/SidebarProvider'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <SidebarProvider>
            <div className="flex min-h-screen">
              <Sidebar />
              <div className="flex flex-1 flex-col">
                <Header />
                <main className="flex-1 p-4">{children}</main>
              </div>
            </div>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
```

### Data Table Usage

```tsx
import DataTable from '@/components/data-table/DataTable'
import type { ColumnDef } from '@tanstack/react-table'

const columns: ColumnDef<User>[] = [
  { header: 'Name', accessorKey: 'name' },
  { header: 'Email', accessorKey: 'email' },
  {
    header: 'Actions',
    cell: ({ row }) => (
      <Button onClick={() => handleEdit(row.original)}>
        Edit
      </Button>
    ),
  },
]

function UsersPage() {
  const { data: users } = useSWR<User[]>('/api/users', fetcher)
  
  return (
    <DataTable
      columns={columns}
      data={users || []}
    />
  )
}
```

### Form with Validation

```tsx
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { userSchema, UserFormValues } from '@/lib/validators'

function UserForm() {
  const form = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
  })

  const onSubmit = (data: UserFormValues) => {
    console.log(data)
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Input {...form.register('name')} />
      {form.errors.name && (
        <p className="text-red-600">{form.errors.name.message}</p>
      )}
      
      <Button type="submit">Submit</Button>
    </form>
  )
}
```

## Tech Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Kit:** [shadcn/ui](https://ui.shadcn.com)
- **Forms:** React Hook Form + Zod
- **Tables:** TanStack Table
- **Charts:** Chart.js via react-chartjs-2
- **Theming:** next-themes (light/dark)
- **State (lightweight):** React Context (optionally Zustand)
- **Mock API:** Next.js Route Handlers and/or MSW (dev only)
- **Icons:** lucide-react
- **Quality:** ESLint + Prettier

## Principles

- MVP scope only (6–8 screens, 10–15 atoms/molecules)
- Shipping > Perfection. Batch updates quarterly.
- Everything documented. 10-minute time-to-value for buyer.

## Features (MVP)

- Dashboard with KPI cards, charts and recent activity
- Users page showcasing sortable tables and pagination
- Example forms with validation and toast feedback
- Authentication pages for Login, Register and Forgot Password flows
- Settings page with profile fields and theme toggle
- Sidebar navigation with icons and logout action
- Reusable components such as Header, Breadcrumbs, DataTable, ConfirmModal and Toasts
- Mock API routes for quick integration

## Getting Started

```bash
npm install
npm run dev
```

> The template ships with mock API routes under `app/api/*`. Replace them with your own backend as needed.

## Project Structure

```
root/
  app/
    layout.tsx
    page.tsx
    (auth)/
      layout.tsx
      login/page.tsx
      register/page.tsx
      forgot-password/page.tsx
    dashboard/page.tsx
    users/page.tsx
    forms/page.tsx
    settings/page.tsx
    api/
      users/route.ts
      stats/route.ts
      auth/route.ts
  components/
    layout/
    ui/
    data-table/
    charts/
    feedback/
    common/
  contexts/
  lib/
  mocks/
  public/
  styles/
  tailwind.config.js
  next.config.js
  tsconfig.json
  README.md
  LICENSE
```

## License

Released under the MIT License.
