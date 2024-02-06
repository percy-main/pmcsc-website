import { presentationTool } from '@sanity/presentation'
import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { locate } from './app/sanity/presentation/locate'
import { frontendUrl, projectDetails } from './app/sanity/projectDetails'
import * as schema from './app/sanity/schema'
import { defaultDocumentNode, structure } from './app/sanity/structure'

export const config = defineConfig({
  ...projectDetails(),
  name: 'pmcsc',
  title: 'Percy Main Cricket and Sports Club',
  plugins: [
    structureTool({ structure, defaultDocumentNode }),
    presentationTool({
      previewUrl: frontendUrl,
      locate,
    }),
    visionTool(),
  ],
  basePath: `/studio`,
  schema: {
    types: [schema.home, schema.announcement, schema.trustee],
  },
})
