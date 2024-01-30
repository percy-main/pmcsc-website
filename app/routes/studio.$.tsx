import type { MetaFunction } from '@remix-run/node'
import { Studio } from 'sanity'
import { Hydrated } from '../components/Hydrated'
import { config } from '../sanity/sanity.config'

export const meta: MetaFunction = () => [
  { title: 'Sanity Studio' },
  { name: 'robots', content: 'noindex' },
]

export default function StudioPage() {
  return (
    <Hydrated>
      <Studio config={config} />
    </Hydrated>
  )
}
