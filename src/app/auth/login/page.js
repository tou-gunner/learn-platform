import LoginForm from './LoginForm'

export const metadata = {
  title: 'Login | E-Learning Platform',
  description: 'Login to access your courses and learning materials',
}

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <LoginForm />
    </div>
  )
}