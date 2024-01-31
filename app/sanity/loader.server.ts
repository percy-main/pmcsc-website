import * as queryStore from '@sanity/react-loader'
import { client } from '~/sanity/client'

queryStore.setServerClient(
  client.withConfig({
    token: process.env.SANITY_READ_TOKEN,
  }),
)

export const { loadQuery } = queryStore
