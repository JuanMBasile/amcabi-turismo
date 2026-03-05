/**
 * Sanity Studio Route
 *
 * This renders the embedded Sanity Studio at /studio
 */

'use client'

import { NextStudio } from 'next-sanity/studio'
import config from '@/sanity.config'

export default function StudioPage() {
  return <NextStudio config={config} />
}
