import { Logo } from '@/components/common/Logo'
import { Typography } from '@/components/common/Typography'
import { LoginForm } from '@/components/auth/LoginForm'

export function LoginPage() {
  return (
    <div className="flex min-h-dvh">
      <div className="relative flex w-full flex-col justify-center bg-gray-50 px-6 lg:w-1/2">
        <Logo size="md" className="absolute top-6 left-6 sm:top-8 sm:left-8" />
        <div className="mx-auto w-full max-w-sm">
          <LoginForm />
        </div>
      </div>

      <div className="relative hidden w-1/2 items-center justify-center bg-primary-50 lg:flex">
        <Typography
          as="p"
          variant="h2"
          className="max-w-sm px-10 text-center font-medium text-primary-800"
        >
          Welcome
        </Typography>
      </div>
    </div>
  )
}
