import { PortableText } from '@portabletext/react'

import { SanityImage } from '~/components/SanityImage'

type ContentProps = {
  value: any[]
}

const components = {
  types: {
    image: SanityImage,
  },
}

export function SanityContent(props: ContentProps) {
  const { value } = props

  return <PortableText value={value} components={components} />
}
