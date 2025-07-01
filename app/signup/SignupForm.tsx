'use client'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { signup } from '../auth/action'
import { useTranslations } from 'next-intl'

const SignupForm = () => {
  const t = useTranslations()
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>{t('createAccount')}</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={signup}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">{t('email')}</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">{t('password')}</Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
              />
            </div>
            <Button type="submit" className="w-full">
              {t('signup')}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

export default SignupForm
