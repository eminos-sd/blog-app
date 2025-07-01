import { createClient } from '@/utils/supabase/server'
import AuthPage from './auth/page'
import HomePage from './home/page'

export default async function Home() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return <AuthPage />
  }

  return <HomePage />
}
