'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { LocaleSwitcher } from '../LocalSwitcher'
import NavBarButtons from './NavBarButtons'
import { useTranslations } from 'next-intl'
import { supabase } from '@/utils/supabase/client'
import { User } from '@supabase/supabase-js'

export default function MobileNavMenu() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const t = useTranslations();
    const availableLocales = ['en', 'ar', 'fr']

    const [auth, setUser] = useState<User | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            const {
                data: { user },
            } = await supabase.auth.getUser()
            setUser(user);
        }
        fetchUser()


    }, [])


    return (
        <>
            <button
                className="md:hidden p-2 text-gray-600"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-6 h-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16M4 18h16"
                    />
                </svg>
            </button>

            {isMenuOpen && (
                <div className="md:hidden absolute top-16 left-0 w-full bg-white shadow-lg px-6 py-4 z-10">
                    <div className="flex flex-col items-start gap-4">
                        <LocaleSwitcher locales={availableLocales} />
                        {auth ? (
                            <form action="/logout" method="post" className="w-full">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-muted-foreground">{auth.email}</span>
                                    <Button variant="outline" type="submit">
                                        {t('logout')}
                                    </Button>
                                </div>
                            </form>
                        ) : (
                            <NavBarButtons />
                        )}
                    </div>
                </div>
            )}
        </>
    )
}
