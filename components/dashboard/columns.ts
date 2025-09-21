import type { ColumnDef } from '@tanstack/react-table'
import type { User } from '@/lib/types'

export const RECENT_USERS_COLUMNS: ColumnDef<User>[] = [
  { header: 'Name', accessorKey: 'name' },
  { header: 'Email', accessorKey: 'email' },
  { header: 'Role', accessorKey: 'role' },
]
