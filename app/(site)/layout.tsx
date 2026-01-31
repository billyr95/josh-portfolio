import Navigation from '@/components/Navigation'
import PageTransition from '@/components/PageTransition'

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navigation />
      <PageTransition>{children}</PageTransition>
    </>
  )
}
