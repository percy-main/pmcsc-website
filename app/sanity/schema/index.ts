import type { DocumentPluginOptions, SchemaPluginOptions } from 'sanity'
import { announcement } from './announcement'
import { bank } from './bank'
import { home } from './home'
import { trustee } from './trustee'

const singletonActions = new Set(['publish', 'discardChanges', 'restore'])

const singletonTypes = new Set(['home'])

export const schema: SchemaPluginOptions = {
  types: [home, announcement, trustee, bank],
  templates: templates =>
    templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
}

export const document: DocumentPluginOptions = {
  actions: (input, context) =>
    singletonTypes.has(context.schemaType)
      ? input.filter(({ action }) => action && singletonActions.has(action))
      : input,
}
