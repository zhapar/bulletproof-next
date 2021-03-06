import { useRouter } from 'next/router'
import Layout from '@/features/auth/components/Layout'
import { LoginForm } from '@/features/auth/components/LoginForm'

const Login = () => {
  const router = useRouter()

  return (
    <Layout title="Log in to your account">
      <LoginForm onSuccess={() => router.push('/app')} />
    </Layout>
  )
}

export default Login
