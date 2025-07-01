'use client'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { login } from "./action"

import { useLocale, useTranslations } from 'next-intl'

const AuthForm = () => {
  const t = useTranslations()
  const locale = useLocale()
  const isRTL = locale === 'ar'
  return (

    <Card className="w-full max-w-sm ">
      <CardHeader>
        <CardTitle>{t('loginAccount')}</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={login}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">{t('email')}</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">{t('password')}</Label>
                <a
                  href="#"
                  className={`${isRTL ? 'mr-auto' : 'ml-auto'} inline-block text-sm underline-offset-4 hover:underline`}
                >
                  {t('ForgotPassword')}
                </a>
              </div>
              <Input id="password" name="password" type="password" required />
            </div>
            <Button type="submit" className="w-full">
              {t('login')}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>

  )
}

export default AuthForm