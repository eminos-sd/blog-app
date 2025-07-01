import { getTranslations } from "next-intl/server"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default async function ErrorPage() {
  const t = await getTranslations()

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <CardTitle className="text-destructive text-xl">
            {t("title")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-6 text-muted-foreground">
            {t("description")}
          </p>
          <Link href="/">
            <Button variant="default">{t("backHome")}</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
