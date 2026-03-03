import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Meta Title',
      type: 'string',
      description: 'Title for search engines. Recommended: 50-60 characters.',
      validation: (rule) => rule.max(70).warning('Longer titles may be truncated in search results.'),
    }),
    defineField({
      name: 'description',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      description: 'Description for search engines. Recommended: 120-160 characters.',
      validation: (rule) => rule.max(160).warning('Descriptions over 160 characters may be truncated.'),
    }),
    defineField({
      name: 'ogImage',
      title: 'Open Graph Image',
      type: 'image',
      description: 'Image displayed when shared on social media. Recommended: 1200x630px.',
      options: {
        hotspot: true,
      },
    }),
  ],
})
