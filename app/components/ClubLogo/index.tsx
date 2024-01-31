import { Image } from '@mantine/core'
import logo from './club_logo.jpeg'

export const ClubLogo = () => {
  return (
    <Image
      h={120}
      w="auto"
      fit="contain"
      src={logo}
      alt="Club logo; golden lion on maroon background"
    />
  )
}
