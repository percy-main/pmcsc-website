import { Badge, Button, Card, Group, Image, Text } from '@mantine/core'
import type { FC } from 'react'
import { DateDisplay } from '../DateDisplay'
import { SanityContent } from '../SanityContent'

type Props = {
  title: string
  content: {}[]
  createdAt: string
  imageUrl?: string
}

export const Announcement: FC<Props> = ({
  title,
  content,
  createdAt,
  imageUrl,
}) => {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Image src={imageUrl} height={160} alt="Norway" />
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
