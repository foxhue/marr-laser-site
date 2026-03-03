import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'link',
  title: 'Link',
  type: 'object',
  fields: [
    defineField({
      name: 'text',
      title: 'Link Text',
      type: 'string',
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
      description: 'External URL. Leave empty if using an internal reference.',
      validation: (rule) =>
        rule.uri({
          allowRelative: true,
          scheme: ['http', 'https', 'mailto', 'tel'],
        }),
      hidden: ({ parent }) => !!parent?.internal,
    }),
    defineField({
      name: 'internal',
      title: 'Internal Page',
      type: 'reference',
      to: [{ type: 'page' }, { type: 'service' }],
      description: 'Link to an internal page or service. Overrides external URL.',
      hidden: ({ parent }) => !!parent?.url,
    }),
    defineField({
      name: 'openInNewTab',
      title: 'Open in New Tab',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'text',
      url: 'url',
      internalTitle: 'internal.title',
    },
    prepare({ title, url, internalTitle }) {
      return {
        title: title || 'Untitled link',
        subtitle: url || internalTitle || 'No destination',
      }
    },
  },
})
