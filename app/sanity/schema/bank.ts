import { BanknoteIcon } from 'lucide-react'
import { defineField, defineType } from 'sanity'

export const bank = defineType({
  name: 'bankDetails',
  title: 'Bank Details',
  type: 'document',
  icon: BanknoteIcon,
  fields: [
    defineField({
      name: 'accountName',
      type: 'string',
    }),
    defineField({
      name: 'accountNumber',
      type: 'string',
    }),
    defineField({
      name: 'sortCode',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      accountName: 'accountName',
      accountNumber: 'accountNumber',
      sortCode: 'sortCode',
    },
    prepare: ({ accountName }) => ({ title: accountName }),
  },
})
