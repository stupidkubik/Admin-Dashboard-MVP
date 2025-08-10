'use client'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
})

export default function LoginPage() {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string; password: string }>({ resolver: zodResolver(schema) })

  const onSubmit = () => {
    router.push('/dashboard')
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm space-y-4">
      <div>
        <Input type="email" placeholder="Email" {...register('email')} />
        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
      </div>
      <div>
        <Input type="password" placeholder="Password" {...register('password')} />
        {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
      </div>
      <Button type="submit" className="w-full">
        Login
      </Button>
    </form>
  )
}
