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
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react'
import { Suspense, lazy } from 'react'
import * as projectDetails from './sanity/projectDetails'

const VisualEditing = lazy(() => import('~/components/VisualEditing'))

export const loader = () => {
  return json({
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

export default function App() {
  const { ENV } = useLoaderData<typeof loader>()
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider>
          <Outlet />
          <ScrollRestoration />
          <script
            dangerouslySetInnerHTML={{
              __html: `window.ENV = ${JSON.stringify(ENV)}`,
            }}
          />
          {ENV.SANITY_STUDIO_STEGA_ENABLED ? (
            <Suspense>
              <VisualEditing />
            </Suspense>
          ) : null}
          <Scripts />
          <LiveReload />
        </MantineProvider>
      </body>
    </html>
  )
}
