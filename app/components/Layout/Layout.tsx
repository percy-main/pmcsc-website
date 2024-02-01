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
import { Outlet } from '@remix-run/react'
import type { FC } from 'react'
import { ClubLogo } from '~/components/ClubLogo'

export type Props = {
  title: string
}

export const Layout: FC<Props> = ({ title }) => {
  const theme = useMantineTheme()

  return (
    <AppShell
      header={{ height: 120 }}
      footer={{ height: 120 }}
      padding="md"
      withBorder={false}
      style={{
        backgroundColor: theme.colors.pmccMaroon[3],
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
          <Title style={{ color: theme.colors.gray[1] }}>{title}</Title>
        </Group>
      </AppShell.Header>
      <AppShell.Main pl={0} pr={0} pt={118}>
        <Outlet />
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
