import { SpeechIcon } from 'lucide-react'
import { defineField, defineType } from 'sanity'

export const trustee = defineType({
  name: 'trustee',
  title: 'Trustee',
  type: 'document',
  icon: SpeechIcon,
  fields: [
    defineField({
      name: 'name',
      type: 'string',
    }),
    defineField({
      name: 'role',
      type: 'string',
    }),
    defineField({
      name: 'bio',
      type: 'array',
      title: 'Bio',
      of: [
        {
          type: 'block',
        },
      ],
    }),
    defineField({
      name: 'image',
      type: 'image',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', type: 'string' })],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
    },
    prepare({ title, media }) {
      return {
        title,
        media,
      }
    },
  },
})
