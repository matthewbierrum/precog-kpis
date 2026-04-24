import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { auth } from "@/auth"
import { SignOutForm } from "@/components/sign-out"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Precog KPIs",
  description: "Internal KPI dashboard for Precog",
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 min-h-screen`}>
        <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <h1 className="text-xl font-semibold text-gray-900">Precog KPIs</h1>
            {session?.user && (
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-500">{session.user.email}</span>
                <SignOutForm />
              </div>
            )}
          </div>
        </header>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
      </body>
    </html>
  )
}
