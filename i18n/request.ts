import {getRequestConfig} from 'next-intl/server';
import { cookies } from 'next/headers';
 
export default getRequestConfig(async () => {
  // Provide a static locale, fetch a user setting,
  // read from `cookies()`, `headers()`, etc.
  const cookieLocal = (await cookies()).get("MYNEXTAPP_LOCAL")?.value || 'en'
  //const locale = 'en';
  const locale = cookieLocal;
 
  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default
  };
});