import { Studio } from 'sanity'
import { config } from 'sanity.config'
import { Hydrated } from '~/components/Hydrated'
import './styles.css'

export const StyledStudio = () => (
  <Hydrated>
    <Studio config={config} />
  </Hydrated>
)
