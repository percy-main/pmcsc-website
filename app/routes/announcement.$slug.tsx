import { Container, Title } from '@mantine/core'
import type { LoaderFunctionArgs } from '@remix-run/node'
import { json, useLoaderData, type MetaFunction } from '@remix-run/react'
import groq from 'groq'
import { z } from 'zod'
import { loadQuery } from '~/sanity/loader.server'
import { useQuery } from '~/sanity/useQuery'
import { DateDisplay } from '../components/DateDisplay'
import { Layout } from '../components/Layout'
import { SanityContent } from '../components/SanityContent'

export const meta: MetaFunction = () => {
  return [{ title: 'Percy Main Cricket and Sports Club' }]
}

const schema = z.object({
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
})

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const query = groq`*[_type == "announcement" && slug.current == $slug][0]{ 'id': _id, title, content, image, 'createdAt': _createdAt, image{
    asset->{_id, url}, alt }}`

  const { data } = await loadQuery(query, params)

  const announcement = schema.parse(data)

  return json({
    initial: { data: announcement },
    query,
    params,
  })
}

export default function Announcement() {
  const { initial, query, params } = useLoaderData<typeof loader>()
  const {
    data: { title, createdAt, content },
  } = useQuery(query, params, { initial })
  return (
    <Layout>
      <Container>
        <Title order={1}>{title}</Title>
        <Title order={4}>
          <DateDisplay date={createdAt} />
        </Title>
        <SanityContent value={content} />
      </Container>
    </Layout>
  )
}
