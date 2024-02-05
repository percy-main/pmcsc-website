import {
  AppShell,
  Box,
  Container,
  Group,
  Stack,
  Text,
  rem,
  useMantineTheme,
} from '@mantine/core'
import { useHeadroom } from '@mantine/hooks'
import type { FC } from 'react'
import { ClubLogo } from '~/components/ClubLogo'

export type Props = {
  children: React.ReactNode
}

export const Layout: FC<Props> = ({ children }) => {
  const theme = useMantineTheme()
  const pinned = useHeadroom({ fixedAt: 120 })

  return (
    <AppShell
      header={{
        height: 120,
        offset: true,
        collapsed: !pinned,
      }}
      footer={{ height: 120, offset: true }}
      padding={0}
      withBorder={false}
    >
      <Box
        style={{
          ...(pinned
            ? {
                left: '1.4rem',
                top: '1.4rem',
              }
            : {
                transform: 'scale(0.7)',
                left: '-0.6rem',
                top: '-0.6rem',
              }),
          transition: 'all 0.5s ease',
          zIndex: 999,
          position: 'fixed',
        }}
      >
        <ClubLogo />
      </Box>
      <AppShell.Header
        style={{
          backgroundColor: theme.colors.pmccMaroon[5],
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.8), rgba(0,0,0,0.2))`,
        }}
        p="md"
      ></AppShell.Header>
      <AppShell.Main style={{ background: 'white' }} pt={`${rem(120)}`}>
        {children}
      </AppShell.Main>
      <AppShell.Footer
        style={{
          backgroundColor: theme.colors.pmccMaroon[5],
          color: theme.colors.gray[3],
          backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.2))`,
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
              <Text>Percy Main Cricket and Sports Club</Text>
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
