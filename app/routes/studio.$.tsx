import type {LinksFunction, MetaFunction} from '@remix-run/node'
import {Studio} from 'sanity'
import { config } from '../sanity/sanity.config'
import { Hydrated } from '../components/Hydrated'

export const meta: MetaFunction = () => [
  {title: 'Sanity Studio'},
  {name: 'robots', content: 'noindex'},
]

export default function StudioPage() {
  return (
    <Hydrated>
      <Studio
        config={config}
      />
    </Hydrated>
  )
}
