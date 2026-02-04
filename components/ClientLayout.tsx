'use client'

import { usePathname } from 'next/navigation'
import Navigation from '@/components/Navigation'
import PageTransition from '@/components/PageTransition'
import LoadingScreen from '@/components/LoadingScreen'

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isStudio = pathname?.startsWith('/studio')

  if (isStudio) {
    return <>{children}</>
  }

  return (
    <>
      <LoadingScreen />
      <Navigation />
      <div className="pt-16 md:pt-0 md:pl-64">
        <PageTransition>{children}</PageTransition>
      </div>
    </>
  )
}
