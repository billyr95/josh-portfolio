'use client'

import { usePathname } from 'next/navigation'
import Navigation from '@/components/Navigation'
import PageTransition from '@/components/PageTransition'

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
      <Navigation />
      <PageTransition>{children}</PageTransition>
    </>
  )
}
