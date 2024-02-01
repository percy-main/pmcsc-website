import { ColorSchemeScript, MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css'
import {
  json,
  type LinksFunction,
  type MetaFunction,
} from '@netlify/remix-runtime'
import { cssBundleHref } from '@remix-run/css-bundle'
import {
  Links,
  LiveReload,
  Meta,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react'
import { useQuery } from '@sanity/react-loader'
import groq from 'groq'
import { Suspense, lazy } from 'react'
import { z } from 'zod'
import { Layout } from '~/components/Layout'
import { loadQuery } from './sanity/loader.server'
import * as projectDetails from './sanity/projectDetails'

const VisualEditing = lazy(() => import('~/components/VisualEditing'))

export const meta: MetaFunction = () => [
  { rel: 'icon', href: '/favicon.ico' },
  { rel: 'apple-touch-icon', href: '/android-chrome-192x192.png' },
  { rel: 'manifest', href: '/manifest.json' },
  { charSet: 'utf-8' },
  { name: 'viewport', content: 'width=device-width, initial-scale=1' },
]

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: 'stylesheet', href: cssBundleHref }] : []),
]

const schema = z.object({
  title: z.string(),
})

export const loader = async () => {
  const query = groq`*[_id == "home"][0]{ title, siteTitle }`
  const params = {}

  const { data } = await loadQuery(query, params)

  return json({
    initial: { data: schema.parse(data) },
    query,
    params,
    ENV: {
      SANITY_STUDIO_PROJECT_ID: projectDetails.projectId,
      SANITY_STUDIO_DATASET: projectDetails.dataset,
      SANITY_STUDIO_STEGA_ENABLED: projectDetails.stegaEnabled,
      SANITY_STUDIO_API_VERSION: projectDetails.apiVersion,
      SANITY_FRONTEND_URL: projectDetails.frontendUrl,
      SANITY_STUDIO_URL: projectDetails.studioUrl,
    },
  })
}

export default function App() {
  const { initial, query, params, ENV } = useLoaderData<typeof loader>()
  const { data } = useQuery<typeof initial.data>(query, params, {
    //@ts-ignore
    initial,
  })

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider
          theme={{
            fontFamily: 'Roboto, sans-serif',
            fontFamilyMonospace: 'Monaco, Courier, monospace',
            headings: { fontFamily: 'Greycliff CF, sans-serif' },
            colors: {
              pmccMaroon: [
                '#ffeeee',
                '#f4dbdb',
                '#e4b5b6',
                '#d78c8c',
                '#ca696a',
                '#c35354',
                '#c14749',
                '#aa393a',
                '#993133',
                '#87262a',
              ],
            },
            breakpoints: {
              xs: '24em',
              sm: '48em',
              md: '64em',
              lg: '74em',
              xl: '90em',
            },
          }}
        >
          <Layout title={data?.title ?? ''} />
          <ScrollRestoration />
          <script
            dangerouslySetInnerHTML={{
              __html: `window.ENV = ${JSON.stringify(ENV)}`,
            }}
          />
          {ENV.SANITY_STUDIO_STEGA_ENABLED ? (
            <Suspense>
              <VisualEditing studioUrl={ENV.SANITY_STUDIO_URL} />
            </Suspense>
          ) : null}
          <Scripts />
          <LiveReload />
        </MantineProvider>
      </body>
    </html>
  )
}
