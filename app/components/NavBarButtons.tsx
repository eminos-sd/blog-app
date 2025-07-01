'use client'
import { Button } from '@/components/ui/button'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const NavBarButtons = () => {

    const t = useTranslations();
    const path = usePathname();
    console.log("this is the pathname", path)
    const isSignupPage = path.includes('/signup')
    const isLoginPage = path.includes('/auth')
    return (
        <div className="flex gap-2">
            {!isSignupPage && (
                <Button asChild>
                    <Link href="/signup">{t('signup')}</Link>
                </Button>
            )}
            {!isLoginPage && (
                <Button asChild>
                    <Link href="/auth">{t('login')}</Link>
                </Button>
            )}
        </div>
    )
}

export default NavBarButtons