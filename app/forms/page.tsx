'use client'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { userSchema, UserFormValues, getPasswordStrength } from '@/lib/validators'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Checkbox } from '@/components/ui/Checkbox'
import { Switch } from '@/components/ui/Switch'
import { toast } from 'sonner'
import { useState } from 'react'
import PasswordStrengthMeter from '@/components/forms/PasswordStrengthMeter'

const SKILLS_OPTIONS = [
  'JavaScript',
  'TypeScript',
  'React',
  'Node.js',
  'Python',
  'Java',
  'C++',
  'Ruby',
  'Go',
  'Rust',
]

const STATES = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
  'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
  'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
  'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
  'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
]

export default function FormsPage() {
  const [passwordStrength, setPasswordStrength] = useState(0)

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      active: true,
      role: 'viewer',
      notifications: {
        email: true,
        sms: false,
        push: true,
      },
      skills: [],
      address: {
        country: 'United States',
      },
    },
  })

  const { fields: skillFields, append: appendSkill, remove: removeSkill } = useFieldArray({
    control,
    name: 'skills',
  })

  const watchPassword = watch('password')
  const watchSkills = watch('skills')

  // Update password strength when password changes
  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const strength = getPasswordStrength(e.target.value)
    setPasswordStrength(strength)
  }

  const onSubmit = (data: UserFormValues) => {
    console.log(data)
    toast.success('Form submitted successfully!')
  }

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-6 text-2xl font-bold">Advanced User Registration</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Basic Information */}
        <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
          <h2 className="mb-4 text-lg font-semibold">Basic Information</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium">Full Name</label>
              <Input placeholder="John Doe" {...register('name')} />
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">Email</label>
              <Input type="email" placeholder="john@example.com" {...register('email')} />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">Password</label>
              <Input
                type="password"
                {...register('password', {
                  onChange: onPasswordChange
                })}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
              )}
              <PasswordStrengthMeter strength={passwordStrength} />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">Confirm Password</label>
              <Input type="password" {...register('confirmPassword')} />
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
              )}
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">Phone</label>
              <Input type="tel" placeholder="+1234567890" {...register('phone')} />
              {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>}
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">Date of Birth</label>
              <Input type="date" {...register('dateOfBirth')} />
              {errors.dateOfBirth && (
                <p className="mt-1 text-sm text-red-600">{errors.dateOfBirth.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Role and Status */}
        <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
          <h2 className="mb-4 text-lg font-semibold">Role and Status</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium">Role</label>
              <Select {...register('role')}>
                <option value="admin">Admin</option>
                <option value="editor">Editor</option>
                <option value="viewer">Viewer</option>
              </Select>
              {errors.role && <p className="mt-1 text-sm text-red-600">{errors.role.message}</p>}
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">Status</label>
              <div className="flex items-center gap-2">
                <Checkbox {...register('active')} />
                <span>Active Account</span>
              </div>
            </div>
          </div>
        </div>

        {/* Skills */}
        <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
          <h2 className="mb-4 text-lg font-semibold">Skills</h2>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {SKILLS_OPTIONS.map((skill) => (
                <label
                  key={skill}
                  className={`cursor-pointer rounded-full px-3 py-1 text-sm ${watchSkills?.includes(skill)
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                    }`}
                >
                  <input
                    type="checkbox"
                    className="hidden"
                    value={skill}
                    {...register('skills')}
                  />
                  {skill}
                </label>
              ))}
            </div>
            {errors.skills && (
              <p className="text-sm text-red-600">{errors.skills.message}</p>
            )}
          </div>
        </div>

        {/* Address */}
        <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
          <h2 className="mb-4 text-lg font-semibold">Address</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className="mb-1 block text-sm font-medium">Street Address</label>
              <Input {...register('address.street')} />
              {errors.address?.street && (
                <p className="mt-1 text-sm text-red-600">{errors.address.street.message}</p>
              )}
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">City</label>
              <Input {...register('address.city')} />
              {errors.address?.city && (
                <p className="mt-1 text-sm text-red-600">{errors.address.city.message}</p>
              )}
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">State</label>
              <Select {...register('address.state')}>
                <option value="">Select State</option>
                {STATES.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </Select>
              {errors.address?.state && (
                <p className="mt-1 text-sm text-red-600">{errors.address.state.message}</p>
              )}
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">ZIP Code</label>
              <Input {...register('address.zipCode')} placeholder="12345" />
              {errors.address?.zipCode && (
                <p className="mt-1 text-sm text-red-600">{errors.address.zipCode.message}</p>
              )}
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">Country</label>
              <Input {...register('address.country')} />
              {errors.address?.country && (
                <p className="mt-1 text-sm text-red-600">{errors.address.country.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
          <h2 className="mb-4 text-lg font-semibold">Notification Preferences</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Email Notifications</label>
              <Switch {...register('notifications.email')} />
            </div>

            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">SMS Notifications</label>
              <Switch {...register('notifications.sms')} />
            </div>

            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Push Notifications</label>
              <Switch {...register('notifications.push')} />
            </div>
          </div>
        </div>

        {/* Terms and Submit */}
        <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
          <div className="mb-4 flex items-center gap-2">
            <Checkbox {...register('agreement')} />
            <label className="text-sm">
              I agree to the Terms of Service and Privacy Policy
            </label>
          </div>
          {errors.agreement && (
            <p className="mb-4 text-sm text-red-600">{errors.agreement.message}</p>
          )}

          <Button type="submit" className="w-full">
            Create Account
          </Button>
        </div>
      </form>
    </div>
  )
}
