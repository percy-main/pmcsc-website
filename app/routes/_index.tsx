import { AppShell, Title } from '@mantine/core'
import { type MetaFunction } from '@remix-run/react'

export const meta: MetaFunction = () => {
  return [{ title: 'Percy Main Cricket and Sports Club' }]
}

export default function BasicAppShell() {
  return (
    <AppShell header={{ height: 60 }} padding="md">
      <AppShell.Header>
        <Title>Percy Main Cricket and Sports Club</Title>
      </AppShell.Header>
      <AppShell.Main>Main</AppShell.Main>
    </AppShell>
  )
}
