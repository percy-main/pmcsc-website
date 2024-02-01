import { Container, Group } from '@mantine/core'
import { json, useLoaderData, type MetaFunction } from '@remix-run/react'
import groq from 'groq'
import { z } from 'zod'
import { loadQuery } from '~/sanity/loader.server'
import { useQuery } from '~/sanity/useQuery'
import { Announcement } from '../components/Announcement'
import { Hero } from '../components/Hero'

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
        alt: z.string(),
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

  console.log(data)

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
    <>
      <Hero />
      <Container mt={-60}>
        <Group m="md">
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
    </>
  )
}
