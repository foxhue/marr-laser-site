import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required().error('A title is required.'),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required().error('A slug is required for the service URL.'),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      description: 'Short summary shown in listings. Max 200 characters.',
      validation: (rule) => rule.max(200).warning('Excerpts over 200 characters may be truncated.'),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'figure',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'portableText',
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'string',
      description: 'Display price, e.g. "From $99" or "Free consultation".',
    }),
    defineField({
      name: 'duration',
      title: 'Duration',
      type: 'string',
      description: 'e.g. "60 minutes", "2 hours", "Half day".',
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Feature this service on the homepage.',
      initialValue: false,
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      excerpt: 'excerpt',
      media: 'image.image',
    },
    prepare({ title, excerpt, media }) {
      return {
        title: title || 'Untitled service',
        subtitle: excerpt || '',
        media,
      }
    },
  },
})
