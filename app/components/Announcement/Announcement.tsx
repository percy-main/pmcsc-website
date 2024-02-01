import { Badge, Button, Card, Group, Image, Text } from '@mantine/core'
import type { FC } from 'react'
import { DateDisplay } from '../DateDisplay'
import { SanityContent } from '../SanityContent'

type Props = {
  title: string
  content: {}[]
  createdAt: string
  image?: {
    asset: {
      url: string
    }
    alt?: string
  }
}

export const Announcement: FC<Props> = ({
  title,
  content,
  createdAt,
  image,
}) => {
  return (
    <Card shadow="xl" padding="lg" radius="md" withBorder>
      <Card.Section>
        {image ? (
          <Image
            src={`${image.asset.url}?h=160`}
            height={160}
            alt={image.alt}
          />
        ) : null}
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>{title}</Text>
        <Badge color="pmccMaroon">
          <DateDisplay date={createdAt} />
        </Badge>
      </Group>

      <Text size="sm" c="dimmed">
        <SanityContent value={content} />
      </Text>

      <Button color="blue" fullWidth mt="md" radius="md">
        Read full story
      </Button>
    </Card>
  )
}
