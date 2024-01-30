import { json, type MetaFunction } from '@netlify/remix-runtime'
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react'
import { lazy, Suspense } from 'react'
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
]

export default function App() {
  const { ENV } = useLoaderData<typeof loader>()
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
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
      </body>
    </html>
  )
}
