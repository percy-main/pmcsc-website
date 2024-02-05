import { BackgroundImage, Stack, Title, useMantineTheme } from '@mantine/core'
import hero from './hero.jpg'

export const Hero = () => {
  const theme = useMantineTheme()
  return (
    <BackgroundImage src={hero} h={240}>
      <Stack
        h="100%"
        style={{ alignItems: 'flex-end', justifyContent: 'center' }}
      >
        <Title
          order={1}
          style={{ color: theme.colors.pmccMaroon[2], textAlign: 'right' }}
          pr="md"
          pt="xl"
        >
          Percy Main Cricket and Sports Club
        </Title>
      </Stack>
    </BackgroundImage>
  )
}
