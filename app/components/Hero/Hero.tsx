import { Image } from '@mantine/core'
import hero from './hero.jpg'

export const Hero = () => {
  return (
    <>
      <Image fit="fill" src={hero} alt="Man bowling a cricket ball" />
    </>
  )
}
