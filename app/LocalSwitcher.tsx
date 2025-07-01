'use client'

import { useRouter } from 'next/navigation';
import { useEffect, useState, } from 'react'

export function LocaleSwitcher({ locales }: { locales: string[] }) {

  const [local, setLocal] = useState<string>("")
  const router = useRouter()

  useEffect(() => {
    const cookieLocal = document.cookie.split(";").map((row) => row.trim()).find((row) => row.startsWith("MYNEXTAPP_LOCAL"))?.split("=")[1];
    if (cookieLocal) {
      setLocal(cookieLocal);
    }
    else {
      console.log(local)
      const browserLocal = navigator.language.slice(0, 2);
      setLocal(browserLocal);
      document.cookie = `MYNEXTAPP_LOCAL=${browserLocal};`;
      router.refresh();
    }

  },
    [router]);
  const changeLocal = (newLocal: string) => {
    setLocal(newLocal);
    document.cookie = `MYNEXTAPP_LOCAL=${newLocal}`;
    router.refresh();
  }

  return (
    <div className="flex gap-2">
      {locales.map((lng) => (
        <button
          key={lng}
          onClick={() => changeLocal(lng)}

          className="text-sm px-2 py-1 border rounded hover:bg-gray-100"
        >
          {lng.toUpperCase()}
        </button>
      ))}
    </div>
  )
}
