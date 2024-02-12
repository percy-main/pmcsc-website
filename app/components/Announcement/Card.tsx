import { Badge, Button, Card, Image, Stack, Title } from '@mantine/core'
import { Link } from '@remix-run/react'
import type { FC } from 'react'
import { DateDisplay } from '../DateDisplay'
import { SanityContent } from '../SanityContent'

type Props = {
  title: string
  content: {}[]
  createdAt: string
  slug: { current: string }
  image?: {
    asset: {
      url: string
    }
    alt?: string
  }
}

export const AnnouncementCard: FC<Props> = ({
  title,
  content,
  createdAt,
  image,
  slug,
}) => {
  return (
    <Card shadow="xl" padding="lg" radius="md" withBorder w={320}>
      <Card.Section>
        {image ? (
          <Image
            src={`${image.asset.url}?h=160&w=320&fit=crop&auto=format`}
            height={160}
            alt={image.alt}
          />
        ) : null}
      </Card.Section>

      <Stack justify="space-between" mt="md" mb="xs" style={{ flexGrow: 1 }}>
        <Stack justify="flex-start">
          <Badge color="pmccMaroon">
            <DateDisplay date={createdAt} />
          </Badge>
          <Title order={4}>{title}</Title>

          <SanityContent value={content} />
        </Stack>

        <Link
          style={{ textDecoration: 'none' }}
          to={`/announcement/${slug.current}`}
          prefetch="intent"
        >
          <Button color="blue" fullWidth mt="md" radius="md">
            Read full story
          </Button>
        </Link>
      </Stack>
    </Card>
  )
}
