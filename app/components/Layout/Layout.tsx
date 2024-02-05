import {
  AppShell,
  Box,
  Container,
  Group,
  Stack,
  Text,
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
        height: { xs: 120, base: 90 },
        offset: false,
        collapsed: !pinned,
      }}
      footer={{ height: 120 }}
      padding="md"
      withBorder={false}
    >
      <Box
        style={{
          ...(pinned
            ? {
                left: '1rem',
                top: '1rem',
              }
            : {
                transform: 'scale(0.5)',
                left: '-1rem',
                top: '-1rem',
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
      >
        <Box
          component="div"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            opacity: 0.2,
          }}
        ></Box>
      </AppShell.Header>
      <AppShell.Main
        pl={0}
        pr={0}
        pt={118}
        pb={120}
        style={{ background: 'white' }}
      >
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
