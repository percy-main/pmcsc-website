import { Container, Group } from '@mantine/core'
import { json, useLoaderData, type MetaFunction } from '@remix-run/react'
import groq from 'groq'
import { z } from 'zod'
import { Announcement } from '~/components/Announcement'
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
    content: z.array(z.any()),
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
  const query = groq`*[_type == "announcement"][0...5]{ 'id': _id, title, content, image, 'createdAt': _createdAt, image{
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
        <Group m="md" align="stretch">
          {data.map(announcement => (
            <Announcement
              key={announcement.id}
              createdAt={announcement.createdAt}
              title={announcement.title}
              content={announcement.content}
              image={announcement.image}
            />
          ))}
        </Group>
      </Container>
    </Layout>
  )
}
