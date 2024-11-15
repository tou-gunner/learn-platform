import SignupForm from './SignupForm'

export const metadata = {
  title: 'Sign Up | E-Learning Platform',
  description: 'Create an account to start your learning journey',
}

export default function SignupPage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <SignupForm />
    </div>
  )
}