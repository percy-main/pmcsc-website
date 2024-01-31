import { Studio } from 'sanity'
import { Hydrated } from '~/components/Hydrated'
import { config } from '~/sanity/sanity.config'
import './styles.css'

export const StyledStudio = () => (
  <Hydrated>
    <Studio config={config} />
  </Hydrated>
)
