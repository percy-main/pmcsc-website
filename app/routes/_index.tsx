import {
  AppShell,
  Box,
  Container,
  Group,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from '@mantine/core'
import { json, useLoaderData, type MetaFunction } from '@remix-run/react'
import { useQuery } from '@sanity/react-loader'
import groq from 'groq'
import { z } from 'zod'
import { ClubLogo } from '../components/ClubLogo'
import { Hero } from '../components/Hero'
import { loadQuery } from '../sanity/loader.server'

export const home = z.object({
  title: z.string().nullable(),
})

export const meta: MetaFunction = () => {
  return [{ title: 'Percy Main Cricket and Sports Club' }]
}

export const loader = async () => {
  const query = groq`*[_id == "home"][0]{ title, siteTitle }`
  const params = {}

  const { data } = await loadQuery(query, params)

  return json({
    initial: { data: home.parse(data) },
    query,
    params,
  })
}

export default function BasicAppShell() {
  const theme = useMantineTheme()
  const { initial, query, params } = useLoaderData<typeof loader>()
  const { data } = useQuery<typeof initial.data>(query, params, {
    //@ts-ignore
    initial,
  })

  return (
    <AppShell
      header={{ height: 120 }}
      footer={{ height: 120 }}
      padding="md"
      withBorder={false}
      style={{
        backgroundColor: theme.colors.pmccMaroon[2],
      }}
    >
      <AppShell.Header
        style={{
          backgroundColor: theme.colors.pmccMaroon[5],
        }}
        p="md"
      >
        <Box
          component="div"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0))`,
            opacity: 0.2,
          }}
        ></Box>
        <Group>
          <ClubLogo />
          <Title style={{ color: theme.colors.gray[1] }}>
            {data?.title ?? ''}
          </Title>
        </Group>
      </AppShell.Header>
      <AppShell.Main pl={0} pr={0} pt={118}>
        <Hero />
      </AppShell.Main>
      <AppShell.Footer
        style={{
          backgroundColor: theme.colors.pmccMaroon[7],
          color: theme.colors.gray[3],
        }}
      >
        <Container style={{ height: '100%' }}>
          <Group
            gap="md"
            justify="space-evenly"
            align="center"
            style={{ height: '100%' }}
          >
            <Text>Registered charity: 1206787</Text>
            <Stack gap={0}>
              <Text>Percy Main Cricket Club</Text>
              <Text>St. John's Terrace</Text>
              <Text>North Shields</Text>
              <Text>NE29 6HS</Text>
            </Stack>
          </Group>
        </Container>
      </AppShell.Footer>
    </AppShell>
  )
}
