import { Image } from '@mantine/core'
import logo from './club_logo.png'

export const ClubLogo = () => {
  return (
    <Image
      style={{
        height: 'clamp(4.5rem, 3.4rem + 5.5vw, 10rem)',
      }}
      w="auto"
      fit="contain"
      src={logo}
      alt="Percy Main Cricket Club logo; golden lion on maroon background"
    />
  )
}
