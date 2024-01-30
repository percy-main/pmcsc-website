import { type MetaFunction } from '@remix-run/react'
import Welcome from '~/components/Welcome'

export const meta: MetaFunction = () => {
  return [{ title: 'Percy Main Cricket and Sports Club' }]
}

export default function Index() {

  return (
    <section>
        <Welcome />
    </section>
  )
}
