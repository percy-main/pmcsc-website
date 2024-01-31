import { AppShell, Group, Title } from '@mantine/core'
import { type MetaFunction } from '@remix-run/react'
import { ClubLogo } from '../components/ClubLogo'

export const meta: MetaFunction = () => {
  return [{ title: 'Percy Main Cricket and Sports Club' }]
}

export default function BasicAppShell() {
  return (
    <AppShell header={{ height: 120 }} padding="md" withBorder={false}>
      <AppShell.Header>
        <Group>
          <ClubLogo />
          <Title>Percy Main Cricket and Sports Club</Title>
        </Group>
      </AppShell.Header>
      <AppShell.Main></AppShell.Main>
    </AppShell>
  )
}
