import type { MetaFunction } from '@remix-run/node'
import { StyledStudio } from '../components/Studio'

export const meta: MetaFunction = () => [
  { title: 'Sanity Studio' },
  { name: 'robots', content: 'noindex' },
]

export default function StudioPage() {
  return <StyledStudio />
}
