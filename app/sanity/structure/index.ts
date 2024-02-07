import { Home, PersonStandingIcon, SpeechIcon } from 'lucide-react'
import type {
  DefaultDocumentNodeResolver,
  StructureResolver,
} from 'sanity/structure'

export const structure: StructureResolver = S =>
  S.list()
    .id('root')
    .title('Content')
    .items([
      // Singleton, home page curation
      S.documentListItem()
        .schemaType('home')
        .icon(Home)
        .id('home')
        .title('Home'),
      S.documentTypeListItem('trustee')
        .icon(PersonStandingIcon)
        .title('Trustees'),
      S.divider(),
      S.documentTypeListItem('announcement')
        .title('Announcements')
        .icon(SpeechIcon),
    ])

export const defaultDocumentNode: DefaultDocumentNodeResolver = S => {
  return S.document().views([S.view.form()])
}
