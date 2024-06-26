import { Container, Group, Stack, Title } from '@mantine/core'
import { json, useLoaderData, type MetaFunction } from '@remix-run/react'
import groq from 'groq'
import { z } from 'zod'
import { loadQuery } from '~/sanity/loader.server'
import { useQuery } from '~/sanity/useQuery'
import { Layout } from '../components/Layout'
import { Trustee } from '../components/Trustee'

export const meta: MetaFunction = () => {
  return [{ title: 'Percy Main Cricket and Sports Club - Trustees' }]
}

const schema = z.array(
  z.object({
    id: z.string(),
    name: z.string(),
    bio: z
      .array(z.any())
      .nullable()
      .transform(value => (value ? value : undefined)),
    role: z
      .string()
      .nullable()
      .transform(value => (value ? value : undefined)),
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

const query = groq`*[_type == "trustee"]{ 'id': _id, name, bio, role, image{
  asset->{_id, url}, alt }} | order(_createdAt asc)[0...100]`

export const loader = async () => {
  const params = {}

  const { data } = await loadQuery(query, params)

  const trustees = schema.parse(data)

  return json({
    initial: { data: trustees },
    query,
    params,
  })
}

export default function Index() {
  const { initial, query, params } = useLoaderData<typeof loader>()
  const { data } = useQuery(query, params, { initial })
  return (
    <Layout>
      <Container fluid>
        <Stack p="xl" justify="center" align="center">
          <Title order={1}>Our Trustees</Title>
          <Group p="xl" align="stretch" justify="center">
            {data.map(trustee => (
              <Trustee
                key={trustee.id}
                name={trustee.name}
                role={trustee.role}
                bio={trustee.bio}
                image={trustee.image}
              />
            ))}
          </Group>
        </Stack>
      </Container>
    </Layout>
  )
}
