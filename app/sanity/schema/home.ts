import { Home } from 'lucide-react'
import { defineField, defineType } from 'sanity'

export const home = defineType({
  name: 'home',
  title: 'Home',
  type: 'document',
  icon: Home,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
})
