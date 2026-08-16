import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { z } from 'zod'

import { Button } from '@/components/common/Button'
import { Input } from '@/components/common/Input'
import { Typography } from '@/components/common/Typography'
import { useLoginMutation } from '@/features/auth/api'

const loginSchema = z.object({
  email: z.email('Enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
})

type LoginFormValues = z.infer<typeof loginSchema>

// This is a public demo of the dashboard — the credentials are pre-filled
// on purpose so a visitor without an account can still see it working.
const DEMO_CREDENTIALS: LoginFormValues = {
  email: 'demo@foodmap.app',
  password: 'FoodmapDemo2026!',
}

export function LoginForm() {
  const navigate = useNavigate()
  const [login, { isLoading, error }] = useLoginMutation()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginFormValues>({ defaultValues: DEMO_CREDENTIALS })

  async function onSubmit(values: LoginFormValues) {
    const result = loginSchema.safeParse(values)

    if (!result.success) {
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof LoginFormValues
        setError(field, { message: issue.message })
      }
      return
    }

    try {
      await login(result.data).unwrap()
      navigate('/', { replace: true })
    } catch {
      // handled via the `error` mutation state below
    }
  }

  return (
    <form className="w-full max-w-sm space-y-6" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div>
        <Typography variant="h2">Sign in</Typography>
        <Typography variant="body2" className="mt-1 text-gray-500">
          This is a public demo — credentials are pre-filled, just hit Sign in.
        </Typography>
      </div>

      <div className="space-y-4">
        <Input
          id="email"
          type="email"
          label="Email"
          autoComplete="email"
          placeholder="you@example.com"
          error={errors.email?.message}
          {...register('email')}
        />

        <Input
          id="password"
          type="password"
          label="Password"
          autoComplete="current-password"
          placeholder="********"
          error={errors.password?.message}
          {...register('password')}
        />
      </div>

      {error ? (
        <Typography as="p" variant="body2" role="alert" className="text-red-600">
          Invalid email or password.
        </Typography>
      ) : null}

      <Button type="submit" fullWidth isLoading={isLoading}>
        Sign in
      </Button>
    </form>
  )
}
