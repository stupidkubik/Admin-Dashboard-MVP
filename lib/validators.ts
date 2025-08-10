import { z } from 'zod'

// Regular expressions for validation
const phoneRegex = /^\+?[1-9]\d{1,14}$/
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
const urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/

export const addressSchema = z.object({
  street: z.string().min(5, 'Street address must be at least 5 characters'),
  city: z.string().min(2, 'City name must be at least 2 characters'),
  state: z.string().length(2, 'Please use 2-letter state code'),
  zipCode: z.string().regex(/^\d{5}(-\d{4})?$/, 'Invalid ZIP code format'),
  country: z.string().min(2, 'Country name must be at least 2 characters')
})

export const userSchema = z.object({
  id: z.string().optional(),
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must not exceed 50 characters')
    .regex(/^[a-zA-Z\s]*$/, 'Name can only contain letters and spaces'),

  email: z.string()
    .email('Invalid email address')
    .min(5, 'Email must be at least 5 characters')
    .max(100, 'Email must not exceed 100 characters'),

  password: z.string()
    .regex(
      passwordRegex,
      'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character'
    ),

  confirmPassword: z.string(),
  role: z.enum(['admin', 'editor', 'viewer']),

  active: z.boolean(),
  phone: z.string()
    .regex(phoneRegex, 'Invalid phone number format')
    .optional()
    .nullable(),

  dateOfBirth: z.string()
    .refine((date) => {
      const age = (new Date().getTime() - new Date(date).getTime()) / (1000 * 60 * 60 * 24 * 365.25)
      return age >= 18
    }, 'Must be at least 18 years old'),

  website: z.string()
    .regex(urlRegex, 'Invalid URL format')
    .optional()
    .nullable(),

  bio: z.string()
    .min(10, 'Bio must be at least 10 characters')
    .max(500, 'Bio must not exceed 500 characters')
    .optional(),

  skills: z.array(z.string())
    .min(1, 'Select at least one skill')
    .max(5, 'Cannot select more than 5 skills'),

  address: addressSchema,

  agreement: z.boolean()
    .refine((val) => val === true, 'You must agree to the terms'),

  avatar: z.any()
    .optional()
    .nullable(),

  notifications: z.object({
    email: z.boolean(),
    sms: z.boolean(),
    push: z.boolean()
  }),

  createdAt: z.string().optional()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
})

export type UserFormValues = z.infer<typeof userSchema>

// Helper function to check password strength
export const getPasswordStrength = (password: string): number => {
  let strength = 0
  if (password.length >= 8) strength += 1
  if (password.match(/[a-z]/)) strength += 1
  if (password.match(/[A-Z]/)) strength += 1
  if (password.match(/\d/)) strength += 1
  if (password.match(/[@$!%*?&]/)) strength += 1
  return strength
}
