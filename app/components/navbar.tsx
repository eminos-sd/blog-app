// import { createClient } from '@/utils/supabase/server'
// import Link from 'next/link'
// import { Button } from '@/components/ui/button'
// import { getLocale, getTranslations } from 'next-intl/server'
// import { LocaleSwitcher } from '../LocalSwitcher'
// import NavBarButtons from './NavBarButtons'

// export default async function Navbar() {
//   const supabase = await createClient()
//   const {
//     data: { user },
//   } = await supabase.auth.getUser()
//   const t = await getTranslations();
//   const locale = await getLocale()
//   const availableLocales = ['en', 'ar', 'fr']

//   return (
//     <nav className="w-full px-6 py-4 border-b bg-white flex items-center justify-between">
//       <Link href={`/${locale}`} className="text-lg font-bold">
//         {t('mehamy')}
//       </Link>

//       <div className="flex items-center gap-4">
//         <LocaleSwitcher locales={availableLocales} />
//         {user ? (
//           <form action="/logout" method="post">
//             <div className="flex items-center gap-4">
//               <span className="text-sm text-muted-foreground">
//                 {user.email}
//               </span>
//               <Button variant="outline" type="submit">
//                 {t('logout')}
//               </Button>
//             </div>
//           </form>
//         ) : (
//           <NavBarButtons />
//         )}
//       </div>
//     </nav>
//   )
// }


import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { getTranslations } from 'next-intl/server'
import { LocaleSwitcher } from '../LocalSwitcher'
import NavBarButtons from './NavBarButtons'
import MobileNavMenu from './MobileNavMenu'
import NavBarProfile from './NavBarProfile'



export default async function Navbar() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const availableLocales = ['en', 'ar', 'fr']


  return (
    <nav className="w-full px-6 py-4 border-b bg-white flex items-center justify-between">
      <Link href="/" className="text-lg font-bold">
        Blog App
      </Link>

      <div className="hidden md:flex items-center gap-4">
        <LocaleSwitcher locales={availableLocales} />
        {user ? (
          // <form action="/logout" method="post">
          //   <div className="flex items-center gap-4">
          //     <span className="text-sm text-muted-foreground">{user.email}</span>
          //     <Button variant="outline" type="submit">
          //       {t('logout')}
          //     </Button>
          //   </div>
          // </form>

          <NavBarProfile />
        ) : (
          <NavBarButtons />
        )}
      </div>
      <MobileNavMenu
      />
    </nav>
  )
}
