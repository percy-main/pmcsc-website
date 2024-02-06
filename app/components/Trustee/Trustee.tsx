import { Card, Image, Title } from '@mantine/core'
import type { FC } from 'react'
import { SanityContent } from '../SanityContent'

type Props = {
  name: string
  bio?: {}[]
  role?: string
  image?: {
    asset: {
      url: string
    }
    alt?: string
  }
}

export const Trustee: FC<Props> = ({ name, bio, role, image }) => {
  return (
    <Card shadow="xl" padding="lg" radius="md" withBorder w={320}>
      <Card.Section>
        {image ? (
          <Image
            src={`${image.asset.url}?h=320&w=320&fit=crop&auto=format`}
            height={320}
            alt={image.alt}
          />
        ) : null}
      </Card.Section>

      <Title pt="md" order={3}>
        {name}
      </Title>

      {role ? (
        <Title pt="md" order={4}>
          {role}
        </Title>
      ) : null}

      <SanityContent value={bio ?? []} />
    </Card>
  )
}
