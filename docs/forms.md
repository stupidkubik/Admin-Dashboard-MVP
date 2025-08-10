# Forms and Validation Guide

This guide explains how to work with forms and validation in the Admin Dashboard template.

## Table of Contents

1. [Form Setup](#form-setup)
2. [Validation Schemas](#validation-schemas)
3. [Complex Form Examples](#complex-form-examples)
4. [Custom Components](#custom-components)

## Form Setup

The template uses React Hook Form with Zod for form handling and validation.

### Basic Form Setup

```tsx
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { userSchema, UserFormValues } from '@/lib/validators'

function MyForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      // Your default values
    },
  })

  const onSubmit = (data: UserFormValues) => {
    // Handle form submission
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Form fields */}
    </form>
  )
}
```

### Field Registration

```tsx
// Text input
<Input {...register('name')} />

// Select
<Select {...register('role')}>
  <option value="admin">Admin</option>
  <option value="user">User</option>
</Select>

// Checkbox
<Checkbox {...register('active')} />
```

### Error Handling

```tsx
<div>
  <Input {...register('email')} />
  {errors.email && (
    <p className="text-sm text-red-600">{errors.email.message}</p>
  )}
</div>
```

## Validation Schemas

The template uses Zod for type-safe form validation.

### Basic Schema Example

```typescript
import { z } from 'zod'

export const userSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  role: z.enum(['admin', 'editor', 'viewer']),
  active: z.boolean(),
})

export type UserFormValues = z.infer<typeof userSchema>
```

### Advanced Validation Examples

```typescript
// Password validation with regex
const passwordSchema = z.string()
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character'
  )

// Date validation
const dateSchema = z.string()
  .refine((date) => {
    const age = (new Date().getTime() - new Date(date).getTime()) / (1000 * 60 * 60 * 24 * 365.25)
    return age >= 18
  }, 'Must be at least 18 years old')

// Phone number validation
const phoneSchema = z.string()
  .regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number format')
  .optional()
  .nullable()
```

### Nested Object Validation

```typescript
const addressSchema = z.object({
  street: z.string().min(5, 'Street address must be at least 5 characters'),
  city: z.string().min(2, 'City name must be at least 2 characters'),
  state: z.string().length(2, 'Please use 2-letter state code'),
  zipCode: z.string().regex(/^\d{5}(-\d{4})?$/, 'Invalid ZIP code format'),
})

const userSchema = z.object({
  // ... other fields
  address: addressSchema,
})
```

## Complex Form Examples

### Form with Dynamic Fields

```tsx
function DynamicForm() {
  const { control, register } = useForm()
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'skills',
  })

  return (
    <form>
      {fields.map((field, index) => (
        <div key={field.id}>
          <Input {...register(`skills.${index}`)} />
          <Button onClick={() => remove(index)}>Remove</Button>
        </div>
      ))}
      <Button onClick={() => append('')}>Add Skill</Button>
    </form>
  )
}
```

### Form with File Upload

```tsx
function FileUploadForm() {
  const { register, watch } = useForm()
  const file = watch('avatar')

  return (
    <form>
      <input
        type="file"
        accept="image/*"
        {...register('avatar')}
      />
      {file && file[0] && (
        <img
          src={URL.createObjectURL(file[0])}
          alt="Preview"
          className="h-20 w-20 rounded-full"
        />
      )}
    </form>
  )
}
```

### Multi-step Form

```tsx
function MultiStepForm() {
  const [step, setStep] = useState(1)
  const { register, handleSubmit } = useForm()

  const onSubmit = (data: any) => {
    if (step < 3) {
      setStep(step + 1)
    } else {
      // Submit form
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {step === 1 && (
        <div>
          <h2>Basic Information</h2>
          <Input {...register('name')} />
          <Input {...register('email')} />
        </div>
      )}
      
      {step === 2 && (
        <div>
          <h2>Address</h2>
          <Input {...register('address.street')} />
          <Input {...register('address.city')} />
        </div>
      )}
      
      {step === 3 && (
        <div>
          <h2>Preferences</h2>
          <Checkbox {...register('notifications')} />
        </div>
      )}
      
      <Button type="submit">
        {step < 3 ? 'Next' : 'Submit'}
      </Button>
    </form>
  )
}
```

## Custom Components

### Password Strength Meter

```tsx
type Props = {
  strength: number // 0-5
}

export default function PasswordStrengthMeter({ strength }: Props) {
  const getColor = (value: number) => {
    if (value <= 2) return 'bg-red-500'
    if (value <= 3) return 'bg-yellow-500'
    if (value <= 4) return 'bg-blue-500'
    return 'bg-green-500'
  }

  return (
    <div className="mt-1">
      <div className="flex h-1.5 w-full overflow-hidden rounded bg-gray-200">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={`h-full w-1/5 ${i < strength ? getColor(strength) : ''}`}
          />
        ))}
      </div>
    </div>
  )
}
```

### Form Section Card

```tsx
type Props = {
  title: string
  children: React.ReactNode
}

export default function FormSection({ title, children }: Props) {
  return (
    <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
      <h2 className="mb-4 text-lg font-semibold">{title}</h2>
      {children}
    </div>
  )
}
```
