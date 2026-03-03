import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'figure',
  title: 'Image',
  type: 'object',
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required().error('An image is required.'),
    }),
    defineField({
      name: 'alt',
      title: 'Alt Text',
      type: 'string',
      description: 'Describe the image for screen readers and SEO.',
      validation: (rule) => rule.required().error('Alt text is required for accessibility.'),
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      alt: 'alt',
      media: 'image',
    },
    prepare({ alt, media }) {
      return {
        title: alt || 'No alt text',
        media,
      }
    },
  },
})
