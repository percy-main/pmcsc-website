import { Container, Group, Title } from '@mantine/core'
import { json, useLoaderData, type MetaFunction } from '@remix-run/react'
import groq from 'groq'
import { z } from 'zod'
import { AnnouncementCard } from '~/components/Announcement'
import { Hero } from '~/components/Hero'
import { loadQuery } from '~/sanity/loader.server'
import { useQuery } from '~/sanity/useQuery'
import { Layout } from '../components/Layout'

export const meta: MetaFunction = () => {
  return [{ title: 'Percy Main Cricket and Sports Club' }]
}

const schema = z.array(
  z.object({
    id: z.string(),
    title: z.string(),
    slug: z.object({
      current: z.string(),
    }),
    summary: z.array(z.any()),
    createdAt: z.string(),
    image: z
      .object({
        asset: z.object({
          _id: z.string(),
          url: z.string(),
        }),
        alt: z
          .string()
          .nullable()
          .transform(value => (value ? value : undefined)),
      })
      .nullable()
      .transform(value => (value ? value : undefined)),
  }),
)

export const loader = async () => {
  const query = groq`*[_type == "announcement"][0...5]{ 'id': _id, title, summary, slug, image, 'createdAt': _createdAt, image{
    asset->{_id, url}, alt }}`
  const params = {}

  const { data } = await loadQuery(query, params)

  const announcement = schema.parse(data)

  return json({
    initial: { data: announcement },
    query,
    params,
  })
}

export default function Index() {
  const { initial, query, params } = useLoaderData<typeof loader>()
  const { data } = useQuery(query, params, { initial })
  return (
    <Layout>
      <Hero />
      <Container>
        <Title p="xl" order={2}>
          Our mission is to promote community participation in healthy
          recreation in Percy Main, North Shields and surrounding areas for the
          public benefit by the provision of fields, nets/equipment, changing
          facilities and practice facilities for participation of cricket,
          football and other sports.
        </Title>
        <Group m="md" p="xl" align="stretch">
          {data.map(announcement => (
            <AnnouncementCard
              key={announcement.id}
              createdAt={announcement.createdAt}
              slug={announcement.slug}
              title={announcement.title}
              content={announcement.summary}
              image={announcement.image}
            />
          ))}
        </Group>
      </Container>
    </Layout>
  )
}
