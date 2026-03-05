/**
 * Studio Layout
 *
 * Minimal layout that gives Sanity Studio full control over the viewport.
 */

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AMCABI Studio',
  robots: { index: false, follow: false },
}

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ height: '100vh' }}>{children}</div>
  )
}
