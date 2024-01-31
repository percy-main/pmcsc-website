import { presentationTool } from '@sanity/presentation'
import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { locate } from './presentation/locate'
import { frontendUrl, projectDetails } from './projectDetails'
import * as schema from './schema'
import { defaultDocumentNode, structure } from './structure'

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
    types: [schema.home, schema.announcement],
  },
})
