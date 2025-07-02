'use client'
import React, { useEffect, useState } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { CircleUserRound } from 'lucide-react'
import { User } from '@supabase/supabase-js';
import { supabase } from '@/utils/supabase/client';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

const NavBarProfile = () => {

    const [auth, setUser] = useState<User | null>(null);
    const t = useTranslations()
    const router = useRouter()


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
        <DropdownMenu>
            <DropdownMenuTrigger><CircleUserRound /></DropdownMenuTrigger>
            <DropdownMenuContent>

                <DropdownMenuLabel ><span className="text-sm text-muted-foreground">{auth?.email}</span></DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() =>
                    router.push('/logout')
                }><span className="text-sm text-muted-foreground"> {t('logout')}</span></DropdownMenuItem>


            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default NavBarProfile